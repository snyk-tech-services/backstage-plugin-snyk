import React, { FC } from "react";
import {
  StructuredMetadataTable,
  Progress,
  InfoCard,
  Content,
  TabbedCard,
  CardTab,
} from "@backstage/core-components";
import { Grid } from "@material-ui/core";
import { SnykApi } from "../../api/index";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import { IssuesTable } from "./components/SnykIssuesComponent";
import { LicenseIssuesTable } from "./components/SnykLicenseIssuesComponent";
import { IgnoredIssuesTable } from "./components/SnykIgnoredIssuesComponent";
import { DepGraphInfo } from "./components/SnykDepGraphComponent";
import { SnykCircularCounter } from "./components/SnykCircularCountersComponent";
import * as utils from "../../utils/utils";
import {
  IssuesArray,
  ProjectGetResponseType,
  DepgraphGetResponseType,
} from "../../types/types";

const Wrapper: FC<{}> = ({ children }) => (
  <Grid style={{ marginTop: "2px" }} container spacing={2}>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

export const generateSnykTabForProject = (
  snykApi: SnykApi,
  orgName: string,
  projectId: string
) => {
  return ({}) => {
    const { value, loading, error } = useAsync(async () => {
      const vulnsIssues: IssuesArray = await snykApi.ListAllAggregatedIssues(
        orgName,
        projectId
      );
      const licenseIssues: IssuesArray =
        await snykApi.ListAllAggregatedLicenseIssues(orgName, projectId);
      const ignoredIssues: IssuesArray = await snykApi.ListAllIgnoredIssues(
        orgName,
        projectId
      );
      const depGraph: DepgraphGetResponseType =
        await snykApi.GetDependencyGraph(orgName, projectId);
      const projectDetails: ProjectGetResponseType =
        await snykApi.ProjectDetails(orgName, projectId);
      return {
        vulnsIssues,
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
      console.log(error);
      return <Alert severity="error">{error.message}</Alert>;
    } else if (!value) {
      return <Alert severity="error">Empty response</Alert>;
    }

    const issuesCount = utils.getIssuesCount(value.vulnsIssues);
    const licenseIssuesCount = utils.getIssuesCount(value.licenseIssues);
    const ignoredIssuesCount = utils.getIssuesCount(value.ignoredIssues);
    //const cardContentStyle = { height: 200, width: 500 };

    const metadata = {
      origin: value.projectDetails.origin,
      type: value.projectDetails.type,
      "last tested": value.projectDetails.lastTestedDate,
      repository: value.projectDetails.remoteRepoUrl,
    };
    const linkInfo = {
      title: "More details",
      link: `https://app.snyk.io/org/${orgName}/project/${projectId}`,
    };
    const counterContentStyle = { height: "50%" };

    return (
      <Wrapper>
        <Grid container spacing={2} justify="space-between" direction="row">
          <Grid item xs={12}>
            <InfoCard title={value.projectDetails.name}>
              <StructuredMetadataTable metadata={metadata} />
            </InfoCard>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="space-between" direction="row">
          <Grid item xs={3}>
            <InfoCard style={counterContentStyle} title="Vulnerabilities">
              <SnykCircularCounter issuesCount={issuesCount} />
            </InfoCard>
          </Grid>
          <Grid item xs={3}>
            <InfoCard title="License Issues">
              <SnykCircularCounter issuesCount={licenseIssuesCount} />
            </InfoCard>
          </Grid>
          <Grid item xs={3}>
            <InfoCard title="Ignored Issues">
              <SnykCircularCounter issuesCount={ignoredIssuesCount} />
            </InfoCard>
          </Grid>
        </Grid>

        <Grid container spacing={2} justify="space-between" direction="row">
          <Grid item xs={12}>
            <TabbedCard deepLink={linkInfo}>
              <CardTab label="Issues">
                <IssuesTable issues={value.vulnsIssues.issues} />
              </CardTab>
              <CardTab label="License Issues">
                <LicenseIssuesTable issues={value.licenseIssues.issues} />
              </CardTab>
              <CardTab label="Dependencies">
                <Grid container>
                  <DepGraphInfo depGraph={value.depGraph} />
                </Grid>
              </CardTab>
              <CardTab label="Ignored">
                <IgnoredIssuesTable issues={value.ignoredIssues.issues} />
              </CardTab>
              {/* <CardTab label="Trends">
                    <div style={cardContentStyle}>Some content 4</div>
                  </CardTab> */}
            </TabbedCard>
          </Grid>
        </Grid>
      </Wrapper>
    );
  };
};
