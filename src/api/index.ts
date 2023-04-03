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

import { ApiRef, ConfigApi, createApiRef, DiscoveryApi } from "@backstage/core-plugin-api";

const DEFAULT_PROXY_PATH_BASE = "";

type Options = {
  discoveryApi: DiscoveryApi;
  /**
   * Path to use for requests via the proxy, defaults to ''
   */
  proxyPathBase?: string;
  configApiRef: ConfigApi
};
//@ts-ignore
export const snykApiRef: ApiRef<SnykApi> = createApiRef<SnykApi>({
  id: "plugin.snyk.service",
});


export interface SnykApi {
  ListAllAggregatedIssues(orgName: string, projectId: string): Promise<any>;
  ListAllAggregatedLicenseIssues(
    orgName: string,
    projectId: string
  ): Promise<any>;
  ListAllIgnoredIssues(orgName: string, projectId: string): Promise<any>;
  ProjectDetails(orgName: string, projectId: string): Promise<any>;
  ProjectList(orgName: string): Promise<any>;
  GetDependencyGraph(orgName: string, projectId: string): Promise<any>;
  GetSnykAppHost(): string
}

export class SnykApiClient implements SnykApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly proxyPathBase: string;
  private readonly configApiRef: ConfigApi

  private headers = {
    "Content-Type": "application/json",
    "User-Agent": "tech-services/backstage-plugin/1.0",
  };
  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.configApiRef = options.configApiRef
    this.proxyPathBase = options.proxyPathBase ?? DEFAULT_PROXY_PATH_BASE;
  }

  private async getApiUrl() {
    const baseUrl = await this.discoveryApi.getBaseUrl("proxy");
    // const baseUrl = await this.discoveryApi.getBaseUrl('snyk');
    return `${baseUrl}${this.proxyPathBase}/snyk`;
  }

  GetSnykAppHost () {
    return this.configApiRef.getOptionalString('snyk.AppHost') ?? 'app.snyk.io'
  }

  async ListAllAggregatedIssues(orgName: string, projectId: string) {
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/org/${orgName}/project/${projectId}/aggregated-issues`;
    const body = {
      includeDescription: false,
      filters: {
        types: ["vuln"],
        ignored: false,
      },
    };
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Vuln Issues snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  async ListAllAggregatedLicenseIssues(orgName: string, projectId: string) {
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/org/${orgName}/project/${projectId}/aggregated-issues`;
    const body = {
      includeDescription: false,
      filters: {
        types: ["license"],
        ignored: false,
      },
    };
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching License Issues snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  async ListAllIgnoredIssues(orgName: string, projectId: string) {
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/org/${orgName}/project/${projectId}/aggregated-issues`;
    const body = {
      includeDescription: false,
      filters: {
        ignored: true,
      },
    };
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Ignored Issues snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  async ProjectDetails(orgName: string, projectId: string) {
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/org/${orgName}/project/${projectId}`;
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

  async ProjectList(orgName: string) {
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/org/${orgName}/projects`;
    const body = { filters: {} };
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching Projects list snyk data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  async GetDependencyGraph(orgName: string, projectId: string) {
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/org/${orgName}/project/${projectId}/dep-graph`;
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
