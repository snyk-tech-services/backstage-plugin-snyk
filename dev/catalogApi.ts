import { catalogApiMock } from '@backstage/plugin-catalog-react/testUtils';

export const catalogApi = catalogApiMock({
  entities: [
    {
      apiVersion: "backstage.io/v1alpha1",
      kind: "Component",
      metadata: {
        name: "goof",
        description: "Goof",
        annotations: {
          "snyk.io/org-id": "361fd3c0-41d4-4ea4-ba77-09bb17890967",
          "snyk.io/project-ids":
            "a484781c-1a88-4d3a-b388-c1374f1148b1",
        },
      },
      spec: {
        type: "service",
        lifecycle: "production",
        owner: "guest",
      },
    },
  ],
});
