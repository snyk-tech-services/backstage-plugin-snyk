/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ApiRef,
  ConfigApi,
  createApiRef,
  DiscoveryApi,
} from "@backstage/core-plugin-api";
import { TargetData } from "../types/targetsTypes";
import { OrgData } from "../types/orgsTypes";
import { ProjectsData } from "../types/projectsTypes";
import {
  SNYK_ANNOTATION_TARGETID,
  SNYK_ANNOTATION_TARGETNAME,
  SNYK_ANNOTATION_TARGETS,
  SNYK_ANNOTATION_PROJECTIDS,
  SNYK_ANNOTATION_EXCLUDE_PROJECTIDS,
  SNYK_ANNOTATION_ORG,
  SNYK_ANNOTATION_ORGS,
} from "../config";
import { mockedProjects } from "../utils/mockedProjects";
import { mockedIssues } from "../utils/mockedIssues";
import { Entity } from "@backstage/catalog-model";
import { mockedDepGraphs } from "../utils/mockedDepGraphs";
import { mockedProjectDetails } from "../utils/mockedProjectDetails";
import { IssuesCount } from "../types/types";
import { Issue } from "../types/unifiedIssuesTypes";

const DEFAULT_PROXY_PATH_BASE = "";

type Options = {
  discoveryApi: DiscoveryApi;
  /**
   * Path to use for requests via the proxy, defaults to ''
   */
  proxyPathBase?: string;
  configApi: ConfigApi;
};
export const snykApiRef: ApiRef<SnykApi> = createApiRef<SnykApi>({
  id: "plugin.snyk.service",
});

export interface SnykApi {
  listAllAggregatedIssues(orgName: string, projectId: string): Promise<any>;
  getProjectDetails(orgName: string, projectId: string): Promise<any>;
  getCompleteProjectsListFromAnnotations(
    orgId: string,
    annotations: Record<string, string>,
    ignoreMissingTargets: boolean
  ): Promise<ProjectsData[]>;
  getDependencyGraph(orgName: string, projectId: string): Promise<any>;
  getSnykAppHost(): string;
  getSnykApiVersion(): string;
  getOrgSlug(orgId: string): Promise<string>;
  isMocked(): boolean;
  isAvailableInEntity(entity: Entity): boolean;
  isShowResolvedInGraphs(entity: Entity): boolean;
  getIssuesCount(issues: Array<Issue>): IssuesCount;
}

export class SnykApiClient implements SnykApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly proxyPathBase: string;
  private readonly configApi: ConfigApi;

  private headers = {
    "Content-Type": "application/json",
    "User-Agent": "tech-services/backstage-plugin/1.0",
  };
  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.configApi = options.configApi;
    this.proxyPathBase = options.proxyPathBase ?? DEFAULT_PROXY_PATH_BASE;
  }

  private async getApiUrl() {
    const baseUrl = await this.discoveryApi.getBaseUrl("proxy");
    return `${baseUrl}${this.proxyPathBase}/snyk`;
  }

  getSnykAppHost() {
    const appHost =
      this.configApi.getOptionalString("snyk.AppHost") ??
      this.configApi.getOptionalString("snyk.appHost");
    return appHost ?? "app.snyk.io";
  }

  isMocked(): boolean {
    return this.configApi.getOptionalBoolean("snyk.mocked") ?? false;
  }

  isShowResolvedInGraphs(): boolean {
    return (
      this.configApi.getOptionalBoolean("snyk.showResolvedInGraphs") ?? false
    );
  }

  getSnykApiVersion(): string {
    return (
      this.configApi.getOptionalString("snyk.apiVersion") ??
      "2023-06-19~experimental"
    );
  }

  isAvailableInEntity(entity: Entity): boolean {
    return (
      this.isMocked() ||
      (
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORG]) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORGS])
      ) && (
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME]) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID]) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETS]) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_PROJECTIDS])
      )
    );
  }

  getIssuesCount = (issues: Array<Issue>): IssuesCount => {
    const criticalSevCount = issues.filter(
      (issue) =>
        issue.attributes.effective_severity_level === "critical" &&
        (issue.attributes.status !== "resolved" ||
          this.isShowResolvedInGraphs())
    ).length;
    const highSevCount = issues.filter(
      (issue) =>
        issue.attributes.effective_severity_level === "high" &&
        (issue.attributes.status !== "resolved" ||
          this.isShowResolvedInGraphs())
    ).length;
    const mediumSevCount = issues.filter(
      (issue) =>
        issue.attributes.effective_severity_level === "medium" &&
        (issue.attributes.status !== "resolved" ||
          this.isShowResolvedInGraphs())
    ).length;
    const lowSevCount = issues.filter(
      (issue) =>
        issue.attributes.effective_severity_level === "low" &&
        (issue.attributes.status !== "resolved" ||
          this.isShowResolvedInGraphs())
    ).length;
    return {
      critical: criticalSevCount,
      high: highSevCount,
      medium: mediumSevCount,
      low: lowSevCount,
    };
  };

  async listAllAggregatedIssues(orgId: string, projectId: string) {
    if (this.isMocked()) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockedIssues[projectId];
    }

    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    const version = this.getSnykApiVersion();
    v3Headers["Content-Type"] = "application/vnd.api+json";
    const apiUrl = `${backendBaseUrl}/rest/orgs/${orgId}/issues?version=${version}&scan_item.id=${projectId}&scan_item.type=project&limit=100`;
    const response = await fetch(`${apiUrl}`, {
      method: "GET",
      headers: v3Headers,
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Vuln Issues snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  async getProjectDetails(orgName: string, projectId: string) {
    if (this.isMocked()) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockedProjectDetails[projectId];
    }
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/v1/org/${orgName}/project/${projectId}`;
    const response = await fetch(`${apiUrl}`, {
      headers: this.headers,
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching ProjectDetails snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  async getOrgSlug(orgId: string) {
    if (this.isMocked()) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return "nnillni";
    }

    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";
    const version = this.getSnykApiVersion();
    const orgsAPIUrl = `${backendBaseUrl}/rest/orgs/${orgId}?version=${version}`;
    const orgResponse = await fetch(`${orgsAPIUrl}`, {
      method: "GET",
      headers: v3Headers,
    });
    if (orgResponse.status >= 400 && orgResponse.status < 600) {
      throw new Error(`Error ${orgResponse.status} - Failed fetching Org data`);
    }
    const orgResponseData = await orgResponse.json();
    const orgData = orgResponseData.data as OrgData;
    return orgData.attributes.slug;
  }

  async getCompleteProjectsListFromAnnotations(
    orgId: string,
    annotations: Record<string, string>,
    ignoreMissingTargets = false
  ): Promise<ProjectsData[]> {
    let completeProjectsList: ProjectsData[] = [];

    if (this.isMocked()) {
      completeProjectsList = mockedProjects;
      return completeProjectsList;
    }
    const targetsArray = annotations?.[SNYK_ANNOTATION_TARGETS]
      ? annotations?.[SNYK_ANNOTATION_TARGETS].split(",")
      : [];

    if (annotations?.[SNYK_ANNOTATION_TARGETNAME]) {
      targetsArray.push(annotations?.[SNYK_ANNOTATION_TARGETNAME]);
    } else if (annotations?.[SNYK_ANNOTATION_TARGETID]) {
      targetsArray.push(annotations?.[SNYK_ANNOTATION_TARGETID]);
    }
    if (targetsArray.length > 0) {
      const fullProjectByTargetList = await this.getProjectsListByTargets(
        orgId,
        Array.isArray(targetsArray) ? targetsArray : [...targetsArray],
        ignoreMissingTargets
      );
      completeProjectsList.push(...fullProjectByTargetList);
    }

    if (annotations?.[SNYK_ANNOTATION_PROJECTIDS]) {
      const fullProjectByIdList = await this.getProjectsListByProjectIds(
        orgId,
        annotations?.[SNYK_ANNOTATION_PROJECTIDS].split(",")
      );
      completeProjectsList.push(...fullProjectByIdList);
    }

    if (annotations?.[SNYK_ANNOTATION_EXCLUDE_PROJECTIDS]) {
      let idsToExclude =
        annotations?.[SNYK_ANNOTATION_EXCLUDE_PROJECTIDS].split(",");
      idsToExclude = idsToExclude.filter((id) =>
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
          id
        )
      );
      completeProjectsList = completeProjectsList.filter((project) => {
        return !idsToExclude.includes(project.id);
      });
    }
    return completeProjectsList;
  }

  async getProjectsListByTargets(
    orgId: string,
    repoName: string[],
    ignoreMissing = false
  ): Promise<ProjectsData[]> {
    const TargetIdsArray: string[] = [];
    for (let i = 0; i < repoName.length; i++) {
        try {
            TargetIdsArray.push(
                `target_id=${await this.getTargetId(orgId, repoName[i])}`
            );
        } catch (e) {
            if (!ignoreMissing) throw e
        }
    }
    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";
    const version = this.getSnykApiVersion();
    const projectsForTargetUrl = `${backendBaseUrl}/rest/orgs/${orgId}/projects?${TargetIdsArray.join(
      "&"
    )}&limit=100&version=${version}`;
    const response = await fetch(`${projectsForTargetUrl}`, {
      method: "GET",
      headers: v3Headers,
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Projects list snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse.data as ProjectsData[];
  }

  async getProjectsListByProjectIds(
    orgId: string,
    projectIdsArray: string[]
  ): Promise<ProjectsData[]> {
    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";
    const version = this.getSnykApiVersion();
    const projectsForTargetUrl = `${backendBaseUrl}/rest/orgs/${orgId}/projects?ids=${projectIdsArray.join(
      "%2C"
    )}&limit=100&version=${version}`;
    const response = await fetch(projectsForTargetUrl, {
      method: "GET",
      headers: v3Headers,
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Projects list snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse.data as ProjectsData[];
  }

  private async getTargetId(
    orgId: string,
    targetIdentifier: string
  ): Promise<string> {
    if (targetIdentifier === "") {
      throw new Error(
        `Error - Unable to find repo name. Please add github.com/project-slug or snyk.io/target-id annotation`
      );
    }
    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";
    let targetId;
    if (
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        targetIdentifier
      )
    ) {
      targetId = targetIdentifier;
    } else {
      const version = this.getSnykApiVersion();
      const targetsAPIUrl = `${backendBaseUrl}/rest/orgs/${orgId}/targets?displayName=${encodeURIComponent(
        targetIdentifier
      )}&version=${version}`;
      const targetResponse = await fetch(`${targetsAPIUrl}`, {
        method: "GET",
        headers: v3Headers,
      });
      if (targetResponse.status >= 400 && targetResponse.status < 600) {
        throw new Error(
          `Error ${targetResponse.status} - Failed fetching Targets list snyk data`
        );
      }
      const targetsList = await targetResponse.json();
      const targetsListData = targetsList.data as TargetData[];
      targetId = targetsListData.find((target) => {
        return target.attributes.displayName === targetIdentifier;
      })?.id;
      if (!targetId) {
        throw new Error(
          `Error - Failed finding Target snyk data for repo ${targetIdentifier}`
        );
      }
    }
    return targetId;
  }

  async getDependencyGraph(orgName: string, projectId: string) {
    if (this.isMocked()) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockedDepGraphs[projectId];
    }
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/v1/org/${orgName}/project/${projectId}/dep-graph`;
    const response = await fetch(`${apiUrl}`, {
      headers: this.headers,
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching DepGraph snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse as ProjectsData[];
  }
}
