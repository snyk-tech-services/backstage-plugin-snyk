import { Entity } from '@backstage/catalog-model';

export { SnykEntityComponent } from "./SnykEntityComponent";
export { SnykOverview } from "./SnykOverviewComponent";

export const isPluginApplicableToEntity = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.["snyk.io/org-name"]) && Boolean(entity.metadata.annotations?.["snyk.io/project-ids"]);