import React, { FC } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DepCount } from "../../../types/types";

export type SnykCircularDepCounterProps = {
  depCount: DepCount;
};
export const SnykCircularDepCounter: FC<SnykCircularDepCounterProps> = (
  depCount
) => {
  const directCount = depCount.depCount.directCount;
  const indirectCount = depCount.depCount.indirectCount;
  const total = depCount.depCount.totalCount;

  return (
    <CircularProgressbarWithChildren
      value={total > 0 ? (directCount * 100) / total : 100}
      strokeWidth={6}
      circleRatio={0.5}
      styles={buildStyles({
        pathTransitionDuration: 0.5,
        strokeLinecap: "butt",
        pathColor: total > 0 ? "#f00" : "#ABEBC6",
        trailColor: "#eee",
        rotation: 3 / 4,
      })}
    >
      {/*
            Width here needs to be (100 - 2 * strokeWidth)% 
            in order to fit exactly inside the outer progressbar.
            */}
      <div style={{ width: "88%" }}>
        <CircularProgressbarWithChildren
          value={total > 0 ? (indirectCount * 100) / total : 100}
          circleRatio={0.5}
          strokeWidth={6}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            strokeLinecap: "butt",
            pathColor: total > 0 ? "orange" : "#ABEBC6",
            trailColor: "#eee",
            rotation: 3 / 4,
          })}
        >
          <div style={{ width: "88%" }}>
            <div
              style={{
                position: "absolute",
                fontSize: 12,
                marginTop: "-15%",
                marginLeft: "35%",
              }}
            >
              <strong>{directCount}</strong> Direct
              <br />
              <strong>{indirectCount}</strong> Unique Indirect
            </div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </CircularProgressbarWithChildren>
  );
};
