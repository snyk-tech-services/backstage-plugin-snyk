export const extractTargetShortname = (rawName: string): string => {
  let name = "";
  const tokenizedName = rawName.split(":");
  if (tokenizedName.length === 2) {
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
  if (projectIds && projectIds.length === 1) {
    projectIds = annotationsObject["snyk.io/project-ids"]
      .split(",")
      .map((x) => x.replace(" ", ""));
  } else {
    throw new Error("unexpected project Ids syntax");
  }
  return projectIds;
};
