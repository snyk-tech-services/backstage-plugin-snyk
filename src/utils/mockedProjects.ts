import {
  ProjectAttributesStatusEnum,
  ProjectsData,
  RecurringTestsSettingsFrequencyEnum,
} from "../types/projectsTypes";

export const mockedProjects: ProjectsData[] = [
  {
    type: "project",
    id: "a484781c-1a88-4d3a-b388-c1374f1148b1",
    meta: {},
    attributes: {
      name: "nnillni/backstage:packages/backend/package.json",
      type: "yarn",
      targetFile: "packages/backend/package.json",
      target_reference: "qa",
      origin: "github-enterprise",
      created: new Date("2023-05-23T08:27:18.021Z"),
      status: ProjectAttributesStatusEnum.Active,
      businessCriticality: [],
      environment: [],
      lifecycle: [],
      tags: [],
      settings: {
        recurring_tests: {
          frequency: RecurringTestsSettingsFrequencyEnum.Daily,
        },
        pullRequests: {
          failOnlyForIssuesWithFix: false,
        },
      },
      buildArgs: {
        rootWorkspace: ".",
      },
    },
    relationships: {
      organization: {
        data: {
          type: "org",
          id: "023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
        links: {
          related: "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
      },
      target: {
        data: {
          type: "target",
          id: "2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/targets/2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
      },
      importer: {
        data: {
          type: "user",
          id: "838a7b14-5e11-414c-b382-02acc21aa088",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/users/838a7b14-5e11-414c-b382-02acc21aa088",
        },
      },
    },
  },
  {
    type: "project",
    id: "29ee792c-6d39-45a3-a3db-c38fa52d44c3",
    meta: {},
    attributes: {
      name: "nnillni/backstage:packages/app/package.json",
      type: "yarn",
      targetFile: "packages/app/package.json",
      target_reference: "qa",
      origin: "github-enterprise",
      created: new Date("2023-05-23T08:27:18.021Z"),
      status: ProjectAttributesStatusEnum.Active,
      businessCriticality: [],
      environment: [],
      lifecycle: [],
      tags: [],
      settings: {
        recurring_tests: {
          frequency: RecurringTestsSettingsFrequencyEnum.Daily,
        },
        pullRequests: {
          failOnlyForIssuesWithFix: false,
        },
      },
      buildArgs: {
        rootWorkspace: ".",
      },
    },
    relationships: {
      organization: {
        data: {
          type: "org",
          id: "023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
        links: {
          related: "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
      },
      target: {
        data: {
          type: "target",
          id: "2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/targets/2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
      },
      importer: {
        data: {
          type: "user",
          id: "838a7b14-5e11-414c-b382-02acc21aa088",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/users/838a7b14-5e11-414c-b382-02acc21aa088",
        },
      },
    },
  },
  {
    type: "project",
    id: "895278ab-0b64-42c0-a69d-96ef4705f164",
    meta: {},
    attributes: {
      name: "nnillni/backstage:package.json",
      type: "yarn",
      targetFile: "package.json",
      target_reference: "qa",
      origin: "github-enterprise",
      created: new Date("2023-05-23T08:27:17.642Z"),
      status: ProjectAttributesStatusEnum.Active,
      businessCriticality: [],
      environment: [],
      lifecycle: [],
      tags: [],
      settings: {
        recurring_tests: {
          frequency: RecurringTestsSettingsFrequencyEnum.Daily,
        },
        pullRequests: {
          failOnlyForIssuesWithFix: false,
        },
      },
      buildArgs: {
        rootWorkspace: ".",
      },
    },
    relationships: {
      organization: {
        data: {
          type: "org",
          id: "023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
        links: {
          related: "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
      },
      target: {
        data: {
          type: "target",
          id: "2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/targets/2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
      },
      importer: {
        data: {
          type: "user",
          id: "838a7b14-5e11-414c-b382-02acc21aa088",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/users/838a7b14-5e11-414c-b382-02acc21aa088",
        },
      },
    },
  },
  {
    type: "project",
    id: "0bc4da77-ee44-4ce9-b33e-39edaa2ae1e9",
    meta: {},
    attributes: {
      name: "nnillni/backstage:Dockerfile",
      type: "dockerfile",
      targetFile: "Dockerfile",
      target_reference: "qa",
      origin: "github-enterprise",
      created: new Date("2023-05-23T08:27:13.975Z"),
      status: ProjectAttributesStatusEnum.Active,
      businessCriticality: [],
      environment: [],
      lifecycle: [],
      tags: [],
      settings: {
        recurring_tests: {
          frequency: RecurringTestsSettingsFrequencyEnum.Daily,
        },
        pullRequests: {
          failOnlyForIssuesWithFix: false,
        },
      },
    },
    relationships: {
      organization: {
        data: {
          type: "org",
          id: "023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
        links: {
          related: "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6",
        },
      },
      target: {
        data: {
          type: "target",
          id: "2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/targets/2aec25ae-7e99-4cb2-946e-3c926e4dceef",
        },
      },
      importer: {
        data: {
          type: "user",
          id: "838a7b14-5e11-414c-b382-02acc21aa088",
        },
        links: {
          related:
            "/orgs/023b8e67-44a0-2c22-8f12-928afd5555a6/users/838a7b14-5e11-414c-b382-02acc21aa088",
        },
      },
    },
  },
];
