import React from "react";
import { compatWrapper } from "@backstage/core-compat-api";
import { EntityCardBlueprint } from "@backstage/plugin-catalog-react/alpha";
import { isSnykAvailableEntityPredicate } from "./entityPredicates";

/** @alpha */
export const snykEntityCard = EntityCardBlueprint.make({
  params: {
    filter: isSnykAvailableEntityPredicate,
    async loader() {
      const { SnykOverview } = await import(
        "../components/SnykEntityComponent"
      );
      return compatWrapper(<SnykOverview />);
    },
  },
});
