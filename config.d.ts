export interface Config {
    /** Optional configurations for the ArgoCD plugin */
    snyk?: {
      /**
       * The base url of the ArgoCD instance.
       * @visibility frontend
       */
      AppHost?: string;
    };
  }