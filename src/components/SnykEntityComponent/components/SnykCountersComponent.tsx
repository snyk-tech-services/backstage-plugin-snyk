import React, { FC } from "react";
import { IssuesCount } from "../../../types/types";
import {useSnykCounterStyle} from './SnykCounterStyle'


export type SnykCounterProps = {
  issuesCount: IssuesCount;
};


export const SnykCounter: FC<SnykCounterProps> = ({
  issuesCount,
}) => {
  const classes = useSnykCounterStyle();
  type keys = keyof typeof classes;

  const defaultIssueCount = {critical: 0, high: 0, medium: 0, low: 0}

  const children = Object.entries({...defaultIssueCount, ...issuesCount}).map(([key, value]) => {

    const cssSuffix = value > 0 ? key : 'disabled';

    return <li key={key} className={classes.item + ' '+ classes[`item_${cssSuffix}` as keys]}>
      <div className={classes.count}>
        <span>{value}</span></div>
      <abbr className={classes.text+ ' '+ classes[`item_${cssSuffix}_text` as keys]} title={`${key} issues`}>{key.slice(0,1).toUpperCase()}</abbr>
    </li>
  })

  return <ul className={classes.root} >
    {children}
  </ul>
}
