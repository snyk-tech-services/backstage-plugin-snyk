import { Entity } from '@backstage/catalog-model';
import React, { FC } from 'react';
import { Tabs, Progress, useApi, Content, ContentHeader, SupportButton, WarningPanel }
       from '@backstage/core';
import { snykApiRef } from '../../api';
import { useAsync } from 'react-use';
import { Alert } from '@material-ui/lab';
import * as utils from '../../utils/utils'
import { ProjectsPostResponseType } from '../../types/types'
import { generateSnykTabForProject } from './snykTab'
import GitHubIcon from '@material-ui/icons/GitHub';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { mdiConsole, mdiGitlab, mdiBitbucket, mdiMicrosoftAzureDevops, mdiLambda } from '@mdi/js';
import { Grid } from '@material-ui/core';

type SnykTab = {
  name: String,
  icon: any,
  tabContent: FC<{}>
}

function SvgComponent(componentSVG: string) {
  return (
    <svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d={componentSVG}
      />
    </svg>
  )
}

const Header = () => (
  <ContentHeader
    title="Snyk"
  >
    <SupportButton>
      Any issues, please check out https://github.com/snyk-tech-services/backstage.
      <br />
      Snyk API access (paid plans) is required.
    </SupportButton>
  </ContentHeader>
);


const getIconForProjectType = (projectOrigin: string) => {
  switch(projectOrigin){
    case 'github':
      return <GitHubIcon />
    case 'cli':
      return  SvgComponent(mdiConsole)
    case 'gitlab':
      return SvgComponent(mdiGitlab)
    case 'bitbucket':
      return SvgComponent(mdiBitbucket)
    case 'azure-repos':
      return SvgComponent(mdiMicrosoftAzureDevops)
    case 'aws-lambda':
      return SvgComponent(mdiLambda)
    default:
      return <> </>
  }
}
export const SnykEntityComponent: FC<{ entity: Entity }> = ({ entity }:{
  entity: Entity;
}) => {
  if(!entity || !entity?.metadata.name ){
    return <>No name listed</>;
  }

  if(!entity || !entity?.metadata.annotations 
              || !entity?.metadata.annotations['snyk.io/org-name'] 
              || !entity?.metadata.annotations['snyk.io/project-ids'] ){
    return  <Grid container spacing={2}
              justify="center"
              direction="column"
              alignItems="center">
                <Grid item>
                      <WarningPanel
                        title="Unable to find snyk project details"
                        message={
                          <>
                            Seems we are missing some references, check out the annotations in <a href="https://github.com/snyk-tech-services/backstage-test/blob/master/java-goof-component.yaml">java-goof-component.yaml</a>.
                          </>
                        }
                      />
                </Grid>
                <Grid item>
                  <img src="https://i.gifer.com/yH.gif" />
                </Grid>
            </Grid>
  }
  
  const tabs: Array<SnykTab> = []

  const snykApi = useApi(snykApiRef);  
  // const configApi = useApi(configApiRef);
  // const backendBaseUrl = configApi.getString('backend.baseUrl');
  const orgName = entity?.metadata.annotations?.['snyk.io/org-name'] || 'null'

  const { value, loading, error } = useAsync(
    async () => {
      const fullProjectList: ProjectsPostResponseType = await snykApi.ProjectList(orgName)
      return {fullProjectList}
    }
  );
  if (loading) {
    return <Content><Progress /></Content>
  } else if (error) {
    console.log(error)
    return <Alert severity="error">{error.message}</Alert>
  }

  const projectIdsFromAnnotations: Record<string,string> = entity?.metadata.annotations || {}
  const projectList = value?.fullProjectList.projects?.filter(project => 
    project.id && utils.extractProjectIdFromAnnotations(projectIdsFromAnnotations).includes(project.id))

  utils.extractProjectIdFromAnnotations(projectIdsFromAnnotations).forEach(projectId => {
    if(projectList?.some(selectedProject => selectedProject.id == projectId)){
      tabs.push({
                  name: utils.extractTargetShortname(projectList.filter(filteredProject => filteredProject.id == projectId)[0].name || 'unknown'),
                  icon: getIconForProjectType(projectList.filter(filteredProject => filteredProject.id == projectId)[0].origin || ''),
                  tabContent: generateSnykTabForProject(
                                            snykApi,
                                            orgName,
                                            projectId)
                })
    } else {
      tabs.push({
                name: 'Not found',
                icon: <ErrorOutlineIcon />,
                tabContent: () => <Content><Alert severity="error">Project Not Found</Alert></Content>})
    }
  })


  return <Content>
    <Header />
    <Tabs
      tabs={tabs.map(tab => tab.tabContent).map((content, index) => ({
        icon: tabs[index].icon,
        label: `${tabs[index].name}`,
        content: content,
      }))}
    />
  </Content>
};

