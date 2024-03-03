import { SnykApiClient } from './index';
import {MockConfigApi, MockFetchApi} from "@backstage/test-utils";
import { UrlPatternDiscovery } from '@backstage/core-app-api';

const EXAMPLE_ORG_ID = '361fd3c0-41d4-4ea4-ba77-09bb17890967';

describe('SnykApiClient', () => {
    const mockBaseUrl = 'http://localhost:3000';
    const configApi = new MockConfigApi({ 'snyk.mocked': false });
    const discoveryApi = UrlPatternDiscovery.compile(mockBaseUrl);
    const fetchApi = new MockFetchApi({});
    const snykApiClient = new SnykApiClient({ discoveryApi, configApi, fetchApi });
    describe('getCompleteProjectsListFromAnnotations', () => {
        describe('when there are no annotations', () => {
            it('should return an empty array', async () => {
                const result = await snykApiClient.getCompleteProjectsListFromAnnotations(EXAMPLE_ORG_ID, {});
                expect(result).toEqual([]);
            });
        });
        describe('when there is a single annotation', () => {
           describe('and the annotation is snyk.io/org-id', () => {
              it('should return an empty array', async () => {
                    const result = await snykApiClient.getCompleteProjectsListFromAnnotations(EXAMPLE_ORG_ID, {
                        'snyk.io/org-id': EXAMPLE_ORG_ID,
                    });
                    expect(result).toEqual([]);
              });
           });
           describe('and the annotation is snyk.io/org-ids', () => {
it('should return an empty array', async () => {
                    const result = await snykApiClient.getCompleteProjectsListFromAnnotations(EXAMPLE_ORG_ID, {
                        'snyk.io/org-ids': EXAMPLE_ORG_ID,
                    });
                    expect(result).toEqual([]);
              });
           });
           describe('and the annotation is github.com/project-slug (target name)', () => {
               it('should return a full project by the provided target name', async () => {
                    const result = await snykApiClient.getCompleteProjectsListFromAnnotations(EXAMPLE_ORG_ID, {
                        'github.com/project-slug': 'Snyk Demo/java-goof',
                    });
                    //TODO: fix to include the actual expected result
                    expect(result).toContainEqual([
                        {
                            id: EXAMPLE_ORG_ID,
                        },
                    ]);
               });
           });
        });
    });
});