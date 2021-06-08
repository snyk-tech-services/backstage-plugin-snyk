import { Entity } from "@backstage/catalog-model";
import React from "react";
import {
  InfoCard,
  useApi,
  Content,
  WarningPanel,
  Progress,
} from "@backstage/core";
import { snykApiRef } from "../../api";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import * as utils from "../../utils/utils";
import { ProjectsPostResponseType } from "../../types/types";

import { Grid } from "@material-ui/core";
import { SnykCircularCounter } from "./components/SnykCircularCountersComponent";
import { issuesCount, IssuesArray } from "../../types/types";
import { useEntity } from "@backstage/plugin-catalog-react";

export const SnykOverviewComponent = ({ entity }: { entity: Entity }) => {
  if (!entity || !entity?.metadata.name) {
    return <>No Snyk org/project-ids listed</>;
  }

  if (
    !entity.metadata.annotations ||
    !entity.metadata.annotations?.["snyk.io/org-name"] ||
    !entity.metadata.annotations?.["snyk.io/project-ids"]
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
                <a href="https://github.com/snyk-tech-services/backstage-test/blob/master/java-goof-component.yaml">
                  java-goof-component.yaml
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
  // const configApi = useApi(configApiRef);
  // const backendBaseUrl = configApi.getString('backend.baseUrl');
  const orgName = entity?.metadata.annotations?.["snyk.io/org-name"] || "null";

  const counterContentStyle = { height: "50%" };

  console.log(`orgName is ${orgName}`);

  const { value, loading, error } = useAsync(async () => {
    let aggregatedIssuesCount: issuesCount = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    const fullProjectList: ProjectsPostResponseType = await snykApi.ProjectList(
      orgName
    );
    const projectIdsFromAnnotations: Record<string, string> =
      entity?.metadata.annotations || {};
    const projectList = fullProjectList.projects?.filter(
      (project) =>
        project.id &&
        utils
          .extractProjectIdFromAnnotations(projectIdsFromAnnotations)
          .includes(project.id)
    );

    let projectsCount = 0;

    const projectIds = utils.extractProjectIdFromAnnotations(
      projectIdsFromAnnotations
    );
    for (let i = 0; i < projectIds.length; i++) {
      if (
        projectList?.some(
          (selectedProject) => selectedProject.id == projectIds[i]
        )
      ) {
        projectsCount++;
        const vulnsIssues: IssuesArray = await snykApi.ListAllAggregatedIssues(
          orgName,
          projectIds[i]
        );
        const currentProjectIssuesCount = utils.getIssuesCount(vulnsIssues);
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
          style={counterContentStyle}
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
          style={counterContentStyle}
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
    link: `snyk`,
  };

  return (
    <InfoCard
      style={counterContentStyle}
      title="Vulnerabilities"
      deepLink={linkInfo}
    >
      <SnykCircularCounter issuesCount={issuesCount} />
    </InfoCard>
  );
};

export const SnykOverview = () => {
  const { entity } = useEntity();
  return <SnykOverviewComponent entity={entity} />;
};
