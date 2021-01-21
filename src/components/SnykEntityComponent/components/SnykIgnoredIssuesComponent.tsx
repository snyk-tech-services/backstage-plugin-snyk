
import React, { FC } from 'react';
import { Table, TableColumn }
       from '@backstage/core';
import { Issue } from '../../../types/types'

type DenseTableProps = {
  issues: Array<Issue>
};

export const IgnoredIssuesTable: FC<DenseTableProps> = ({issues}) => {
  const columns: TableColumn[] = [
    { title: 'Severity', field: 'severity' },
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Versions', field: 'versions' },
    { title: 'Description', field: 'description' },
    { title: 'type', field: 'type' },
  ];
//@ts-ignore
  const data = issues.map(issue => {
    return {
      severity: issue.issueData.severity,
      id: issue.id,
      name: issue.pkgName,
      versions: issue.pkgVersions,
      description: issue.issueData.title,
      type: issue.issueType    
    };
  });

  
  return (
    <Table
      title="Ignored issues"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};