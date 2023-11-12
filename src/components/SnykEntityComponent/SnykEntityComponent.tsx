import React from "react";
import {
  // Tabs,
  Progress,
  Content,
  TabbedLayout,
  Link,
} from "@backstage/core-components";
import { useApi } from "@backstage/core-plugin-api";
import {
  MissingAnnotationEmptyState,
  InfoCard,
} from "@backstage/core-components";
import { snykApiRef } from "../../api";
import { useAsync } from "react-use";
import { Alert } from "@material-ui/lab";
import * as utils from "../../utils/utils";
import { generateSnykTabForProject } from "./SnykTab";
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
import {
  SNYK_ANNOTATION_ORG,
  SNYK_ANNOTATION_TARGETID,
  SNYK_ANNOTATION_TARGETNAME,
} from "../../config";

type SnykTab = {
  name: string;
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
      <path fill="currentColor" d={componentSVG} />
    </svg>
  );
}

const getIconForProjectType = (projectOrigin: string) => {
  switch (projectOrigin) {
    case "github":
      return <GitHubIcon />;
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
  const { entity } = useEntity();

  const snykApi = useApi(snykApiRef);
  if (!entity || !entity?.metadata.name) {
    return <>No Snyk org/project-ids listed</>;
  }
  const containerStyle = { width: "60%", padding: "20px" };
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

  const orgId = entity?.metadata.annotations?.[SNYK_ANNOTATION_ORG] || "null";

  const { value, loading, error } = useAsync(async () => {
    const completeProjectsList: ProjectsData[] = entity?.metadata.annotations
      ? await snykApi.getCompleteProjectsListFromAnnotations(
          orgId,
          entity?.metadata.annotations
        )
      : [];
    const orgSlug = await snykApi.getOrgSlug(orgId);
    return { completeProjectsList, orgSlug };
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

  const projectList = value?.completeProjectsList as ProjectsData[];
  const orgSlug = value?.orgSlug || "";
  projectList.forEach((project) => {
    tabs.push({
      name: `${utils.extractTargetShortname(
        project.attributes.name || "unknown"
      )}`,
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
  });

  const infoCardTitle = `${tabs.length} Project${tabs.length > 1 ? "s" : ""}`;

  return (
    <>
      <InfoCard title={infoCardTitle} cardClassName="infocardstyle">
        <TabbedLayout>
          {tabs.map((tab) => (
            <TabbedLayout.Route
              key={tab.projectId}
              path={tab.name}
              title={`(${tab.type}-${tab.projectId.substring(0, 3)}) ${
                tab.name
              }`}
            >
              <Content>
                <tab.tabContent />
              </Content>
            </TabbedLayout.Route>
          ))}
        </TabbedLayout>
      </InfoCard>
    </>
  );
};
