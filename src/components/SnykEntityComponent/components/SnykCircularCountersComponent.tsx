import React, { FC, useEffect, useRef, useState } from "react";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IssuesCount } from "../../../types/types";

export type SnykCircularCounterProps = {
  issuesCount: IssuesCount;
  loading: boolean;
};
export const SnykCircularCounter: FC<SnykCircularCounterProps> = ({
  issuesCount,
  loading,
}) => {
  const criticalSevCount = issuesCount.critical;
  const highSevCount = issuesCount.high;
  const mediumSevCount = issuesCount.medium;
  const lowSevCount = issuesCount.low;
  const total = criticalSevCount + highSevCount + mediumSevCount + lowSevCount;

  const [lines, setLines] = useState([
    {
      color: `rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(
        128 + Math.random() * 128
      )})`,
      value: Math.floor(Math.random() * 10),
    },
    {
      color: `rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(
        128 + Math.random() * 128
      )})`,
      value: Math.floor(Math.random() * 10),
    },
    {
      color: `rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(
        128 + Math.random() * 128
      )})`,
      value: Math.floor(Math.random() * 10),
    },
    {
      color: `rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(
        128 + Math.random() * 128
      )})`,
      value: Math.floor(Math.random() * 10),
    },
  ]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // In seconds
  const transitionDuration = 1;

  useEffect(() => {
    if (loading) {
      intervalId.current = setInterval(() => {
        setLines((allLines) =>
          allLines.map((line) => ({
            // Random color between blue and purple
            color: `rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(
              128 + Math.random() * 128
            )})`,
            // Increase/decrease value by a random amount between 20 and -20, no more than 50 and no less than 0
            value: Math.max(
              0,
              Math.min(50, line.value + Math.floor(Math.random() * 40) - 10)
            ),
          }))
        );
      }, transitionDuration * 1000);
    } else {
      setLines((allLines) =>
        allLines.map((line: { color: string; value: number }) => ({
          ...line,
        }))
      );
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [loading]);

  useEffect(() => {
    // Cleanup function to clear the interval
    return () => {
      if (intervalId) {
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
      }
    };
  }, []);

  if (!loading) {
    if (total === 0) {
      lines[0].value = 100;
      lines[1].value = 100;
      lines[2].value = 100;
      lines[3].value = 100;
      lines[0].color = "#00ff00";
      lines[1].color = "#44ff44";
      lines[2].color = "#88ff88";
      lines[3].color = "#bbffbb";
    } else {
      lines[0].value = (criticalSevCount * 100) / total;
      lines[1].value = (highSevCount * 100) / total;
      lines[2].value = (mediumSevCount * 100) / total;
      lines[3].value = (lowSevCount * 100) / total;
      lines[0].color = "#f00";
      lines[1].color = "orange";
      lines[2].color = "yellow";
      lines[3].color = "#dcff00";
    }
  }
  return (
    <CircularProgressbarWithChildren
      value={lines[0].value}
      strokeWidth={6}
      circleRatio={2 / 3}
      styles={buildStyles({
        pathTransitionDuration: transitionDuration,
        strokeLinecap: "butt",
        pathColor: lines[0].color,
        trailColor: "#eee",
        pathTransition:
          "stroke-dashoffset 1s ease-in-out, stroke 1s ease-in-out",

        rotation: -1 / 3,
      })}
    >
      {/*
            Width here needs to be (100 - 2 * strokeWidth)% 
            in order to fit exactly inside the outer progressbar.
            */}
      <div style={{ width: "88%" }}>
        <CircularProgressbarWithChildren
          value={lines[1].value}
          circleRatio={2 / 3}
          strokeWidth={6}
          styles={buildStyles({
            pathTransition:
              "stroke-dashoffset 1s ease-in-out, stroke 1s ease-in-out",
            pathTransitionDuration: transitionDuration,
            strokeLinecap: "butt",
            pathColor: lines[1].color,
            trailColor: "#eee",
            rotation: -1 / 3,
          })}
        >
          <div style={{ width: "88%" }}>
            <CircularProgressbarWithChildren
              value={lines[2].value}
              circleRatio={2 / 3}
              styles={buildStyles({
                pathTransition:
                  "stroke-dashoffset 1s ease-in-out, stroke 1s ease-in-out",
                pathTransitionDuration: transitionDuration,
                strokeLinecap: "butt",
                pathColor: lines[2].color,
                trailColor: "#eee",
                rotation: -1 / 3,
              })}
            >
              <div style={{ width: "88%" }}>
                <CircularProgressbar
                  value={lines[3].value}
                  circleRatio={2 / 3}
                  styles={buildStyles({
                    pathTransition:
                      "stroke-dashoffset 1s ease-in-out, stroke 1s ease-in-out",
                    pathTransitionDuration: transitionDuration,
                    strokeLinecap: "butt",
                    pathColor: lines[3].color,
                    trailColor: "#eee",
                    rotation: -1 / 3,
                  })}
                />
                <div
                  style={{
                    position: "absolute",
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
