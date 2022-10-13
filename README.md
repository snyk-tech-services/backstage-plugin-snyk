# Snyk Backstage Plugin
[![Inactively Maintained](https://img.shields.io/badge/Maintenance%20Level-Inactively%20Maintained-yellowgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)


**This repository is in maintenance mode, no new features are being developed. Bug & security fixes will continue to be delivered. Open source contributions are welcome for small features & fixes (no breaking changes)**

The Snyk plugin displays security details from [snyk.io](https://snyk.io/).

![Snyk Tab](https://storage.googleapis.com/snyk-technical-services.appspot.com/backstage-screenshots/backstage-snyk-plugin-tab.png)

## Getting started

> **Requirements: Snyk API enabled (Paid plans only)**

1. Install plugin
```bash
# packages/app
yarn add backstage-plugin-snyk
```

2. Add plugin to the app
```typescript
// packages/app/src/App.tsx
import { EntitySnykContent } from 'backstage-plugin-snyk';

....

<FlatRoutes>
...
<Route path="/snyk" element={<EntitySnykContent />}/>
...
</FlatRoutes>

```

3. Add Snyk card and tab to the entity page
The plugin is composed of 2 main parts
- Snyk tile on the entity overview page
- Security tab in the entity displaying further details

a. Import the elements
```typescript
// packages/app/src/components/catalog/EntityPage.tsx
import { SnykOverview, EntitySnykContent, isSnykAvailable } from 'backstage-plugin-snyk';
```

b. Add the overview card\
\
![Overview card](https://storage.googleapis.com/snyk-technical-services.appspot.com/backstage-screenshots/backstage-plugin-overview-card.png)

```typescript
// packages/app/src/components/catalog/EntityPage.tsx
const entityWarningContent = (
  <>
    ...
    <EntitySwitch>
      <EntitySwitch.Case if={isSnykAvailable}>
        <Grid item md={6}>
          <SnykOverview />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
    ...
  </>
);
```

c. Add the tab (feel free to rename title to Security, snyk, vulns, whatever you think is best)
```typescript
const ServiceEntityPage = (
  <EntityLayoutWrapper>
   ...
    <EntityLayout.Route path="/snyk" title="Security">
      <EntitySnykContent />
    </EntityLayout.Route>
   ...
  </EntityLayoutWrapper>
);
```

4. Add snyk proxy config to app-config.yaml file at the root directory. If using Snyk self hosted, adjust target to https://YOURHOSTNAME/api. User Agent helps us see how much API traffic comes from backstage setups so we can invest more in the plugin !
```yaml
proxy:
  ...

  '/snyk':
    target: https://snyk.io/api/v1
    headers:
      User-Agent: tech-services/backstage-plugin/1.0
      Authorization: token ${SNYK_TOKEN}
  ...
```

5. Get your Snyk token (a service account with Viewer permission at your group level is preferred) and provide SNYK_TOKEN env var with the value "token <YOURTOKEN>"
```bash
export SNYK_TOKEN="token 123-123-123-123"
```

6. Add the following annotations to your entities.
- `snyk.io/org-name` is the Snyk organization name where your project is. Use the slug (like in url, or in the org settings page), not the display name
- `snyk.io/project-ids` are the project ID (see slug in url or ID in project settings)
If multiple projects (like multiple package.json or pom files, add them with increasing number), add them comma separated
....


Example:
```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: Java-goof
  description: Java Goof
  ....
  annotations:
    snyk.io/org-name: snyk-demo-org
    snyk.io/project-ids: 12345678-1234-1234-1234-123456789012,12345678-1234-1234-1234-123456789013,12345678-1234-1234-1234-123456789014
  ...
spec:
  type: service
  lifecycle: production
  owner: guest
  ....
```


## Troubleshooting

- Missing or wrong token set in the backend proxy.\

    ![Missing/wrong token](https://storage.googleapis.com/snyk-technical-services.appspot.com/backstage-screenshots/backstage_card_error_wrong_or_missing_token.png)


- 404s from Snyk API? Add [pathRewrite your app-config.yaml proxy](https://github.com/snyk-tech-services/backstage-plugin-snyk/issues/11) to the following
```yaml
'/snyk':
    target: https://snyk.io/api/v1
    headers:
      User-Agent: tech-services/backstage-plugin/1.0
      Authorization:
        $env: SNYK_TOKEN
    pathRewrite:
      '^/proxy/snyk/': '/'
```

## Limitations

Infrastructure as Code and Snyk Code projects are not supported currently.
