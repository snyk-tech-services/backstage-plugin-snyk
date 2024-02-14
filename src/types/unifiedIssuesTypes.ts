export interface RemedyMetadata {
  /**
   * Metadata information related to apply a remedy. Limited in size to 100Kb when JSON serialized.
   * @type {{ [key: string]: any; }}
   * @memberof RemedyMetadata
   */
  data: { [key: string]: any };
  /**
   * A schema version identifier the metadata object validates against. Note: this information is only relevant in the domain of the API consumer: the issues system always considers metadata just as an arbitrary object.
   * @type {string}
   * @memberof RemedyMetadata
   */
  schemaVersion: string;
}

/**
 *
 * @export
 * @interface Remedy
 */
export interface Remedy {
  /**
   * An optional identifier for correlating remedies between coordinates or across issues. They are scoped to a single Project and test run. Remedies with the same correlation_id must have the same contents.
   * @type {string}
   * @memberof Remedy
   */
  correlationId?: string;
  /**
   * A markdown-formatted optional description of this remedy. Links are not permitted.
   * @type {string}
   * @memberof Remedy
   */
  description?: string;
  /**
   *
   * @type {RemedyMetadata}
   * @memberof Remedy
   */
  meta?: RemedyMetadata;
  /**
   *
   * @type {string}
   * @memberof Remedy
   */
  type: RemedyTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum RemedyTypeEnum {
  Indeterminate = "indeterminate",
  Manual = "manual",
  Automated = "automated",
  RuleResultMessage = "rule_result_message",
  Terraform = "terraform",
  Cloudformation = "cloudformation",
  Cli = "cli",
  Kubernetes = "kubernetes",
  Arm = "arm",
}
/**
 *
 * @export
 * @interface Coordinate
 */
export interface Coordinate {
  /**
   *
   * @type {Array<Remedy>}
   * @memberof Coordinate
   */
  remedies?: Array<Remedy>;
  /**
   * A list of precise locations that surface an issue. A coordinate may have multiple representations. For example, a package vulnerability may be represented both by its package dependency graph traversal, and by the location in a package manifest that introduced the dependency.
   * @type {Array<any>}
   * @memberof Coordinate
   */
  representations: Array<any>;
}

export enum ClassTypeDef {
  RuleCategory = "rule-category",
  Compliance = "compliance",
  Weakness = "weakness",
}

/**
 *
 * @export
 * @interface ModelClass
 */
export interface ModelClass {
  /**
   *
   * @type {string}
   * @memberof ModelClass
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof ModelClass
   */
  source: string;
  /**
   *
   * @type {ClassTypeDef}
   * @memberof ModelClass
   */
  type: ClassTypeDef;
  /**
   * An optional URL for this class.
   * @type {string}
   * @memberof ModelClass
   */
  url?: string;
}
export interface PriorityFactor {
  /**
   * A human readable description of this contributing factor.
   * @type {string}
   * @memberof PriorityFactor
   */
  description?: string;
  /**
   * A numeric priority score contributing to the overall score.
   * @type {number}
   * @memberof PriorityFactor
   */
  score: number;
  /**
   * The machine readable type of this factor.
   * @type {string}
   * @memberof PriorityFactor
   */
  type: string;
}
/**
 *
 * @export
 * @interface Priority
 */
export interface Priority {
  /**
   * An array of factors that contributed to scoring.
   * @type {Array<PriorityFactor>}
   * @memberof Priority
   */
  factors?: Array<PriorityFactor>;
  /**
   * A numeric priority score from 0 to 1000 determined by snyk.
   * @type {number}
   * @memberof Priority
   */
  score: number;
}

export enum ProblemTypeDef {
  Rule = "rule",
  Vulnerability = "vulnerability",
}
/**
 *
 * @export
 * @interface Problem
 */
export interface Problem {
  /**
   * When this problem was disclosed to the public.
   * @type {Date}
   * @memberof Problem
   */
  disclosedAt?: Date;
  /**
   * When this problem was first discovered.
   * @type {Date}
   * @memberof Problem
   */
  discoveredAt?: Date;
  /**
   *
   * @type {string}
   * @memberof Problem
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Problem
   */
  source: string;
  /**
   *
   * @type {ProblemTypeDef}
   * @memberof Problem
   */
  type: ProblemTypeDef;
  /**
   * When this problem was last updated.
   * @type {Date}
   * @memberof Problem
   */
  updatedAt?: Date;
  /**
   * An optional URL for this problem.
   * @type {string}
   * @memberof Problem
   */
  url?: string;
}

export enum ResolutionTypeDef {
  Disappeared = "disappeared",
  Fixed = "fixed",
}
/**
 * An optional field recording when and via what means an issue was resolved, if it was resolved. Resolved issues are retained for XX days.
 * @export
 * @interface Resolution
 */
export interface Resolution {
  /**
   * Optional details about the resolution. Used by Snyk Cloud so far.
   * @type {string}
   * @memberof Resolution
   */
  details?: string;
  /**
   * The time when this issue was resolved.
   * @type {Date}
   * @memberof Resolution
   */
  resolvedAt: Date;
  /**
   *
   * @type {ResolutionTypeDef}
   * @memberof Resolution
   */
  type: ResolutionTypeDef;
}
export interface Severity {
  /**
   *
   * @type {string}
   * @memberof Severity
   */
  level: SeverityLevelEnum;
  /**
   * A CVSS score for this severity, from 0 to 10 inclusive. Scores may have a single significant decimal digit. This precision is enforced in the API.
   * @type {number}
   * @memberof Severity
   */
  score?: number;
  /**
   * The source of this severity. The value may be the id of a referenced problem or class, in which case that problem or class is the source of this issue.  If source is omitted, this severity is sourced internally in the Snyk application.
   * @type {string}
   * @memberof Severity
   */
  source: string;
  /**
   *
   * @type {string}
   * @memberof Severity
   */
  vector?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum SeverityLevelEnum {
  Info = "info",
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}
export enum TypeDef {
  PackageVulnerability = "package_vulnerability",
  License = "license",
  Cloud = "cloud",
  Code = "code",
  Custom = "custom",
  Config = "config",
}
/**
 * issue attributes
 * @export
 * @interface IssueAttributes
 */
export interface IssueAttributes {
  /**
   * A list of details for weakness data, policy, etc that are the class of this issue's source.
   * @type {Array<ModelClass>}
   * @memberof IssueAttributes
   */
  classes?: Array<ModelClass>;
  /**
   * Where the issue originated, specific to issue type. Details on what code, package, etc introduced the issue. An issue may be caused by more than one coordinate.
   * @type {Array<Coordinate>}
   * @memberof IssueAttributes
   */
  coordinates?: Array<Coordinate>;
  /**
   * The creation time of this issue.
   * @type {Date}
   * @memberof IssueAttributes
   */
  created_at: Date;
  /**
   * A markdown-formatted optional description of this issue. Links are not permitted.
   * @type {string}
   * @memberof IssueAttributes
   */
  description?: string;
  /**
   * The computed effective severity of this issue. This is either the highest level from all included severities, or an overridden value set via group level policy.
   * @type {string}
   * @memberof IssueAttributes
   */
  effective_severity_level: IssueAttributesEffectiveSeverityLevelEnum;
  /**
   * A flag indicating if the issue is being ignored. Derived from the issue's ignore, which provides more details.
   * @type {boolean}
   * @memberof IssueAttributes
   */
  ignored: boolean;
  /**
   * An opaque key used for uniquely identifying this issue across test runs, within a project.
   * @type {string}
   * @memberof IssueAttributes
   */
  key: string;
  /**
   *
   * @type {Priority}
   * @memberof IssueAttributes
   */
  priority?: Priority;
  /**
   * A list of details for vulnerability data, policy, etc that are the source of this issue.
   * @type {Array<Problem>}
   * @memberof IssueAttributes
   */
  problems?: Array<Problem>;
  /**
   *
   * @type {Resolution}
   * @memberof IssueAttributes
   */
  resolution?: Resolution;
  /**
   * A list of severities given to this issue from associated source.
   * @type {Array<Severity>}
   * @memberof IssueAttributes
   */
  severities?: Array<Severity>;
  /**
   * The issue's status. Derived from the issue's resolution, which provides more details.
   * @type {string}
   * @memberof IssueAttributes
   */
  status: IssueAttributesStatusEnum;
  /**
   * A human-readable title for this issue.
   * @type {string}
   * @memberof IssueAttributes
   */
  title: string;
  /**
   * An opaque identifier for corelating across test runs.
   * @type {string}
   * @memberof IssueAttributes
   */
  tool?: string;
  /**
   *
   * @type {TypeDef}
   * @memberof IssueAttributes
   */
  type: TypeDef;
  /**
   * The time when this issue was last modified.
   * @type {Date}
   * @memberof IssueAttributes
   */
  updatedAt: Date;
}

/**
 * @export
 * @enum {string}
 */
export enum IssueAttributesEffectiveSeverityLevelEnum {
  Info = "info",
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}
/**
 * @export
 * @enum {string}
 */
export enum IssueAttributesStatusEnum {
  Open = "open",
  Resolved = "resolved",
}

export interface IssueLinks {
  /**
   * A URL for the location of the issue
   * @type {string}
   * @memberof IssueLinks
   */
  self?: string;
}
export enum ScanItemType {
  Project = "project",
  Environment = "environment",
}
/**
 *
 * @export
 * @interface IgnoreCreateRelationshipsScanItemData
 */
export interface IgnoreCreateRelationshipsScanItemData {
  /**
   *
   * @type {string}
   * @memberof IgnoreCreateRelationshipsScanItemData
   */
  id: string;
  /**
   *
   * @type {ScanItemType}
   * @memberof IgnoreCreateRelationshipsScanItemData
   */
  type: ScanItemType;
}
/**
 *
 * @export
 * @interface IgnoreCreateRelationshipsScanItem
 */
export interface IgnoreCreateRelationshipsScanItem {
  /**
   *
   * @type {IgnoreCreateRelationshipsScanItemData}
   * @memberof IgnoreCreateRelationshipsScanItem
   */
  data: IgnoreCreateRelationshipsScanItemData;
}
export enum OrganizationType {
  Organization = "organization",
}

/**
 *
 * @export
 * @interface IgnoreRelationshipsOrganizationData
 */
export interface IgnoreRelationshipsOrganizationData {
  /**
   *
   * @type {string}
   * @memberof IgnoreRelationshipsOrganizationData
   */
  id: string;
  /**
   *
   * @type {OrganizationType}
   * @memberof IgnoreRelationshipsOrganizationData
   */
  type: OrganizationType;
}
/**
 *
 * @export
 * @interface IgnoreRelationshipsOrganization
 */
export interface IgnoreRelationshipsOrganization {
  /**
   *
   * @type {IgnoreRelationshipsOrganizationData}
   * @memberof IgnoreRelationshipsOrganization
   */
  data: IgnoreRelationshipsOrganizationData;
}
export enum IgnoreType {
  Ignore = "ignore",
}
/**
 *
 * @export
 * @interface IssueRelationshipsIgnoreData
 */
export interface IssueRelationshipsIgnoreData {
  /**
   *
   * @type {string}
   * @memberof IssueRelationshipsIgnoreData
   */
  id: string;
  /**
   *
   * @type {IgnoreType}
   * @memberof IssueRelationshipsIgnoreData
   */
  type: IgnoreType;
}
/**
 * An optional reference to an ignore rule that marks this issue as ignored.
 * @export
 * @interface IssueRelationshipsIgnore
 */
export interface IssueRelationshipsIgnore {
  /**
   *
   * @type {IssueRelationshipsIgnoreData}
   * @memberof IssueRelationshipsIgnore
   */
  data: IssueRelationshipsIgnoreData;
}
export enum PolicyType {
  Policy = "policy",
}
/**
 *
 * @export
 * @interface IssueRelationshipsPoliciesData
 */
export interface IssueRelationshipsPoliciesData {
  /**
   *
   * @type {string}
   * @memberof IssueRelationshipsPoliciesData
   */
  id: string;
  /**
   *
   * @type {PolicyType}
   * @memberof IssueRelationshipsPoliciesData
   */
  type: PolicyType;
}
/**
 *
 * @export
 * @interface IssueRelationshipsPolicies
 */
export interface IssueRelationshipsPolicies {
  /**
   * An optional list of references to a Policy rule that modified some details about the Issue during processing.
   * @type {Array<IssueRelationshipsPoliciesData>}
   * @memberof IssueRelationshipsPolicies
   */
  data: Array<IssueRelationshipsPoliciesData>;
}

/**
 *
 * @export
 * @interface IssueRelationshipsPreviousData
 */
export interface IssueRelationshipsPreviousData {
  /**
   *
   * @type {string}
   * @memberof IssueRelationshipsPreviousData
   */
  id: string;
  /**
   *
   * @type {IssueType}
   * @memberof IssueRelationshipsPreviousData
   */
  type: IssueType;
}
/**
 * A previous resolved occurance of this issue. If present, the issues will have the same key. Multiple previous occurances may exist, and can be retrieved by following the \"previous\" chain.
 * @export
 * @interface IssueRelationshipsPrevious
 */
export interface IssueRelationshipsPrevious {
  /**
   *
   * @type {IssueRelationshipsPreviousData}
   * @memberof IssueRelationshipsPrevious
   */
  data: IssueRelationshipsPreviousData;
}
export enum TestExecutionType {
  TestWorkflowExecution = "test-workflow-execution",
  CustomExecution = "custom-execution",
}
/**
 *
 * @export
 * @interface IssueRelationshipsTestExecutionsData
 */
export interface IssueRelationshipsTestExecutionsData {
  /**
   *
   * @type {string}
   * @memberof IssueRelationshipsTestExecutionsData
   */
  id: string;
  /**
   *
   * @type {TestExecutionType}
   * @memberof IssueRelationshipsTestExecutionsData
   */
  type: TestExecutionType;
}
/**
 * The \"test execution\" that identified this Issues. This ID represents a grouping of issues, that were identified by some analysis run, to produce Issues.
 * @export
 * @interface IssueRelationshipsTestExecutions
 */
export interface IssueRelationshipsTestExecutions {
  /**
   * List of metadata associated with the test executions that identified this issue
   * @type {Array<IssueRelationshipsTestExecutionsData>}
   * @memberof IssueRelationshipsTestExecutions
   */
  data: Array<IssueRelationshipsTestExecutionsData>;
}
/**
 * issue relationships
 * @export
 * @interface IssueRelationships
 */
export interface IssueRelationships {
  /**
   *
   * @type {IssueRelationshipsIgnore}
   * @memberof IssueRelationships
   */
  ignore?: IssueRelationshipsIgnore;
  /**
   *
   * @type {IgnoreRelationshipsOrganization}
   * @memberof IssueRelationships
   */
  organization: IgnoreRelationshipsOrganization;
  /**
   *
   * @type {IssueRelationshipsPolicies}
   * @memberof IssueRelationships
   */
  policies?: IssueRelationshipsPolicies;
  /**
   *
   * @type {IssueRelationshipsPrevious}
   * @memberof IssueRelationships
   */
  previous?: IssueRelationshipsPrevious;
  /**
   *
   * @type {IgnoreCreateRelationshipsScanItem}
   * @memberof IssueRelationships
   */
  scanItem: IgnoreCreateRelationshipsScanItem;
  /**
   *
   * @type {IssueRelationshipsTestExecutions}
   * @memberof IssueRelationships
   */
  testExecutions?: IssueRelationshipsTestExecutions;
}
export enum IssueType {
  Issue = "issue",
}

export interface Issue {
  /**
   *
   * @type {IssueAttributes}
   * @memberof Issue
   */
  attributes: IssueAttributes;
  /**
   *
   * @type {string}
   * @memberof Issue
   */
  id: string;
  /**
   *
   * @type {IssueLinks}
   * @memberof Issue
   */
  links?: IssueLinks;
  /**
   *
   * @type {IssueRelationships}
   * @memberof Issue
   */
  relationships: IssueRelationships;
  /**
   *
   * @type {IssueType}
   * @memberof Issue
   */
  type: IssueType;
}

export interface JsonApi {
  /**
   * Version of the JSON API specification this server supports.
   * @type {string}
   * @memberof JsonApi
   */
  version: string;
}
export interface LinkProperty {}
/**
 *
 * @export
 * @interface PaginatedLinks
 */
export interface PaginatedLinks {
  /**
   *
   * @type {LinkProperty}
   * @memberof PaginatedLinks
   */
  first?: LinkProperty;
  /**
   *
   * @type {LinkProperty}
   * @memberof PaginatedLinks
   */
  last?: LinkProperty;
  /**
   *
   * @type {LinkProperty}
   * @memberof PaginatedLinks
   */
  next?: LinkProperty;
  /**
   *
   * @type {LinkProperty}
   * @memberof PaginatedLinks
   */
  prev?: LinkProperty;
  /**
   *
   * @type {LinkProperty}
   * @memberof PaginatedLinks
   */
  self?: LinkProperty;
}

export interface UnifiedIssues {
  /**
   *
   * @type {Array<Issue>}
   * @memberof InlineResponse2003
   */
  data: Array<Issue>;
  /**
   *
   * @type {JsonApi}
   * @memberof InlineResponse2003
   */
  jsonapi: JsonApi;
  /**
   *
   * @type {PaginatedLinks}
   * @memberof InlineResponse2003
   */
  links?: PaginatedLinks;
}
