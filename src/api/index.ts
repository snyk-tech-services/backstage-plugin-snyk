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

const DEFAULT_PROXY_PATH_BASE = "";

type Options = {
  discoveryApi: DiscoveryApi;
  /**
   * Path to use for requests via the proxy, defaults to ''
   */
  proxyPathBase?: string;
  configApiRef: ConfigApi;
};
//@ts-ignore
export const snykApiRef: ApiRef<SnykApi> = createApiRef<SnykApi>({
  id: "plugin.snyk.service",
});

export interface SnykApi {
  ListAllAggregatedIssues(orgName: string, projectId: string): Promise<any>;
  ProjectDetails(orgName: string, projectId: string): Promise<any>;
  ProjectsList(orgName: string, repoName:string): Promise<any>;
  GetDependencyGraph(orgName: string, projectId: string): Promise<any>;
  GetSnykAppHost(): string;
  GetOrgSlug(orgId: string): Promise<string>;
}

export class SnykApiClient implements SnykApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly proxyPathBase: string;
  private readonly configApiRef: ConfigApi;

  private headers = {
    "Content-Type": "application/json",
    "User-Agent": "tech-services/backstage-plugin/1.0",
  };
  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.configApiRef = options.configApiRef;
    this.proxyPathBase = options.proxyPathBase ?? DEFAULT_PROXY_PATH_BASE;
  }

  private async getApiUrl() {
    const baseUrl = await this.discoveryApi.getBaseUrl("proxy");
    return `${baseUrl}${this.proxyPathBase}/snyk`;
  }

  GetSnykAppHost() {
    return this.configApiRef.getOptionalString("snyk.AppHost") ?? "app.snyk.io";
  }

  async ListAllAggregatedIssues(orgId: string, projectId: string) {
    const backendBaseUrl = await this.getApiUrl();
    let v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";
    const apiUrl = `${backendBaseUrl}/rest/orgs/${orgId}/issues?version=2023-06-19~experimental&scan_item.id=${projectId}&scan_item.type=project&limit=100`;
    const response = await fetch(`${apiUrl}`, {
      method: "GET",
      headers: v3Headers
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Vuln Issues snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
    
    
  }
  
  async ProjectDetails(orgName: string, projectId: string) {
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

  async GetOrgSlug(orgId: string) {
    const backendBaseUrl = await this.getApiUrl();
    let v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";


    const orgsAPIUrl = `${backendBaseUrl}/rest/orgs/${orgId}?version=2023-06-19~beta`;
      const orgResponse = await fetch(`${orgsAPIUrl}`, {
        method: "GET",
        headers: v3Headers,
      });
      if (orgResponse.status >= 400 && orgResponse.status < 600) {
        throw new Error(
          `Error ${orgResponse.status} - Failed fetching Org data`
        );
      }
      const orgResponseData = await orgResponse.json()
      const orgData = orgResponseData.data as OrgData
      return orgData.attributes.slug
  }

  async ProjectsList(orgId: string, repoName: string) {
    if(repoName == ''){
      throw new Error(
        `Error - Unable to find repo name. Please add github.com/project-slug or snyk.io/target-id annotation`
      );
    }
    const backendBaseUrl = await this.getApiUrl();
    let v3Headers = this.headers;
    v3Headers["Content-Type"] = "application/vnd.api+json";
    let targetId
    if(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(repoName)){
      targetId = repoName
    } else {
      const targetsAPIUrl = `${backendBaseUrl}/rest/orgs/${orgId}/targets?displayName=${encodeURIComponent(repoName)}&version=2023-06-19~beta`;
      const targetResponse = await fetch(`${targetsAPIUrl}`, {
        method: "GET",
        headers: v3Headers,
      });
      if (targetResponse.status >= 400 && targetResponse.status < 600) {
        throw new Error(
          `Error ${targetResponse.status} - Failed fetching Targets list snyk data`
        );
      }
      const targetsList = await targetResponse.json()
      const targetsListData = targetsList.data as TargetData[]
      targetId = targetsListData.find(target => {
        return target.attributes.displayName == repoName
      })?.id
      if(!targetId){
        throw new Error(
          `Error - Failed finding Target snyk data for repo ${repoName}`
        );
      }
    }
    
    const projectsForTargetUrl = `${backendBaseUrl}/rest/orgs/${orgId}/projects?target_id=${targetId}&limit=100&version=2023-06-19~beta`;
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
    return jsonResponse.data;
  }

  async GetDependencyGraph(orgName: string, projectId: string) {
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
    return jsonResponse;
  }
}
