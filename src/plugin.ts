/*
 * Copyright 2021 Spotify AB
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
    createPlugin,
    createApiFactory,
    discoveryApiRef,
    createRoutableExtension,
    createComponentExtension,
    configApiRef, fetchApiRef,
} from "@backstage/core-plugin-api";
import { SnykApiClient, snykApiRef } from "./api";
import { entityContentRouteRef } from "./routes";

export const backstagePluginSnykPlugin: any = createPlugin({
  id: "backstage-plugin-snyk",
  apis: [
    createApiFactory({
      api: snykApiRef,
      deps: { discoveryApi: discoveryApiRef, configApiRef: configApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, configApiRef, fetchApi }) =>
        new SnykApiClient({ discoveryApi, configApi: configApiRef, fetchApi}),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntitySnykContent = backstagePluginSnykPlugin.provide(
  createRoutableExtension({
    name: "snyk",
    component: () =>
      import("./components/SnykEntityComponent").then(
        (m) => m.SnykEntityComponent
      ),
    mountPoint: entityContentRouteRef,
  })
);

export const SnykOverview = backstagePluginSnykPlugin.provide(
  createComponentExtension({
    name: "SnykOverview",
    component: {
      lazy: () =>
        import("./components/SnykEntityComponent").then((m) => m.SnykOverview),
    },
  })
);
