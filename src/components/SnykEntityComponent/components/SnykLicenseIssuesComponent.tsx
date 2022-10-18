import React, { FC } from "react";
import { Table, TableColumn, Link } from "@backstage/core-components";
import { Issue } from "../../../types/types";

type DenseTableProps = {
  issues: Array<Issue>;
  pageUrl: string;
};

export const LicenseIssuesTable: FC<DenseTableProps> = ({ issues, pageUrl }) => {
  const columns: TableColumn[] = [
    { title: "Severity", field: "severity" },
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Versions", field: "versions" },
    { title: "Description", field: "description" },
  ];
  //@ts-ignore
  const data = issues.map((issue) => {
    const deepLinkToIssue = <Link to={`${pageUrl}#issue-${issue.id}`}>{issue.id}</Link>
    return {
      severity: issue.issueData.severity,
      id: deepLinkToIssue,
      name: issue.pkgName,
      versions: issue.pkgVersions,
      description: issue.issueData.title,
    };
  });

  return (
    <Table
      title="License issues"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};
