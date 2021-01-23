/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { Routes, Route } from 'react-router';
import { MissingAnnotationEmptyState } from '@backstage/core';
import { SnykEntityComponent } from './SnykEntityComponent/SnykEntityComponent';

const SNYK_ORG_ANNOTATION = 'snyk.io/org-name';
const SNYK_PROJECT_ANNOTATION = 'snyk.io/project-ids';

export const Router = ({ entity }: { entity: Entity }) => {
  const org = entity.metadata.annotations?.[SNYK_ORG_ANNOTATION]
  const projectId = entity.metadata.annotations?.[SNYK_PROJECT_ANNOTATION];

  if (!org) {
    return <MissingAnnotationEmptyState annotation={SNYK_ORG_ANNOTATION} />;
  }
  if (!projectId) {
    return <MissingAnnotationEmptyState annotation={SNYK_PROJECT_ANNOTATION} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SnykEntityComponent entity={entity} />
        }
      />
      )
    </Routes>
  );
};
