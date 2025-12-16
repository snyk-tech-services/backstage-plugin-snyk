import {
  ApiRef,
  ConfigApi,
  createApiRef,
  DiscoveryApi,
  FetchApi,
} from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import { TargetData } from '../types/targetsTypes';
import { OrgData } from '../types/orgsTypes';
import { ProjectsData } from '../types/projectsTypes';
import {
  SNYK_ANNOTATION_TARGETID,
  SNYK_ANNOTATION_TARGETNAME,
  SNYK_ANNOTATION_TARGETDISPLAY,
  SNYK_ANNOTATION_TARGETS,
  SNYK_ANNOTATION_PROJECTIDS,
  SNYK_ANNOTATION_EXCLUDE_PROJECTIDS,
  SNYK_ANNOTATION_ORG,
  SNYK_ANNOTATION_ORGS,
} from '../config';
import { mockedProjects } from '../utils/mockedProjects';
import { mockedIssues } from '../utils/mockedIssues';
import { Entity } from '@backstage/catalog-model';
import { mockedDepGraphs } from '../utils/mockedDepGraphs';
import { mockedProjectDetails } from '../utils/mockedProjectDetails';
import { IssuesCount } from '../types/types';
import { Issue, UnifiedIssues } from '../types/unifiedIssuesTypes';
const pkg = require('../../package.json');
const DEFAULT_PROXY_PATH_BASE = '';

type Options = {
  discoveryApi: DiscoveryApi;
  /**
   * Path to use for requests via the proxy, defaults to ''
   */
  proxyPathBase?: string;
  configApi: ConfigApi;
  fetchApi: FetchApi;
};
export const snykApiRef: ApiRef<SnykApi> = createApiRef<SnykApi>({
  id: 'plugin.snyk.service',
});

export interface SnykApi {
  listAllAggregatedIssues(
    orgName: string,
    projectId: string,
  ): Promise<UnifiedIssues>;

  getProjectDetails(orgName: string, projectId: string): Promise<any>;

  getCompleteProjectsListFromAnnotations(
    orgId: string,
    annotations: Record<string, string>,
    ignoreMissingTargets: boolean,
  ): Promise<ProjectsData[]>;

  getDependencyGraph(orgName: string, projectId: string): Promise<any>;

  getSnykAppHost(): string;

  getSnykApiVersion(): string;

  getSnykIssuesApiVersion(): string;

  getOrgSlug(orgId: string): Promise<string>;

  isMocked(): boolean;

  isAvailableInEntity(entity: Entity): boolean;

  isShowResolvedInGraphs(entity: Entity): boolean;

  getIssuesCount(issues: Array<Issue>): IssuesCount;

  getIgnoredIssuesCount(issues: Array<Issue>): IssuesCount;
}

export class SnykApiClient implements SnykApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly proxyPathBase: string;
  private readonly configApi: ConfigApi;
  private readonly fetchApi: FetchApi;

  private headers = {
    'Content-Type': 'application/json',
    'User-Agent': `tech-services/backstage-plugin/${
      pkg.version || '0.0.0-development'
    }`,
  };

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.configApi = options.configApi;
    this.proxyPathBase = options.proxyPathBase ?? DEFAULT_PROXY_PATH_BASE;
    this.fetchApi = options.fetchApi;
  }

  private async getApiUrl() {
    const baseUrl = await this.discoveryApi.getBaseUrl('proxy');
    return `${baseUrl}${this.proxyPathBase}/snyk`;
  }

  private async fetch(path: string, method: string, isV3 = true) {
    const headers: HeadersInit = this.headers;
    if (isV3) {
      headers['Content-Type'] = 'application/vnd.api+json';
    }
    const requestInit = {
      headers,
      method,
    };
    const resp = await this.fetchApi.fetch(path, requestInit);
    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }
    return resp;
  }

  getSnykAppHost() {
    const appHost =
      this.configApi.getOptionalString('snyk.AppHost') ??
      this.configApi.getOptionalString('snyk.appHost');
    return appHost ?? 'app.snyk.io';
  }

  isMocked(): boolean {
    return this.configApi.getOptionalBoolean('snyk.mocked') ?? false;
  }

  isShowResolvedInGraphs(): boolean {
    return (
      this.configApi.getOptionalBoolean('snyk.showResolvedInGraphs') ?? false
    );
  }

  getSnykApiVersion(): string {
    return this.configApi.getOptionalString('snyk.apiVersion') ?? '2024-02-28';
  }
  getSnykIssuesApiVersion(): string {
    return (
      this.configApi.getOptionalString('snyk.issueApiVersion') ?? '2024-01-23'
    );
  }

  isAvailableInEntity(entity: Entity): boolean {
    return (
      this.isMocked() ||
      ((Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORG]) ||
        Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORGS])) &&
        (Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETS]) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID]) ||
          Boolean(
            entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETDISPLAY],
          ) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME]) ||
          Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_PROJECTIDS])))
    );
  }

  getIssuesCount = (issues: Array<Issue>): IssuesCount => {
    const criticalSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'critical' &&
        !issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;
    const highSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'high' &&
        !issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;
    const mediumSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'medium' &&
        !issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;
    const lowSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'low' &&
        !issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;

    return {
      critical: criticalSevCount,
      high: highSevCount,
      medium: mediumSevCount,
      low: lowSevCount,
    };
  };

  getIgnoredIssuesCount = (issues: Array<Issue>): IssuesCount => {
    const criticalSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'critical' &&
        issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;
    const highSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'high' &&
        issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;
    const mediumSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'medium' &&
        issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;
    const lowSevCount = issues.filter(
      issue =>
        issue.attributes.effective_severity_level === 'low' &&
        issue.attributes.ignored &&
        (issue.attributes.status !== 'resolved' ||
          this.isShowResolvedInGraphs()),
    ).length;

    return {
      critical: criticalSevCount,
      high: highSevCount,
      medium: mediumSevCount,
      low: lowSevCount,
    };
  };

  async listAllAggregatedIssues(
    orgId: string,
    projectId: string,
  ): Promise<UnifiedIssues> {
    if (this.isMocked()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockedIssues[projectId].data;
    }

    const fetchPage = async (url: string): Promise<any[]> => {
      const backendBaseUrl = await this.getApiUrl();
      const v3Headers = this.headers;
      v3Headers['Content-Type'] = 'application/vnd.api+json';

      const response = await this.fetch(`${backendBaseUrl}${url}`, 'GET');

      if (response.status >= 400 && response.status < 600) {
        throw new Error(
          `Error ${response.status} - Failed fetching Vuln Issues snyk data`,
        );
      }

      const json = await response.json();

      const currentIssues = json?.data || [];

      if (json?.links?.next) {
        const nextPageIssues = await fetchPage(json.links.next);
        return [...currentIssues, ...nextPageIssues];
      }

      return currentIssues;
    };

    const version = this.getSnykIssuesApiVersion();
    const initialApiUrl = `/rest/orgs/${orgId}/issues?version=${version}&scan_item.id=${projectId}&scan_item.type=project&limit=100`;

    return await fetchPage(initialApiUrl);
  }

  async getProjectDetails(orgName: string, projectId: string) {
    if (this.isMocked()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockedProjectDetails[projectId];
    }
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/v1/org/${orgName}/project/${projectId}`;
    const response = await this.fetch(`${apiUrl}`, 'GET', false);

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching ProjectDetails snyk data`,
      );
    }
    return response.json();
  }

  async getOrgSlug(orgId: string) {
    if (this.isMocked()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return 'nnillni';
    }

    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    v3Headers['Content-Type'] = 'application/vnd.api+json';
    const version = this.getSnykApiVersion();
    const orgsAPIUrl = `${backendBaseUrl}/rest/orgs/${orgId}?version=${version}`;
    const response = await this.fetch(`${orgsAPIUrl}`, 'GET');
    if (response.status >= 400 && response.status < 600) {
      throw new Error(`Error ${response.status} - Failed fetching Org data`);
    }
    const orgResponseData = await response.json();
    const orgData = orgResponseData.data as OrgData;
    return orgData.attributes.slug;
  }

  async getCompleteProjectsListFromAnnotations(
    orgId: string,
    annotations: Record<string, string>,
    ignoreMissingTargets = false,
  ): Promise<ProjectsData[]> {
    let completeProjectsList: ProjectsData[] = [];

    if (this.isMocked()) {
      completeProjectsList = mockedProjects;
      return completeProjectsList;
    }
    // Build targets with the following precedence:
    // - Start with snyk.io/targets if present
    // - Then append snyk.io/target-id, else snyk.io/target-name
    // - If none of the above are set, and no project-ids are present, fall back to github.com/project-slug
    let targetsArray: string[] = [];
    const explicitTargets = annotations?.[SNYK_ANNOTATION_TARGETS]
      ? annotations[SNYK_ANNOTATION_TARGETS].split(',')
          .map(s => s.trim())
          .filter(Boolean)
      : [];
    const hasProjectIds = Boolean(annotations?.[SNYK_ANNOTATION_PROJECTIDS]);

    if (explicitTargets.length > 0) {
      targetsArray = explicitTargets;
    }
    if (annotations?.[SNYK_ANNOTATION_TARGETID]) {
      targetsArray.push(annotations[SNYK_ANNOTATION_TARGETID].trim());
    } else if (annotations?.[SNYK_ANNOTATION_TARGETDISPLAY]) {
      targetsArray.push(annotations[SNYK_ANNOTATION_TARGETDISPLAY].trim());
    } else if (!hasProjectIds && targetsArray.length === 0 && annotations?.[SNYK_ANNOTATION_TARGETNAME]) {
      // Fallback to github.com/project-slug ONLY if no targets/id/name and no project-ids were provided
      targetsArray.push(annotations[SNYK_ANNOTATION_TARGETNAME].trim());
    }
    targetsArray = targetsArray.filter(Boolean);

    if (targetsArray.length > 0) {
      const fullProjectByTargetList = await this.getProjectsListByTargets(
        orgId,
        Array.isArray(targetsArray) ? targetsArray : [...targetsArray],
        ignoreMissingTargets,
      );
      completeProjectsList.push(...fullProjectByTargetList);
    }

    if (annotations?.[SNYK_ANNOTATION_PROJECTIDS]) {
      const fullProjectByIdList = await this.getProjectsListByProjectIds(
        orgId,
        annotations?.[SNYK_ANNOTATION_PROJECTIDS].split(','),
      );
      completeProjectsList.push(...fullProjectByIdList);
    }

    if (annotations?.[SNYK_ANNOTATION_EXCLUDE_PROJECTIDS]) {
      let idsToExclude =
        annotations?.[SNYK_ANNOTATION_EXCLUDE_PROJECTIDS].split(',');
      idsToExclude = idsToExclude.filter(id =>
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
          id,
        ),
      );
      completeProjectsList = completeProjectsList.filter(project => {
        return !idsToExclude.includes(project.id);
      });
    }
    return completeProjectsList;
  }

  async getProjectsListByTargets(
    orgId: string,
    repoName: string[],
    ignoreMissing = false,
  ): Promise<ProjectsData[]> {
    const TargetIdsArray: string[] = [];
    for (let i = 0; i < repoName.length; i++) {
      try {
        TargetIdsArray.push(
          `target_id=${await this.getTargetId(orgId, repoName[i])}`,
        );
      } catch (e) {
        if (!ignoreMissing) throw e;
      }
    }
    if (TargetIdsArray.length > 0) {
      const backendBaseUrl = await this.getApiUrl();
      const v3Headers = this.headers;
      v3Headers['Content-Type'] = 'application/vnd.api+json';
      const version = this.getSnykApiVersion();
      const projectsForTargetUrl = `${backendBaseUrl}/rest/orgs/${orgId}/projects?${TargetIdsArray.join(
        '&',
      )}&limit=100&version=${version}`;
      const response = await this.fetch(`${projectsForTargetUrl}`, 'GET');

      if (response.status >= 400 && response.status < 600) {
        throw new Error(
          `Error ${response.status} - Failed fetching Projects list snyk data`,
        );
      }
      const jsonResponse = await response.json();
      return jsonResponse.data as ProjectsData[];
    } else if (!ignoreMissing) {
      throw new Error(
        `No target IDs found in org ${orgId} for the targets [${repoName.join(
          ',',
        )}].`,
      );
    } else {
      return [];
    }
  }

  async getProjectsListByProjectIds(
    orgId: string,
    projectIdsArray: string[],
  ): Promise<ProjectsData[]> {
    if (projectIdsArray.length > 0) {
      const backendBaseUrl = await this.getApiUrl();
      const v3Headers = this.headers;
      v3Headers['Content-Type'] = 'application/vnd.api+json';
      const version = this.getSnykApiVersion();
      const projectsForProjectIds = `${backendBaseUrl}/rest/orgs/${orgId}/projects?ids=${projectIdsArray.join(
        '%2C',
      )}&limit=100&version=${version}`;
      const response = await this.fetch(projectsForProjectIds, 'GET');

      if (response.status >= 400 && response.status < 600) {
        throw new Error(
          `Error ${response.status} - Failed fetching Projects list snyk data`,
        );
      }
      const jsonResponse = await response.json();
      return jsonResponse.data as ProjectsData[];
    } else {
      throw new Error(`Error loading projects by Project IDs.`);
    }
  }

  private async getTargetId(
    orgId: string,
    targetIdentifier: string,
  ): Promise<string> {
    if (targetIdentifier === '') {
      throw new Error(
        `Error - Unable to resolve target. Please add snyk.io/target-id (preferred) or snyk.io/targets, or use snyk.io/target-name or github.com/project-slug as a fallback`,
      );
    }
    const backendBaseUrl = await this.getApiUrl();
    const v3Headers = this.headers;
    v3Headers['Content-Type'] = 'application/vnd.api+json';
    let targetId;
    if (
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        targetIdentifier,
      )
    ) {
      targetId = targetIdentifier;
    } else {
      const version = this.getSnykApiVersion();
      const normalize = (s: string | undefined) =>
        (s || '').trim().toLowerCase();
      const wanted = normalize(targetIdentifier);

      const tryMatch = (targets: TargetData[]): TargetData | undefined => {
        // First try exact, case-insensitive match on display_name
        let found = targets.find(
          target => normalize(target.attributes.display_name) === wanted,
        );
        if (found) return found;
        // Then try matching by repo path segment (owner/repo) from URL
        for (const target of targets) {
          const url = target?.attributes?.url;
          if (!url) continue;
          try {
            const u = new URL(url);
            const path = u.pathname.replace(/^\//, '').replace(/\.git$/, '');
            if (normalize(path) === wanted) {
              return target;
            }
          } catch (_) {
            // ignore URL parse issues and continue
          }
        }
        return undefined;
      };

      // 1) Try filtered request by display_name for efficiency
      const filteredUrl = `${backendBaseUrl}/rest/orgs/${orgId}/targets?display_name=${encodeURIComponent(
        targetIdentifier,
      )}&limit=100&version=${version}`;
      const filteredResp = await this.fetch(filteredUrl, 'GET');
      if (filteredResp.status >= 400 && filteredResp.status < 600) {
        throw new Error(
          `Error ${filteredResp.status} - Failed fetching Targets list snyk data`,
        );
      }
      const filteredJson = await filteredResp.json();
      let match: TargetData | undefined = tryMatch(
        (filteredJson?.data as TargetData[]) || [],
      );

      // 2) If not found, paginate through all targets and scan
      if (!match) {
        const baseListPath = `/rest/orgs/${orgId}/targets?limit=100&version=${version}`;
        let nextPath: string | undefined = baseListPath;
        while (nextPath) {
          const pageResp = await this.fetch(
            `${backendBaseUrl}${nextPath}`,
            'GET',
          );
          if (pageResp.status >= 400 && pageResp.status < 600) {
            throw new Error(
              `Error ${pageResp.status} - Failed fetching Targets list snyk data`,
            );
          }
          const pageJson = await pageResp.json();
          const pageData = (pageJson?.data as TargetData[]) || [];
          match = tryMatch(pageData);
          if (match) break;
          nextPath = pageJson?.links?.next;
        }
      }

      targetId = match?.id;
      if (!targetId) {
        throw new Error(
          `Error - Failed finding Target snyk data for repo ${targetIdentifier}`,
        );
      }
    }
    return targetId;
  }

  async getDependencyGraph(orgName: string, projectId: string) {
    if (this.isMocked()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockedDepGraphs[projectId];
    }
    const backendBaseUrl = await this.getApiUrl();
    const apiUrl = `${backendBaseUrl}/v1/org/${orgName}/project/${projectId}/dep-graph`;
    const response = await this.fetch(`${apiUrl}`, 'GET', false);

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `Error ${response.status} - Failed fetching DepGraph snyk data`,
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse as ProjectsData[];
  }
}
