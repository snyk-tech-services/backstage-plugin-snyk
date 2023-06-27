import React, { FC } from "react";
import { Table, TableColumn, Link } from "@backstage/core-components";
import { Issue } from "../../../types/unifiedIssuesTypes";

type DenseTableProps = {
  issues: Array<Issue>;
  pageUrl: string;
};

export const IssuesTable: FC<DenseTableProps> = ({ issues, pageUrl }) => {
  const columns: TableColumn[] = [
    { title: "Severity", field: "severity" },
    { title: "ID", field: "id" },
    { title: "Type", field: "type" },
    { title: "Status", field: "status" },
    { title: "Description", field: "description" },
    { title: "Priority Score", field: "priority" },
  ];

  const data = issues.map((issue) => {
    const deepLinkToIssue = <Link to={`${pageUrl}#issue-${issue.attributes.key}`}>{issue.attributes.key.substring(0,35)}...</Link>
    return {
      severity: issue.attributes.effective_severity_level,
      id: deepLinkToIssue,
      type: issue.attributes.type,
      status: issue.attributes.status,
      description: issue.attributes.title,
      priority: issue.attributes.priority?.score || "",
    };
  });

  return (
    <Table
      title="Security vulnerabilities"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};
