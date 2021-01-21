import { issuesCount, IssuesArray } from '../types/types'

export const getIssuesCount = (issues: IssuesArray):issuesCount => {

const highSevCount = issues.issues.filter(issue => issue.issueData.severity == 'high').length
const mediumSevCount = issues.issues.filter(issue => issue.issueData.severity == 'medium').length
const lowSevCount = issues.issues.filter(issue => issue.issueData.severity == 'low').length

 return {high: highSevCount, medium: mediumSevCount,low: lowSevCount}
}

export const extractTargetShortname = (rawName: string): String => {
 let name = ''
 const tokenizedName = rawName.split(':')
 if(tokenizedName.length == 2){
     name = tokenizedName[1]
 } else {
     name = rawName
 }
 return name
}

export const extractProjectIdFromAnnotations = (annotationsObject: Record<string,string>): Array<string> => {
    let projectIds: string[] = Object.keys(annotationsObject)
    .filter(key => key.includes('snyk.io/project-ids'))
    if(projectIds && projectIds.length == 1){
        projectIds = annotationsObject['snyk.io/project-ids'].split(',').map(x => x.replace(' ',''))
    } else {
        throw new Error('unexpected project Ids syntax')
    }
    return projectIds
}