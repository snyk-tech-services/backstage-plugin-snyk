// dictionary of mocked issues (id project => generic object)

const orgId = "023b8e67-44a0-2c22-8f12-928afd5555a6";

const projectOne = "a484781c-1a88-4d3a-b388-c1374f1148b1";

export const mockedIssues: Record<string, any> = {
  "a484781c-1a88-4d3a-b388-c1374f1148b1": {
    jsonapi: {
      version: "1.0",
    },
    links: {
      self: `/rest/orgs/${orgId}/issues?version=2023-06-19~experimental&scan_item.id=${projectOne}&scan_item.type=project&limit=100`,
      first: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=${projectOne}&scan_item.type=project&version=2023-06-19~experimental`,
      next: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=${projectOne}&scan_item.type=project&starting_after=eyJzIjoiIn0%3D&version=2023-06-19~experimental`,
    },
    data: [
      {
        id: `iss03:${projectOne}:SNYK-JS-AXIOS-6032459`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-352",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-10-25T22:11:28.677Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-AXIOS-6032459",
          priority: {
            factors: [],
            score: 168,
          },
          problems: [
            {
              id: "SNYK-JS-AXIOS-6032459",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-45857",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Cross-site Request Forgery (CSRF)",
          type: "package_vulnerability",
          updated_at: "2023-10-30T23:18:25.506Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-BACKSTAGEPLUGINSCAFFOLDERBACKEND-5730767`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-94",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-06-22T21:17:32.46Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-BACKSTAGEPLUGINSCAFFOLDERBACKEND-5730767",
          problems: [
            {
              id: "SNYK-JS-BACKSTAGEPLUGINSCAFFOLDERBACKEND-5730767",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-35926",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Arbitrary Code Injection",
          type: "package_vulnerability",
          updated_at: "2023-09-07T13:49:10.065Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-FASTXMLPARSER-5668858`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-06-07T18:42:32.827Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-FASTXMLPARSER-5668858",
          problems: [
            {
              id: "SNYK-JS-FASTXMLPARSER-5668858",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-34104",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-09-07T13:49:10.065Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-NUNJUCKS-5431309`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-79",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-NUNJUCKS-5431309",
          problems: [
            {
              id: "SNYK-JS-NUNJUCKS-5431309",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-2142",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Cross-site Scripting (XSS)",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-PROTOBUFJS-5756498`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1321",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-07-06T22:49:36.837Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-PROTOBUFJS-5756498",
          priority: {
            factors: [],
            score: 221,
          },
          problems: [
            {
              id: "SNYK-JS-PROTOBUFJS-5756498",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-36665",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "ignored",
          title: "Prototype Pollution",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-REQUEST-3361831`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-918",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-REQUEST-3361831",
          priority: {
            factors: [],
            score: 118,
          },
          problems: [
            {
              id: "SNYK-JS-REQUEST-3361831",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-28155",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Server-side Request Forgery (SSRF)",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-SEMVER-3247795`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-06-20T21:03:30.93Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-SEMVER-3247795",
          priority: {
            factors: [],
            score: 169,
          },
          problems: [
            {
              id: "SNYK-JS-SEMVER-3247795",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2022-25883",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "ignored",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-TOUGHCOOKIE-5672873`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1321",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-07-01T04:27:02.234Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-TOUGHCOOKIE-5672873",
          priority: {
            factors: [],
            score: 118,
          },
          problems: [
            {
              id: "SNYK-JS-TOUGHCOOKIE-5672873",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-26136",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Prototype Pollution",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5415299`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-265",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-VM2-5415299",
          problems: [
            {
              id: "SNYK-JS-VM2-5415299",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-29017",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Sandbox Escape",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5422057`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-913",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-VM2-5422057",
          problems: [
            {
              id: "SNYK-JS-VM2-5422057",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-29199",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Sandbox Escape",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5426093`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-755",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-VM2-5426093",
          problems: [
            {
              id: "SNYK-JS-VM2-5426093",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-30547",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Improper Handling of Exceptional Conditions",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5537079`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-74",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-VM2-5537079",
          problems: [
            {
              id: "SNYK-JS-VM2-5537079",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-32313",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title:
            "Improper Neutralization of Special Elements in Output Used by a Downstream Component ('Injection')",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5537100`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-265",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-VM2-5537100",
          problems: [
            {
              id: "SNYK-JS-VM2-5537100",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-32314",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Sandbox Bypass",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5772823`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-94",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-07-13T00:49:11.883Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-VM2-5772823",
          problems: [
            {
              id: "SNYK-JS-VM2-5772823",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-37903",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Remote Code Execution (RCE)",
          type: "package_vulnerability",
          updated_at: "2023-09-07T13:49:10.065Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-VM2-5772825`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-94",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-07-13T00:49:11.883Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-VM2-5772825",
          problems: [
            {
              id: "SNYK-JS-VM2-5772825",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-37466",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Remote Code Execution (RCE)",
          type: "package_vulnerability",
          updated_at: "2023-09-07T13:49:10.065Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-WORDWRAP-3149973`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "low",
          ignored: false,
          key: "SNYK-JS-WORDWRAP-3149973",
          priority: {
            factors: [],
            score: 61,
          },
          problems: [
            {
              id: "SNYK-JS-WORDWRAP-3149973",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-26115",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-XML2JS-5414874`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1321",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-XML2JS-5414874",
          priority: {
            factors: [],
            score: 67,
          },
          problems: [
            {
              id: "SNYK-JS-XML2JS-5414874",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-0842",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Prototype Pollution",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-YAML-5458867`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-248",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:29.611Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-YAML-5458867",
          problems: [
            {
              id: "SNYK-JS-YAML-5458867",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-2251",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Uncaught Exception",
          type: "package_vulnerability",
          updated_at: "2023-06-06T19:27:11.592Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
      {
        id: `iss03:${projectOne}:SNYK-JS-ZOD-5925617`,
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-09-29T20:35:27.472Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-ZOD-5925617",
          priority: {
            factors: [],
            score: 169,
          },
          problems: [
            {
              id: "SNYK-JS-ZOD-5925617",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-4316",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-11T20:10:03.662Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: projectOne,
              type: "project",
            },
          },
        },
      },
    ],
  },
  "29ee792c-6d39-45a3-a3db-c38fa52d44c3": {
    jsonapi: {
      version: "1.0",
    },
    links: {
      self: `/rest/orgs/${orgId}/issues?version=2023-06-19~experimental&scan_item.id=29ee792c-6d39-45a3-a3db-c38fa52d44c3&scan_item.type=project&limit=100`,
      first: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=29ee792c-6d39-45a3-a3db-c38fa52d44c3&scan_item.type=project&version=2023-06-19~experimental`,
      next: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=29ee792c-6d39-45a3-a3db-c38fa52d44c3&scan_item.type=project&starting_after=eyJzIjoiIn0%3D&version=2023-06-19~experimental`,
    },
    data: [
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-ADOBECSSTOOLS-5871286",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-08-30T20:19:06.663Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-ADOBECSSTOOLS-5871286",
          problems: [
            {
              id: "SNYK-JS-ADOBECSSTOOLS-5871286",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-26364",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-25T22:40:57.895Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-ANSIREGEX-1583908",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-400",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-08-30T20:19:06.663Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-ANSIREGEX-1583908",
          problems: [
            {
              id: "SNYK-JS-ANSIREGEX-1583908",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2021-3807",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-09-07T20:05:03.382Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-AXIOS-6032459",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-352",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-10-25T22:40:57.894Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-AXIOS-6032459",
          priority: {
            factors: [],
            score: 168,
          },
          problems: [
            {
              id: "SNYK-JS-AXIOS-6032459",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-45857",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Cross-site Request Forgery (CSRF)",
          type: "package_vulnerability",
          updated_at: "2023-10-27T23:47:55.318Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-BABELTRAVERSE-5962462",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-184",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-10-14T06:24:40.451Z",
          effective_severity_level: "critical",
          ignored: false,
          key: "SNYK-JS-BABELTRAVERSE-5962462",
          priority: {
            factors: [],
            score: 160,
          },
          problems: [
            {
              id: "SNYK-JS-BABELTRAVERSE-5962462",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-45133",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Incomplete List of Disallowed Inputs",
          type: "package_vulnerability",
          updated_at: "2023-10-31T06:26:25.329Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-BROWSERIFYSIGN-6037026",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-347",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-10-27T23:47:55.35Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-BROWSERIFYSIGN-6037026",
          priority: {
            factors: [],
            score: 124,
          },
          problems: [
            {
              id: "SNYK-JS-BROWSERIFYSIGN-6037026",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-46234",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Improper Verification of Cryptographic Signature",
          type: "package_vulnerability",
          updated_at: "2023-11-06T06:29:37.54Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-GRAPHQL-5905181",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-400",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-09-19T23:05:53.224Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-GRAPHQL-5905181",
          priority: {
            factors: [],
            score: 67,
          },
          problems: [
            {
              id: "SNYK-JS-GRAPHQL-5905181",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-26144",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Denial of Service (DoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-12T05:00:23.343Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-POSTCSS-5926692",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-20",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-10-02T01:03:07.556Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-POSTCSS-5926692",
          priority: {
            factors: [],
            score: 49,
          },
          problems: [
            {
              id: "SNYK-JS-POSTCSS-5926692",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-44270",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Improper Input Validation",
          type: "package_vulnerability",
          updated_at: "2023-10-12T05:00:23.343Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-SEMVER-3247795",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-06-20T22:07:52.959Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-SEMVER-3247795",
          priority: {
            factors: [],
            score: 169,
          },
          problems: [
            {
              id: "SNYK-JS-SEMVER-3247795",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2022-25883",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-12T05:00:23.343Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-TOUGHCOOKIE-5672873",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1321",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-06-30T19:30:43.508Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "SNYK-JS-TOUGHCOOKIE-5672873",
          priority: {
            factors: [],
            score: 118,
          },
          problems: [
            {
              id: "SNYK-JS-TOUGHCOOKIE-5672873",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-26136",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Prototype Pollution",
          type: "package_vulnerability",
          updated_at: "2023-10-12T05:00:23.343Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-WORDWRAP-3149973",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:33.295Z",
          effective_severity_level: "low",
          ignored: false,
          key: "SNYK-JS-WORDWRAP-3149973",
          priority: {
            factors: [],
            score: 61,
          },
          problems: [
            {
              id: "SNYK-JS-WORDWRAP-3149973",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-26115",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-12T05:00:23.343Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-YAML-5458867",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-248",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-05-23T08:27:33.295Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-YAML-5458867",
          problems: [
            {
              id: "SNYK-JS-YAML-5458867",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-2251",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "resolved",
          title: "Uncaught Exception",
          type: "package_vulnerability",
          updated_at: "2023-06-06T20:45:01.471Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:SNYK-JS-ZOD-5925617",
        type: "issue",
        attributes: {
          classes: [
            {
              id: "CWE-1333",
              source: "CWE",
              type: "weakness",
            },
          ],
          created_at: "2023-09-29T12:47:20.255Z",
          effective_severity_level: "high",
          ignored: false,
          key: "SNYK-JS-ZOD-5925617",
          priority: {
            factors: [],
            score: 169,
          },
          problems: [
            {
              id: "SNYK-JS-ZOD-5925617",
              source: "snyk",
              type: "vulnerability",
            },
            {
              id: "CVE-2023-4316",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "Regular Expression Denial of Service (ReDoS)",
          type: "package_vulnerability",
          updated_at: "2023-10-12T05:00:23.344Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:snyk:lic:npm:axe-core:MPL-2.0",
        type: "issue",
        attributes: {
          created_at: "2023-05-23T08:27:33.295Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "snyk:lic:npm:axe-core:MPL-2.0",
          priority: {
            factors: [],
            score: 300,
          },
          problems: [
            {
              id: "snyk:lic:npm:axe-core:MPL-2.0",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "MPL-2.0 license",
          type: "license",
          updated_at: "2023-07-16T02:54:16.949Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:snyk:lic:npm:eslint-plugin-deprecation:LGPL-3.0",
        type: "issue",
        attributes: {
          created_at: "2023-05-23T08:27:33.295Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "snyk:lic:npm:eslint-plugin-deprecation:LGPL-3.0",
          priority: {
            factors: [],
            score: 300,
          },
          problems: [
            {
              id: "snyk:lic:npm:eslint-plugin-deprecation:LGPL-3.0",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "LGPL-3.0 license",
          type: "license",
          updated_at: "2023-07-16T02:54:16.949Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
      {
        id: "iss03:29ee792c-6d39-45a3-a3db-c38fa52d44c3:snyk:lic:npm:rollup-plugin-dts:LGPL-3.0",
        type: "issue",
        attributes: {
          created_at: "2023-05-23T08:27:33.295Z",
          effective_severity_level: "medium",
          ignored: false,
          key: "snyk:lic:npm:rollup-plugin-dts:LGPL-3.0",
          priority: {
            factors: [],
            score: 300,
          },
          problems: [
            {
              id: "snyk:lic:npm:rollup-plugin-dts:LGPL-3.0",
              source: "snyk",
              type: "vulnerability",
            },
          ],
          status: "open",
          title: "LGPL-3.0 license",
          type: "license",
          updated_at: "2023-07-16T22:03:44.262Z",
        },
        relationships: {
          organization: {
            data: {
              id: `${orgId}`,
              type: "organization",
            },
          },
          scan_item: {
            data: {
              id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
              type: "project",
            },
          },
        },
      },
    ],
  },
  "895278ab-0b64-42c0-a69d-96ef4705f164": {
    jsonapi: {
      version: "1.0",
    },
    links: {
      self: `/rest/orgs/${orgId}/issues?version=2023-06-19~experimental&scan_item.id=895278ab-0b64-42c0-a69d-96ef4705f164&scan_item.type=project&limit=100`,
      first: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=895278ab-0b64-42c0-a69d-96ef4705f164&scan_item.type=project&version=2023-06-19~experimental`,
      next: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=895278ab-0b64-42c0-a69d-96ef4705f164&scan_item.type=project&starting_after=eyJzIjoiIn0%3D&version=2023-06-19~experimental`,
    },
    data: [],
  },
  "0bc4da77-ee44-4ce9-b33e-39edaa2ae1e9": {
    jsonapi: {
      version: "1.0",
    },
    links: {
      self: `/rest/orgs/${orgId}/issues?version=2023-06-19~experimental&scan_item.id=0bc4da77-ee44-4ce9-b33e-39edaa2ae1e9&scan_item.type=project&limit=100`,
      first: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=0bc4da77-ee44-4ce9-b33e-39edaa2ae1e9&scan_item.type=project&version=2023-06-19~experimental`,
      next: `/rest/orgs/${orgId}/issues?limit=100&scan_item.id=0bc4da77-ee44-4ce9-b33e-39edaa2ae1e9&scan_item.type=project&starting_after=eyJzIjoiIn0%3D&version=2023-06-19~experimental`,
    },
    data: [],
  },
};
