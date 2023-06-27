import { Entity } from '@backstage/catalog-model';
import { SNYK_ANNOTATION_ORG, SNYK_ANNOTATION_TARGETID, SNYK_ANNOTATION_TARGETNAME } from '../../config';

export { SnykEntityComponent } from "./SnykEntityComponent";
export { SnykOverview } from "./SnykOverviewComponent";

export const isPluginApplicableToEntity = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_ORG]) && (Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETNAME]) || Boolean(entity.metadata.annotations?.[SNYK_ANNOTATION_TARGETID]));