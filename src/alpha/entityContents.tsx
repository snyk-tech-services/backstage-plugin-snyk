import React from "react";
import {
  compatWrapper,
  convertLegacyRouteRef,
} from "@backstage/core-compat-api";
import { EntityContentBlueprint } from "@backstage/plugin-catalog-react/alpha";
import { entityContentRouteRef } from "../routes";
import { isSnykAvailableEntityPredicate } from "./entityPredicates";

/** @alpha */
export const snykEntityContent = EntityContentBlueprint.make({
  params: {
    path: "/snyk",
    title: "Snyk",
    routeRef: convertLegacyRouteRef(entityContentRouteRef),
    filter: isSnykAvailableEntityPredicate,
    async loader() {
      const { SnykEntityComponent } = await import(
        "../components/SnykEntityComponent"
      );
      return compatWrapper(<SnykEntityComponent />);
    },
  },
});
