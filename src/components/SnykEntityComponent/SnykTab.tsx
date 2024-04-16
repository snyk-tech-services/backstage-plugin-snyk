import React from "react";
import {
  StructuredMetadataTable,
  Progress,
  InfoCard,
  Content,
  TabbedCard,
  CardTab,
} from "@backstage/core-components";
import { Grid } from "@material-ui/core";
import { SnykApi } from "../../api";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import { IssuesTable } from "./components/SnykIssuesComponent";
import { DepGraphInfo } from "./components/SnykDepGraphComponent";
import { SnykCounter } from "./components/SnykCountersComponent";
import {
  ProjectGetResponseType,
  DepgraphGetResponseType,
} from "../../types/types";
import {
  Issue,
  IssueAttributesStatusEnum,
  TypeDef,
  UnifiedIssues,
} from "../../types/unifiedIssuesTypes";

export const generateSnykTabForProject = (
  snykApi: SnykApi,
  orgId: string,
  orgSlug: string,
  projectId: string
) => {
  const genericIssuesTypeArray = Object.values(TypeDef).filter(
    (type) => type !== "license"
  );
  return ({}) => {
    const { value, loading, error } = useAsync(async () => {
      const allIssues: UnifiedIssues = await snykApi.listAllAggregatedIssues(
        orgId,
        projectId
      );
      const genericIssues: Array<Issue> = allIssues.data.filter((issue) =>
        genericIssuesTypeArray.includes(issue.attributes.type)
      );
      const licenseIssues: Array<Issue> = allIssues.data.filter(
        (issue) => issue.attributes.type === "license"
      );
      const ignoredIssues: Array<Issue> = allIssues.data.filter(
        (issue) =>
          issue.attributes.ignored === true &&
          issue.attributes.status != IssueAttributesStatusEnum.Resolved
      );

      const depGraph: DepgraphGetResponseType = genericIssues.some(
        (issue) => issue.attributes.type === TypeDef.PackageVulnerability
      )
        ? await snykApi.getDependencyGraph(orgId, projectId)
        : null;
      const projectDetails: ProjectGetResponseType =
        await snykApi.getProjectDetails(orgId, projectId);
      return {
        genericIssues,
        licenseIssues,
        ignoredIssues,
        depGraph,
        projectDetails,
      };
    });

    if (loading) {
      return (
        <Content>
          <Progress />
        </Content>
      );
    } else if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return <Alert severity="error">{error.message}</Alert>;
    } else if (!value) {
      return <Alert severity="error">Empty response</Alert>;
    }

    const issuesCount = snykApi.getIssuesCount(value.genericIssues);
    const licenseIssuesCount = snykApi.getIssuesCount(value.licenseIssues);
    const ignoredIssuesCount = snykApi.getIgnoredIssuesCount(
      value.ignoredIssues
    );

    const metadata = {
      origin: value.projectDetails.origin,
      type: value.projectDetails.type,
      created: value.projectDetails.created,
      "last tested": value.projectDetails.lastTestedDate,
      "Project ID": `${value.projectDetails.id}`,
      Organization: `${orgSlug} (${orgId})`,
    };
    const linkInfo = {
      title: "More details",
      link: `https://${snykApi.getSnykAppHost()}/org/${orgSlug}/project/${projectId}`,
    };
    if (value.depGraph) {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                direction="row"
              >
                <Grid item xs={12}>
                  <InfoCard title={value.projectDetails.name}>
                    <StructuredMetadataTable metadata={metadata} />
                  </InfoCard>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                direction="row"
              >
                <Grid item xs={4}>
                  <InfoCard title="Vulnerabilities">
                    <SnykCounter
                      issuesCount={issuesCount}
                    />
                  </InfoCard>
                </Grid>
                <Grid item xs={4}>
                  <InfoCard title="License Issues">
                    <SnykCounter
                      issuesCount={licenseIssuesCount}
                    />
                  </InfoCard>
                </Grid>
                <Grid item xs={4}>
                  <InfoCard title="Ignored Issues">
                    <SnykCounter
                      issuesCount={ignoredIssuesCount}
                    />
                  </InfoCard>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                direction="row"
              >
                <Grid item xs={12}>
                  <TabbedCard deepLink={linkInfo}>
                    <CardTab label="Issues">
                      <IssuesTable
                        issues={value.genericIssues}
                        pageUrl={linkInfo.link}
                      />
                    </CardTab>
                    <CardTab label="License Issues">
                      <IssuesTable
                        issues={value.licenseIssues}
                        pageUrl={linkInfo.link}
                      />
                    </CardTab>
                    <CardTab label="Dependencies">
                      <Grid container>
                        <DepGraphInfo depGraph={value.depGraph} />
                      </Grid>
                    </CardTab>
                    <CardTab label="Ignored">
                      <IssuesTable
                        issues={value.ignoredIssues}
                        pageUrl={linkInfo.link}
                      />
                    </CardTab>
                  </TabbedCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    }

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              direction="row"
            >
              <Grid item xs={12}>
                <InfoCard title={value.projectDetails.name}>
                  <StructuredMetadataTable metadata={metadata} />
                </InfoCard>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              direction="row"
            >
              <Grid item xs={4}>
                <InfoCard title="Vulnerabilities">
                  <SnykCounter
                    issuesCount={issuesCount}
                  />
                </InfoCard>
              </Grid>
              <Grid item xs={4}>
                <InfoCard title="License Issues">
                  <SnykCounter
                    issuesCount={licenseIssuesCount}
                  />
                </InfoCard>
              </Grid>
              <Grid item xs={4}>
                <InfoCard title="Ignored Issues">
                  <SnykCounter
                    issuesCount={ignoredIssuesCount}
                  />
                </InfoCard>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              direction="row"
            >
              <Grid item xs={12}>
                <TabbedCard deepLink={linkInfo}>
                  <CardTab label="Issues">
                    <IssuesTable
                      issues={value.genericIssues}
                      pageUrl={linkInfo.link}
                    />
                  </CardTab>
                  <CardTab label="License Issues">
                    <IssuesTable
                      issues={value.licenseIssues}
                      pageUrl={linkInfo.link}
                    />
                  </CardTab>
                  <CardTab label="Ignored">
                    <IssuesTable
                      issues={value.ignoredIssues}
                      pageUrl={linkInfo.link}
                    />
                  </CardTab>
                </TabbedCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
};
