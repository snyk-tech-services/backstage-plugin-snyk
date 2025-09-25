import {
  ApiBlueprint,
  configApiRef,
  discoveryApiRef,
  fetchApiRef,
} from "@backstage/frontend-plugin-api";

import { snykApiRef, SnykApiClient } from "../api";

/** @alpha */
export const snykApi = ApiBlueprint.make({
  params: defineParams => defineParams({
      api: snykApiRef,
      deps: {
        configApi: configApiRef,
        fetchApi: fetchApiRef,
        discoveryApi: discoveryApiRef,
      },
      factory({ configApi, fetchApi, discoveryApi }) {
       return new SnykApiClient({ configApi, fetchApi, discoveryApi });
      },
  }),
});
