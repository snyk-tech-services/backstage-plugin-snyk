import { EntityPredicate } from "@backstage/plugin-catalog-react/alpha";
import {
  SNYK_ANNOTATION_ORG,
  SNYK_ANNOTATION_ORGS,
  SNYK_ANNOTATION_PROJECTIDS,
  SNYK_ANNOTATION_TARGETID,
  SNYK_ANNOTATION_TARGETNAME,
  SNYK_ANNOTATION_TARGETS,
} from "../config";

export const isSnykAvailableEntityPredicate: EntityPredicate = {
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
};
