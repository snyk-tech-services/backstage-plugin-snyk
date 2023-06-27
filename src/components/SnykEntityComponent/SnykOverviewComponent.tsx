import { Entity } from "@backstage/catalog-model";
import React from "react";
import {
  InfoCard,
  Content,
  WarningPanel,
  Progress,
} from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import { snykApiRef } from "../../api";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import * as utils from "../../utils/utils";
import { ProjectsData } from "../../types/projectsTypes";

import { Grid } from "@material-ui/core";
import { SnykCircularCounter } from "./components/SnykCircularCountersComponent";
import { issuesCount } from "../../types/types";
import { useEntity } from "@backstage/plugin-catalog-react";
import { UnifiedIssues } from "../../types/unifiedIssuesTypes";
import { SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_TARGETID, SNYK_ANNOTATION_TARGETNAME } from "../../config";

export const SnykOverviewComponent = ({ entity }: { entity: Entity }) => {
  if (!entity || !entity?.metadata.name) {
    return <>No Snyk org/project-ids listed</>;
  }

  if (
    !entity.metadata.annotations ||
    !entity.metadata.annotations?.[SNYK_ANNOTATION_ORG] ||
    !(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME] || entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID])
  ) {
    return (
      <Grid
        container
        spacing={2}
        justify="center"
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
          <img src="https://i.gifer.com/yH.gif" />
        </Grid>
      </Grid>
    );
  }

  const snykApi = useApi(snykApiRef);
  const orgId = entity?.metadata.annotations?.[SNYK_ANNOTATION_ORG] || "null";

  const { value, loading, error } = useAsync(async () => {
    let aggregatedIssuesCount: issuesCount = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    const fullProjectList = await snykApi.ProjectsList(orgId, entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME] || entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID] || '');
    const projectList = fullProjectList as ProjectsData[];
    
    let projectsCount = 0;

    const projectIds = projectList.map(project => project.id)
    for (let i = 0; i < projectIds.length; i++) {
      if (
        projectList?.some(
          (selectedProject) => selectedProject.id == projectIds[i]
        )
      ) {
        projectsCount++;

          const vulnsIssues: UnifiedIssues = await snykApi.ListAllAggregatedIssues(
            orgId,
            projectIds[i]
          );
          const currentProjectIssuesCount = utils.getIssuesCount(vulnsIssues.data);
          aggregatedIssuesCount.critical += currentProjectIssuesCount.critical;
          aggregatedIssuesCount.high += currentProjectIssuesCount.high;
          aggregatedIssuesCount.medium += currentProjectIssuesCount.medium;
          aggregatedIssuesCount.low += currentProjectIssuesCount.low;
        
          
      }
    }
    return { aggregatedIssuesCount, projectsCount };
  });
  let issuesCount: issuesCount = value?.aggregatedIssuesCount || {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };
  if (loading) {
    return (
      <Content>
        <InfoCard
          title="Issues"
          deepLink={{ title: "Retrieving Vulnerabilities from Snyk", link: "" }}
        >
          <SnykCircularCounter issuesCount={issuesCount} />
          <Progress />
        </InfoCard>
      </Content>
    );
  } else if (error) {
    return (
      <Content>
        <InfoCard
          title="Vulnerabilities"
          deepLink={{ title: "Error", link: "" }}
        >
          <Alert severity="error">{error?.message}</Alert>
        </InfoCard>
      </Content>
    );
  }

  const projectsCount = value?.projectsCount || 0;

  const linkInfo = {
    title: `Across ${projectsCount} project${projectsCount > 0 ? "s" : ""}`,
    link: `snyk/`,
  };

  return (
    <InfoCard title="Vulnerabilities" deepLink={linkInfo}>
      <SnykCircularCounter issuesCount={issuesCount} />
    </InfoCard>
  );
};

export const SnykOverview = () => {
  const { entity } = useEntity();
  return <SnykOverviewComponent entity={entity} />;
};
