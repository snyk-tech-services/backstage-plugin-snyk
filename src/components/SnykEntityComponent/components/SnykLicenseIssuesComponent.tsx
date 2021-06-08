import React, { FC } from "react";
import { Table, TableColumn } from "@backstage/core";
import { Issue } from "../../../types/types";

type DenseTableProps = {
  issues: Array<Issue>;
};

export const LicenseIssuesTable: FC<DenseTableProps> = ({ issues }) => {
  const columns: TableColumn[] = [
    { title: "Severity", field: "severity" },
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Versions", field: "versions" },
    { title: "Description", field: "description" },
  ];
  //@ts-ignore
  const data = issues.map((issue) => {
    return {
      severity: issue.issueData.severity,
      id: issue.id,
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
