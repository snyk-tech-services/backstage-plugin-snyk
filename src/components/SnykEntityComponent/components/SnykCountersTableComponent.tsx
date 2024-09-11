import React, { FC } from "react";
import { IssuesCount } from "../../../types/types";
import { StructuredMetadataTable } from '@backstage/core-components';

export type SnykCounterProps = {
  issuesCount: IssuesCount;
};

export const SnykCounterTable: FC<SnykCounterProps> = ({
  issuesCount,
}) => {
  const defaultIssueCount = {critical: 0, high: 0, medium: 0, low: 0}

  return <StructuredMetadataTable metadata={({...defaultIssueCount, ...issuesCount})} />
}
