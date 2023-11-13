# How to work on this plugin

## Note: This guide assumes you use yarn v1.

1. Clone this plugin repository

2. Create a backstage app (outside the plugin repository). If you already have one, skip this step.

```bash
npx @backstage/create-app
```

3. Link the react libraries from backstage to the plugin with the following commands

```bash
# Go to the root of the Backstage app/repository
yarn link --cwd node_modules/react
yarn link --cwd node_modules/react-dom
yarn link --cwd node_modules/react-router-dom
yarn link --cwd node_modules/react-router
yarn link --cwd node_modules/@material-ui/core

# Go to the root of the plugin repository
sh yarn-links.sh
```

4. Add the plugin to the Backstage app

```bash
# Go to the root of the Backstage repository
yarn add --cwd packages/app backstage-plugin-snyk
```

5. Build your plugin (and watch for changes)

```bash
# Go to the root of the plugin repository
yarn build --watch
```

6. Add the needed components in the Backstage app as the [README.md](../README.md) explains

7. Add Snyk configuration to the Backstage app

```yaml
proxy:
  endpoints:
    /snyk:
      target: https://api.snyk.io/
      headers:
        User-Agent: tech-services/backstage-plugin/1.0
        Authorization: token ${SNYK_TOKEN}
snyk:
  # Set to "false" to use the real API
  mocked: true
```

8. Make sure to add annotations to an entity so the plugin shows in the entity page

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: example-website
  annotations:
    snyk.io/org-id: 57059599-0459-4443-9cac-3116b5fb5549
    snyk.io/project-ids: 33afab43-260a-498e-4432-f556843d2ebe
```

9. You can now start the Backstage app and work in both repositories to see the changes in real time!

```bash
# Root of the Backstage repository
yarn dev
```
