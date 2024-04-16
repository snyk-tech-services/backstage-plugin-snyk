import React, { FC } from "react";
import * as depgraph from "@snyk/dep-graph";
import { SnykCircularDepCounter } from "./SnykCircularDepCountersComponent";
import { DepgraphGetResponseType } from "../../../types/types";
import { DepCount as depCountType } from "../../../types/types";
import { Grid } from "@mui/material";
import { InfoCard } from "@backstage/core-components";

type DepGraphProps = {
  depGraph: DepgraphGetResponseType;
};

export const DepGraphInfo: FC<DepGraphProps> = ({ depGraph }) => {
  const snykGraph: depgraph.DepGraph = depgraph.createFromJSON(
    depGraph.depGraph as unknown as depgraph.DepGraphData
  );
  const nodes = depGraph.depGraph.graph.nodes || [];
  const directDeps = nodes[0].deps || [];
  const indirectDeps = nodes
    .slice(1)
    .filter((node) => !directDeps.map((x) => x.nodeId).includes(node.nodeId));
  const directCount = directDeps.length;
  const indirectCount = indirectDeps.length;
  const totalCount = snykGraph.getPkgs().length - 1; // not counting rootPkg

  const depCount: depCountType = {
    directCount: directCount,
    indirectCount: indirectCount,
    totalCount: totalCount,
  };
  return (
    <InfoCard>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        direction="column"
      >
        <Grid item>
          Total Dependency count = {totalCount}
          <br />
        </Grid>
        <Grid item>
          <SnykCircularDepCounter depCount={depCount} />
        </Grid>
      </Grid>
    </InfoCard>
  );
};
