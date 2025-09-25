import React from "react";
import {
  compatWrapper,
  convertLegacyRouteRef,
} from "@backstage/core-compat-api";
import { EntityContentBlueprint } from "@backstage/plugin-catalog-react/alpha";

import { entityContentRouteRef } from "../routes";
import { SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_ORGS, SNYK_ANNOTATION_PROJECTIDS, SNYK_ANNOTATION_TARGETID, SNYK_ANNOTATION_TARGETNAME, SNYK_ANNOTATION_TARGETS } from "../config";

/** @alpha */
export const snykEntityContent = EntityContentBlueprint.make({
  params: {
    path: "/snyk",
    title: "Snyk",
    routeRef: convertLegacyRouteRef(entityContentRouteRef),
    filter: {
      $all: [
        {
          $any: [
            {
              [`metadata.annotations.${SNYK_ANNOTATION_ORG}`]: {
                $exists: true,
              },
            },
            {
              [`metadata.annotations.${SNYK_ANNOTATION_ORGS}`]: {
                $exists: true,
              },
            },
          ],
        },
        {
          $any: [
            {
              [`metadata.annotations.${SNYK_ANNOTATION_TARGETS}`]: {
                $exists: true,
              },
            },
            {
              [`metadata.annotations.${SNYK_ANNOTATION_TARGETID}`]: {
                $exists: true,
              },
            },
            {
              [`metadata.annotations.${SNYK_ANNOTATION_TARGETNAME}`]: {
                $exists: true,
              },
            },
            {
              [`metadata.annotations.${SNYK_ANNOTATION_PROJECTIDS}`]: {
                $exists: true,
              },
            },
          ],
        },
      ],
    },
    async loader() {
      const { SnykEntityComponent } = await import(
        "../components/SnykEntityComponent"
      );
      return compatWrapper(<SnykEntityComponent />);
    },
  },
});
