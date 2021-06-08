import React, { FC } from "react";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { issuesCount } from "../../../types/types";

export type SnykCircularCounterProps = {
  issuesCount: issuesCount;
};
export const SnykCircularCounter: FC<SnykCircularCounterProps> = (
  issuesCount
) => {
  const criticalSevCount = issuesCount.issuesCount.critical;
  const highSevCount = issuesCount.issuesCount.high;
  const mediumSevCount = issuesCount.issuesCount.medium;
  const lowSevCount = issuesCount.issuesCount.low;
  const total = criticalSevCount + highSevCount + mediumSevCount + lowSevCount;

  return (
    <CircularProgressbarWithChildren
      value={total > 0 ? (criticalSevCount * 100) / total : 100}
      strokeWidth={6}
      circleRatio={2 / 3}
      styles={buildStyles({
        pathTransitionDuration: 0.5,
        strokeLinecap: "butt",
        pathColor: total > 0 ? "#f00" : "#ABEBC6",
        trailColor: "#eee",
        rotation: -1 / 3,
      })}
    >
      {/*
            Width here needs to be (100 - 2 * strokeWidth)% 
            in order to fit exactly inside the outer progressbar.
            */}
      <div style={{ width: "88%" }}>
        <CircularProgressbarWithChildren
          value={total > 0 ? (highSevCount * 100) / total : 100}
          circleRatio={2 / 3}
          strokeWidth={6}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            strokeLinecap: "butt",
            pathColor: total > 0 ? "orange" : "#ABEBC6",
            trailColor: "#eee",
            rotation: -1 / 3,
          })}
        >
          <div style={{ width: "88%" }}>
            <CircularProgressbarWithChildren
              value={total > 0 ? (mediumSevCount * 100) / total : 100}
              circleRatio={2 / 3}
              styles={buildStyles({
                pathTransitionDuration: 0.5,
                strokeLinecap: "butt",
                pathColor: total > 0 ? "yellow" : "#ABEBC6",
                trailColor: "#eee",
                rotation: -1 / 3,
              })}
            >
              <div style={{ width: "88%" }}>
                <CircularProgressbar
                  value={total > 0 ? (lowSevCount * 100) / total : 100}
                  circleRatio={2 / 3}
                  styles={buildStyles({
                    pathTransitionDuration: 0.5,
                    strokeLinecap: "butt",
                    pathColor: total > 0 ? "yellow" : "#ABEBC6",
                    trailColor: "#eee",
                    rotation: -1 / 3,
                  })}
                />
                <div
                  style={{
                    position: "absolute",
                    fontSize: "90%",
                    marginTop: "-30%",
                    marginLeft: "35%",
                  }}
                >
                  <strong>{criticalSevCount}</strong> Critical
                  <br />
                  <strong>{highSevCount}</strong> High
                  <br />
                  <strong>{mediumSevCount}</strong> Medium
                  <br />
                  <strong>{lowSevCount}</strong> Low
                </div>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </CircularProgressbarWithChildren>
  );
};
