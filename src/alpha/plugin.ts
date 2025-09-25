import { convertLegacyRouteRefs } from "@backstage/core-compat-api";
import { createFrontendPlugin } from "@backstage/frontend-plugin-api";

import { entityContentRouteRef } from "../routes";

import { snykApi } from "./apis";
import  { snykEntityCard } from "./entityCards";
import { snykEntityContent } from "./entityContents";

/** @alpha */
export const snykPlugin = createFrontendPlugin({
  pluginId: "snyk",
  info: { packageJson: () => import("../../package.json") },
  extensions: [snykApi, snykEntityCard, snykEntityContent],
  routes: convertLegacyRouteRefs({
    entityContent: entityContentRouteRef,
  }),
});
