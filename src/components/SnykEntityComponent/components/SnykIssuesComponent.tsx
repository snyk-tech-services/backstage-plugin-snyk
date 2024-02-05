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

  const data = issues
    .map((issue) => {
      const deepLinkToIssue = (
        <Link to={`${pageUrl}#issue-${issue.attributes.key}`}>
          {issue.attributes.key.substring(0, 35)}...
        </Link>
      );

      let strikeThrough = false;
      if (issue.attributes.status === "resolved") {
        strikeThrough = true;
      }

      const values: { [key: string]: any } = {
        severity: issue.attributes.effective_severity_level,
        severityRaw: issue.attributes.effective_severity_level,
        id: deepLinkToIssue,
        type: issue.attributes.type,
        status: issue.attributes.status,
        statusRaw: issue.attributes.status,
        description: issue.attributes.title,
        priority: issue.attributes.priority?.score || "",
      };

      for (const key in values) {
        if (strikeThrough && key !== "statusRaw" && key !== "severityRaw") {
          values[key] = <s>{values[key]}</s>;
        }
      }
      return values;
    })
    .sort((a, b) => {
      const statusOrder: Record<string, Number> = {
        open: 3,
        ignored: 2,
        resolved: 1,
      };

      const severity: Record<string, Number> = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1,
      };

      if (a.statusRaw !== b.statusRaw) {
        return statusOrder[a.statusRaw] < statusOrder[b.statusRaw] ? 1 : -1;
      }

      if (a.severityRaw === b.severityRaw) {
        if (a.statusRaw === "resolved" && b.statusRaw === "resolved") {
          return severity[a.severityRaw] < severity[b.severityRaw] ? 1 : -1;
        }
        return a.priority < b.priority ? 1 : -1;
      }
      return severity[a.severityRaw] < severity[b.severityRaw] ? 1 : -1;
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
