import React from "react";
import {
  // Tabs,
  Progress,
  Content,
  TabbedLayout,
  Link
  
} from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import { MissingAnnotationEmptyState, InfoCard } from "@backstage/core-components";
import { snykApiRef } from "../../api";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import * as utils from "../../utils/utils";
import { generateSnykTabForProject } from "./snykTab";
import GitHubIcon from "@material-ui/icons/GitHub";

import {
  mdiConsole,
  mdiGitlab,
  mdiBitbucket,
  mdiMicrosoftAzureDevops,
  mdiLambda,
} from "./svgs";
import { useEntity } from "@backstage/plugin-catalog-react";
import { ProjectsData } from "../../types/projectsTypes";
import { SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_TARGETID, SNYK_ANNOTATION_TARGETNAME } from "../../config";

type SnykTab = {
  name: string;
  icon: any;
  tabContent: any;
  type: string;
};

function SvgComponent(componentSVG: string) {
  return (
    <svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d={componentSVG} />
    </svg>
  );
}

const getIconForProjectType = (projectOrigin: string) => {
  switch (projectOrigin) {
    case "github":
      return <GitHubIcon />;
    case "cli":
      return SvgComponent(mdiConsole);
    case "gitlab":
      return SvgComponent(mdiGitlab);
    case "bitbucket":
      return SvgComponent(mdiBitbucket);
    case "azure-repos":
      return SvgComponent(mdiMicrosoftAzureDevops);
    case "aws-lambda":
      return SvgComponent(mdiLambda);
    default:
      return <> </>;
  }
};


export const SnykEntityComponent = () => {
  const { entity } = useEntity();
  if (!entity || !entity?.metadata.name) {
    return <>No Snyk org/project-ids listed</>;
  }
  const containerStyle = { width: '60%', padding: '20px' };
  if (
    !entity ||
    !entity?.metadata.annotations ||
    !entity?.metadata.annotations[SNYK_ANNOTATION_ORG] ||
    !(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME] || entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID])
  ) {
    return (
      <Content>
        <div style={containerStyle}>
        <MissingAnnotationEmptyState annotation={[SNYK_ANNOTATION_ORG,SNYK_ANNOTATION_TARGETNAME]} />
        </div>
        or alternatively using the target ID you can retrieve using the <Link to={'https://apidocs.snyk.io/?version=2023-06-19%7Ebeta#get-/orgs/-org_id-/targets'}>Targets endpoint</Link> endpoint.
        <div style={containerStyle}>
        <MissingAnnotationEmptyState annotation={[SNYK_ANNOTATION_ORG,SNYK_ANNOTATION_TARGETID]} />
        </div>
      </Content>
    );
  }

  const tabs: Array<SnykTab> = [];

  const snykApi = useApi(snykApiRef);
  const orgId = entity?.metadata.annotations?.[SNYK_ANNOTATION_ORG] || "null";

  const { value, loading, error } = useAsync(async () => {
    const fullProjectList = await snykApi.ProjectsList(
      orgId,
      entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME] || entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID] || ''
    );
    const orgSlug = await snykApi.GetOrgSlug(orgId)
    return { fullProjectList, orgSlug };
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
  }

  const projectList = value?.fullProjectList as ProjectsData[];
  const orgSlug = value?.orgSlug || ''
  projectList.forEach((project) => {
    tabs.push({
      name: utils.extractTargetShortname(project.attributes.name || "unknown"),
      icon: getIconForProjectType(project.attributes.origin || ""),
      tabContent: generateSnykTabForProject(snykApi, orgId, orgSlug, project.id,entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME] || entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID] || ''),
      type: project.attributes.type,
    });
  });

    const infoCardTitle = `${tabs.length} Project${tabs.length>1? 's' : '' }`

  return (
    <><InfoCard title={infoCardTitle} cardClassName="infocardstyle">
      
      <TabbedLayout>
        {tabs.map(tab => (
          <TabbedLayout.Route key={tab.name+tab.type} path={tab.name} title={`(${tab.type}) ${tab.name.substring(0,15)}${tab.name.length > 15 ? '...':''}`}>
        <Content><tab.tabContent /></Content>
      </TabbedLayout.Route>
        ))}</TabbedLayout>
  </InfoCard>
  </>
  
  );
};
