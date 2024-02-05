import {Entity} from "@backstage/catalog-model";
import {
  SNYK_ANNOTATION_ORG,
  SNYK_ANNOTATION_ORGS,
  SNYK_ANNOTATION_TARGETID,
  SNYK_ANNOTATION_TARGETNAME,
  SNYK_ANNOTATION_TARGETS,
  SNYK_ANNOTATION_PROJECTIDS,
} from "../../config";

export {SnykEntityComponent} from "./SnykEntityComponent";
export {SnykOverview} from "./SnykOverviewComponent";

export const isPluginApplicableToEntity = (entity: Entity) =>
  (Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORG]) ||
    Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORGS])) &&
  (Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME]) ||
    Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID]) ||
    Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETS]) ||
    Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_PROJECTIDS]));
