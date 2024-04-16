import { Entity } from "@backstage/catalog-model";
import React from "react";
import { InfoCard, WarningPanel, Progress } from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import { snykApiRef } from "../../api";
import { useAsync } from "react-use";
import { Alert } from '@mui/material';

import { Grid } from "@mui/material";
import { SnykCounter } from "./components/SnykCountersComponent";
import { IssuesCount as IssuesCountType } from "../../types/types";
import { useEntity } from "@backstage/plugin-catalog-react";
import { UnifiedIssues } from "../../types/unifiedIssuesTypes";
import { SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_ORGS } from "../../config";

export const SnykOverviewComponent = ({ entity }: { entity: Entity }) => {
  const snykApi = useApi(snykApiRef);

  if (!entity || !entity?.metadata.name) {
    return <>No Snyk org/project-ids listed</>;
  }

  if (!snykApi.isAvailableInEntity(entity)) {
    return (
      <Grid
        container
        spacing={2}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <WarningPanel
            title="Unable to find snyk project details"
            message={
              <>
                Seems we are missing some references, check out the example
                annotations in{" "}
                <a href="https://github.com/aarlaud-playground/goof/blob/master/backstage-catalog-info.yaml">
                  backstage-catalog-info.yaml
                </a>
                .
              </>
            }
          />
        </Grid>
        <Grid item>
          <img src="https://i.gifer.com/yH.gif" alt="" />
        </Grid>
      </Grid>
    );
  }

  const orgIds =
    entity?.metadata.annotations?.[SNYK_ANNOTATION_ORGS]?.split(",") ||
    entity?.metadata.annotations?.[SNYK_ANNOTATION_ORG]?.split(",") ||
    [];
  const hasMultipleOrgs = orgIds.length > 1;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value, loading, error } = useAsync(async () => {
    const aggregatedIssuesCount: IssuesCountType = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    const projectOrgList = await Promise.all(
      orgIds.map(async (orgId) => {
        const projectList = entity?.metadata.annotations
          ? await snykApi.getCompleteProjectsListFromAnnotations(
              orgId,
              entity.metadata.annotations,
              hasMultipleOrgs
            )
          : [];
        return { projectList, orgId };
      })
    );

    let projectsCount = 0;

    const allProjects = projectOrgList.flatMap(
      ({ projectList }) => projectList
    );
    const projectOrgMap = projectOrgList.reduce(
      (acc, { orgId, projectList }) => {
        projectList.forEach((project) => {
          acc[project.id] = orgId;
        });
        return acc;
      },
      {} as { [key: string]: string }
    );
    const projectIds = allProjects.map((project) => project.id);

    for (let i = 0; i < projectIds.length; i++) {
      const projectId = projectIds[i];
      if (
        allProjects?.some((selectedProject) => selectedProject.id === projectId)
      ) {
        projectsCount++;

        const vulnsIssues: UnifiedIssues =
          await snykApi.listAllAggregatedIssues(
            projectOrgMap[projectId],
            projectId
          );

        const currentProjectIssuesCount = snykApi.getIssuesCount(
          vulnsIssues.data
        );
        aggregatedIssuesCount.critical += currentProjectIssuesCount.critical;
        aggregatedIssuesCount.high += currentProjectIssuesCount.high;
        aggregatedIssuesCount.medium += currentProjectIssuesCount.medium;
        aggregatedIssuesCount.low += currentProjectIssuesCount.low;
      }
    }

    return { aggregatedIssuesCount, projectsCount };
  });

  const issuesCount: IssuesCountType = value?.aggregatedIssuesCount || {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };
  if (loading) {
    return (
      <InfoCard
        title="Snyk Issues"
      >
        <Progress />
      </InfoCard>
    );
  } else if (error) {
    return (
      <InfoCard
        title="Snyk - Failed to retrieve"
        deepLink={{ title: "Error", link: "" }}
      >
        <Alert severity="error">{error?.message}</Alert>
      </InfoCard>
    );
  }

  const linkInfo = {
    title: `More details`,
    link: `snyk/`,
  };

  return (
    <InfoCard title="Snyk Issues" deepLink={linkInfo}>
      <SnykCounter issuesCount={issuesCount} /> </InfoCard>
  );
};

export const SnykOverview = () => {
  const { entity } = useEntity();
  return <SnykOverviewComponent entity={entity} />;
};
