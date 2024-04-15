import React from "react";
import {
  // Tabs,
  Progress,
  Content,
  TabbedLayout,
  Link,
} from "@backstage/core-components";
import {MissingAnnotationEmptyState} from "@backstage/plugin-catalog-react";
import {useApi} from "@backstage/core-plugin-api";
import {
  InfoCard,
} from "@backstage/core-components";
import {snykApiRef} from "../../api";
import {useAsync} from "react-use";
import { Alert } from '@mui/material';
import * as utils from "../../utils/utils";
import {generateSnykTabForProject} from "./SnykTab";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
  mdiConsole,
  mdiGitlab,
  mdiBitbucket,
  mdiMicrosoftAzureDevops,
  mdiLambda,
} from "./svgs";
import {useEntity} from "@backstage/plugin-catalog-react";
import {ProjectsData} from "../../types/projectsTypes";
import {
  SNYK_ANNOTATION_ORG,
  SNYK_ANNOTATION_ORGS,
  SNYK_ANNOTATION_TARGETID,
  SNYK_ANNOTATION_TARGETNAME,
} from "../../config";

type SnykTab = {
  name: string;
  slug: string;
  icon: any;
  projectId: string;
  tabContent: any;
  type: string;
};

function svgComponent(componentSVG: string) {
  return (
    <svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d={componentSVG}/>
    </svg>
  );
}

const getIconForProjectType = (projectOrigin: string) => {
  switch (projectOrigin) {
    case "github":
      return <GitHubIcon/>;
    case "cli":
      return svgComponent(mdiConsole);
    case "gitlab":
      return svgComponent(mdiGitlab);
    case "bitbucket":
      return svgComponent(mdiBitbucket);
    case "azure-repos":
      return svgComponent(mdiMicrosoftAzureDevops);
    case "aws-lambda":
      return svgComponent(mdiLambda);
    default:
      return <> </>;
  }
};

export const SnykEntityComponent = () => {
  const {entity} = useEntity();

  const snykApi = useApi(snykApiRef);
  if (!entity || !entity?.metadata.name) {
    return <>No Snyk org/project-ids listed</>;
  }
  const containerStyle = {width: "60%", padding: "20px"};
  if (!snykApi.isAvailableInEntity(entity)) {
    const version = snykApi.getSnykApiVersion();
    return (
      <Content>
        <div style={containerStyle}>
          <MissingAnnotationEmptyState
            annotation={[SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_TARGETNAME]}
          />
        </div>
        or alternatively using the target name or ID (you can retrieve using the{" "}
        <Link
          to={`https://apidocs.snyk.io/?version=${version}%7Ebeta#get-/orgs/-org_id-/targets`}
        >
          Targets endpoint)
        </Link>{" "}
        endpoint.
        <div style={containerStyle}>
          <MissingAnnotationEmptyState
            annotation={[SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_TARGETID]}
          />
        </div>
        Other combinations are possible, please checkout the README.
      </Content>
    );
  }

  const tabs: Array<SnykTab> = [];

  const orgIds = entity?.metadata.annotations?.[SNYK_ANNOTATION_ORGS]?.split(',')
    || entity?.metadata.annotations?.[SNYK_ANNOTATION_ORG]?.split(',')
    || [];
  const hasMultipleOrgs = orgIds.length > 1;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {value, loading, error} = useAsync(async () => {
    return Promise.all(orgIds.map(async (orgId) => {
      const projectList: ProjectsData[] = entity?.metadata.annotations ? await snykApi.getCompleteProjectsListFromAnnotations(orgId, entity?.metadata.annotations, hasMultipleOrgs) : []
      const orgSlug = await snykApi.getOrgSlug(orgId);
      return {projectList, orgSlug, orgId};
    }));
  });
  if (loading) {
    return (
      <Content>
        <Progress/>
      </Content>
    );
  } else if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return <Alert severity="error">{error.message}</Alert>;
  }

  value?.forEach(({orgId, orgSlug, projectList}) => {
    projectList.forEach((project) => {
      const name = `${utils.extractTargetShortname(project.attributes.name || "unknown")}`;
      tabs.push({
        name: name,
        slug: hasMultipleOrgs ? `${orgSlug}/${name}` : name,
        icon: getIconForProjectType(project.attributes.origin || ""),
        projectId: project.id,
        tabContent: generateSnykTabForProject(
          snykApi,
          orgId,
          orgSlug,
          project.id
        ),
        type: project.attributes.type,
      });
    })
  });

  const infoCardTitle = `${tabs.length} Project${tabs.length > 1 ? "s" : ""}`;

  return (
    <>
      <InfoCard title={infoCardTitle} cardClassName="infocardstyle">
        <TabbedLayout>
          {tabs.map((tab) => (
            <TabbedLayout.Route
              key={tab.projectId}
              path={tab.slug}
              title={`(${tab.type}-${tab.projectId.substring(0, 3)}) ${tab.name}`}
            >
              <Content>
                <tab.tabContent/>
              </Content>
            </TabbedLayout.Route>
          ))}
        </TabbedLayout>
      </InfoCard>
    </>
  );
};
