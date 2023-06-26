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
import { SnykApi } from "../../api/index";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import { IssuesTable } from "./components/SnykIssuesComponent";
import { DepGraphInfo } from "./components/SnykDepGraphComponent";
import { SnykCircularCounter } from "./components/SnykCircularCountersComponent";
import * as utils from "../../utils/utils";
import {
  ProjectGetResponseType,
  DepgraphGetResponseType,
} from "../../types/types";
import { Issue, TypeDef, UnifiedIssues } from "../../types/unifiedIssuesTypes";


export const generateSnykTabForProject = (
  snykApi: SnykApi,
  orgId: string,
  projectId: string,
  orgDisplayName?: string
) => {
  const genericIssuesTypeArray = Object.values(TypeDef).filter(type => type != 'license')
  return ({}) => {
    const { value, loading, error } = useAsync(async () => {
      const allIssues: UnifiedIssues = await snykApi.ListAllAggregatedIssues(orgId,projectId)
      const genericIssues: Array<Issue> = allIssues.data.filter(issue => genericIssuesTypeArray.includes(issue.attributes.type))
      const licenseIssues: Array<Issue> = allIssues.data.filter(issue => issue.attributes.type == 'license')
      const ignoredIssues: Array<Issue> = allIssues.data.filter(issue => issue.attributes.ignored == true)

      const depGraph: DepgraphGetResponseType = genericIssues.some(issue => issue.attributes.type == TypeDef.PackageVulnerability) ? 
        await snykApi.GetDependencyGraph(orgId, projectId): null;
      const projectDetails: ProjectGetResponseType =
        await snykApi.ProjectDetails(orgId, projectId);
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
      console.log(error);
      return <Alert severity="error">{error.message}</Alert>;
    } else if (!value) {
      return <Alert severity="error">Empty response</Alert>;
    }

    const issuesCount = utils.getIssuesCount(value.genericIssues);
    const licenseIssuesCount = utils.getIssuesCount(value.licenseIssues);
    const ignoredIssuesCount = utils.getIssuesCount(value.ignoredIssues);
    

    const metadata = {
      origin: value.projectDetails.origin,
      type: value.projectDetails.type,
      "last tested": value.projectDetails.lastTestedDate,
      repository: value.projectDetails.remoteRepoUrl || orgDisplayName,
    };
    const linkInfo = {
      title: "More details",
      link: `https://${snykApi.GetSnykAppHost()}/org/${orgDisplayName}/project/${projectId}`,
    };
    if(value.depGraph){
      return (
        <>
         <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between" direction="row">
              <Grid item xs={12}>
                <InfoCard title={value.projectDetails.name}>
                  <StructuredMetadataTable metadata={metadata} />
                </InfoCard>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="space-between" direction="row">
              <Grid item xs={3}>
                <InfoCard title="Vulnerabilities">
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
  
          <Grid container spacing={2} justifyContent="space-between" direction="row">
            <Grid item xs={12}>
              <TabbedCard deepLink={linkInfo}>
                <CardTab label="Issues">
                  <IssuesTable issues={value.genericIssues} pageUrl={linkInfo.link} />
                </CardTab>
                <CardTab label="License Issues">
                  <IssuesTable issues={value.licenseIssues} pageUrl={linkInfo.link} />
                </CardTab>
               <CardTab label="Dependencies" >
                  <Grid container>
                    <DepGraphInfo depGraph={value.depGraph} />
                  </Grid>
                </CardTab>
                <CardTab label="Ignored">
                  <IssuesTable issues={value.ignoredIssues} pageUrl={linkInfo.link}/>
                </CardTab>
                
              </TabbedCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>          
      </> 
      );
    } else {
      return (
        <>
         <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between" direction="row">
              <Grid item xs={12}>
                <InfoCard title={value.projectDetails.name}>
                  <StructuredMetadataTable metadata={metadata} />
                </InfoCard>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="space-between" direction="row">
              <Grid item xs={3}>
                <InfoCard title="Vulnerabilities">
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
  
          <Grid container spacing={2} justifyContent="space-between" direction="row">
            <Grid item xs={12}>
              <TabbedCard deepLink={linkInfo}>
                <CardTab label="Issues">
                  <IssuesTable issues={value.genericIssues} pageUrl={linkInfo.link} />
                </CardTab>
                <CardTab label="License Issues">
                  <IssuesTable issues={value.licenseIssues} pageUrl={linkInfo.link} />
                </CardTab>
                <CardTab label="Ignored">
                  <IssuesTable issues={value.ignoredIssues} pageUrl={linkInfo.link}/>
                </CardTab>
                
              </TabbedCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>           
      </>   
      );
    }
  };
};
