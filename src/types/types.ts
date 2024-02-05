export type IssuesCount = {
  critical: number;
  high: number;
  medium: number;
  low: number;
};
export type DepCount = {
  directCount: number;
  indirectCount: number;
  totalCount: number;
};
export interface IssuesArray {
  issues: Array<Issue>;
}

export interface Issue {
  /**
   * The identifier of the issue
   */
  id: string;
  /**
   * type of the issue ('vuln' or 'license')
   */
  issueType: string;
  /**
   * The package name
   */
  pkgName: string;
  /**
   * List of affected package versions
   */
  pkgVersions: {
    [key: string]: any;
  };
  /**
   * The details of the issue
   */
  issueData: {
    /**
     * The identifier of the issue
     */
    id: string;
    /**
     * The issue title
     */
    title: string;
    /**
     * The severity status of the issue
     */
    severity: string;
    /**
     * URL to a page containing information about the issue
     */
    url: string;
    /**
     * The issue description
     */
    description: string;
    /**
     * External identifiers assigned to the issue
     */
    identifiers: {
      /**
       * Common Vulnerability Enumeration identifiers
       */
      CVE?: {
        [key: string]: any;
      }[];
      /**
       * Common Weakness Enumeration identifiers
       */
      CWE?: {
        [key: string]: any;
      }[];
      /**
       * Identifiers assigned by the Open Source Vulnerability Database (OSVDB)
       */
      OSVDB?: {
        [key: string]: any;
      }[];
    };
    /**
     * The list of people responsible for first uncovering or reporting the issue
     */
    credit: {
      [key: string]: any;
    }[];
    /**
     * The exploit maturity of the issue
     */
    exploitMaturity: string;
    /**
     * The ranges that are vulnerable and unaffected by the issue
     */
    semver: {
      /**
       * The ranges that are vulnerable to the issue
       */
      vulnerable?: string;
      /**
       * The ranges that are unaffected by the issue
       */
      unaffected?: string;
    };
    /**
     * The date that the vulnerability was first published by Snyk
     */
    publicationTime: string;
    /**
     * The date that the vulnerability was first disclosed
     */
    disclosureTime: string;
    /**
     * The CVSS v3 string that signifies how the CVSS score was calculated
     */
    CVSSv3: string;
    /**
     * The CVSS score that results from running the CVSSv3 string
     */
    cvssScore: string;
    /**
     * The language of the issue
     */
    language: string;
    /**
     * A list of patches available for the given issue
     */
    patches: {
      [key: string]: any;
    }[];
  };
  /**
   * Whether the issue has been patched
   */
  isPatched: boolean;
  /**
   * Whether the issue has been ignored
   */
  isIgnored: boolean;
  /**
   * The list of reasons why the issue was ignored
   */
  ignoreReasons?: {
    [key: string]: any;
  }[];
  /**
   * Information about fix/upgrade/pinnable options for the issue
   */
  fixInfo?: {
    /**
     * Whether all issue's path are upgradable
     */
    isUpgradable?: boolean;
    /**
     * Whether the issue can be fixed by pinning a transitive
     */
    isPinnable?: boolean;
    /**
     * Whether all issue's path are patchable
     */
    isPatchable?: boolean;
    /**
     * Whether any of the issue's paths can be fixed
     */
    isPartiallyFixable?: boolean;
  };
  /**
   * Information about the priority of the issue
   */
  priority?: {
    /**
     * The priority score of the issue
     */
    score?: number;
    /**
     * The list of factors that contributed to the priority of the issue
     */
    factors?: {
      [key: string]: any;
    }[];
  };
}

export interface ProjectGetResponseType {
  name?: string;
  /**
   * The project identifier
   */
  id?: string;
  /**
   * The date that the project was created on
   */
  created?: string;
  /**
   * The origin the project was added from
   */
  origin?: string;
  /**
   * The package manager of the project
   */
  type?: string;
  /**
   * Whether the project is read-only
   */
  readOnly?: boolean;
  /**
   * The frequency of automated Snyk re-test. Can be 'daily', 'weekly or 'never'
   */
  testFrequency?: string;
  /**
   * Number of dependencies of the project
   */
  totalDependencies?: number;
  /**
   * Number of known vulnerabilities in the project, not including ignored issues
   */
  issueCountsBySeverity?: {
    /**
     * Number of low severity vulnerabilities
     */
    low?: number;
    /**
     * Number of medium severity vulnerabilities
     */
    medium?: number;
    /**
     * Number of high severity vulnerabilities
     */
    high?: number;
    /**
     * Number of critical severity vulnerabilities
     */
    critical?: number;
  };
  /**
   * For docker projects shows the ID of the image
   */
  imageId?: string;
  /**
   * For docker projects shows the tag of the image
   */
  imageTag?: string;
  /**
   * The hostname for a CLI project, null if not set
   */
  hostname?: string | null;
  /**
   * The project remote repository url
   */
  remoteRepoUrl?: string;
  /**
   * The date on which the most recent test was conducted for this project
   */
  lastTestedDate?: string;
  /**
   * The user who owns the project, null if not set
   *
   * {
   *     "id": "e713cf94-bb02-4ea0-89d9-613cce0caed2",
   *     "name": "example-user@snyk.io",
   *     "username": "exampleUser",
   *     "email": "example-user@snyk.io"
   * }
   */
  owner?: object | null;
  /**
   * URL with project overview
   */
  browseUrl?: string;
  /**
   * The user who imported the project
   */
  importingUser?: {
    /**
     * The ID of the user.
     */
    id?: string;
    /**
     * The name of the user.
     */
    name?: string;
    /**
     * The username of the user.
     */
    username?: string;
    /**
     * The email of the user.
     */
    email?: string;
  };
  /**
   * Describes if a project is currently monitored or it is de-activated
   */
  isMonitored?: boolean;
  /**
   * The monitored branch (if available)
   */
  branch?: string | null;
  /**
   * List of applied tags
   */
  tags?: {
    [key: string]: any;
  }[];
  /**
   * Applied project attributes
   */
  attributes?: {
    criticality?: {
      [key: string]: any;
    }[];
    environment?: {
      [key: string]: any;
    }[];
    lifecycle?: {
      [key: string]: any;
    }[];
  };
  /**
   * Remediation data (if available)
   */
  remediation?: {
    /**
     * Recommended upgrades to apply to the project
     *
     * (object)
     *     + upgradeTo (string, required) - `package@version` to upgrade to
     *     + upgrades (array, required) -  List of `package@version` that will be upgraded as part of this upgrade
     *     + vulns (array, required) - List of vulnerability ids that will be fixed as part of this upgrade
     */
    upgrade?: {
      [key: string]: any;
    };
    /**
     * Recommended patches to apply to the project
     *
     * (object)
     *    paths (array) - List of paths to the vulnerable dependency that can be patched
     */
    patch?: {
      [key: string]: any;
    };
    /**
     * Recommended pins to apply to the project (Python only)
     *
     * (object)
     *     + upgradeTo (string, required) - `package@version` to upgrade to
     *     + vulns (array, required) - List of vulnerability ids that will be fixed as part of this upgrade
     *     + isTransitive (boolean) - Describes if the dependency to be pinned is a transitive dependency
     */
    pin?: {
      [key: string]: any;
    };
  };
}

export interface ProjectsListV3ResponseType {}
export interface DepgraphGetResponseType {
  /**
   * The dependency-graph object
   */
  depGraph: {
    /**
     * The scheme version of the depGraph object
     */
    schemaVersion: string;
    /**
     * The package manager of the project
     */
    pkgManager: {
      /**
       * The name of the package manager
       */
      name: string;
      /**
       * The version of the package manager
       */
      version?: string;
      repositories?: string[];
    };
    /**
     * A list of dependencies in the project
     */
    pkgs: {
      /**
       * The internal id of the package
       */
      id: string;
      info: {
        /**
         * The name of the package
         */
        name: string;
        /**
         * The version of the package
         */
        version?: string;
      };
    }[];
    /**
     * A directional graph of the packages in the project
     */
    graph: {
      /**
       * The internal id of the root node
       */
      rootNodeId: string;
      /**
       * A list of the first-level packages
       */
      nodes?: {
        /**
         * The internal id of the node
         */
        nodeId: string;
        /**
         * The id of the package
         */
        pkgId: string;
        /**
         * A list of the direct dependencies of the package
         */
        deps: {
          /**
           * The id of the node
           */
          nodeId: string;
        }[];
      }[];
    };
  };
}
