
import { issuesCount } from "../types/types";
import { Issue } from "../types/unifiedIssuesTypes";

export const getIssuesCount = (issues: Array<Issue>): issuesCount => {
  
  const criticalSevCount = issues.filter(
    (issue) => issue.attributes.effective_severity_level == "critical"
  ).length;
  const highSevCount = issues.filter(
    (issue) => issue.attributes.effective_severity_level == "high"
  ).length;
  const mediumSevCount = issues.filter(
    (issue) => issue.attributes.effective_severity_level == "medium"
  ).length;
  const lowSevCount = issues.filter(
    (issue) => issue.attributes.effective_severity_level == "low"
  ).length;
  return {
    critical: criticalSevCount,
    high: highSevCount,
    medium: mediumSevCount,
    low: lowSevCount,
  };
};


export const extractTargetShortname = (rawName: string): string => {
  let name = "";
  const tokenizedName = rawName.split(":");
  if (tokenizedName.length == 2) {
    name = tokenizedName[1];
  } else {
    name = rawName;
  }
  return name;
};

export const extractProjectIdFromAnnotations = (
  annotationsObject: Record<string, string>
): Array<string> => {
  let projectIds: string[] = Object.keys(annotationsObject).filter((key) =>
    key.includes("snyk.io/project-ids")
  );
  if (projectIds && projectIds.length == 1) {
    projectIds = annotationsObject["snyk.io/project-ids"]
      .split(",")
      .map((x) => x.replace(" ", ""));
  } else {
    throw new Error("unexpected project Ids syntax");
  }
  return projectIds;
};
