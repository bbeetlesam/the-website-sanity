import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { media } from 'sanity-plugin-media';

import { defaultDocumentNode } from './studio/structure';

if (
  !process.env.SANITY_STUDIO_PROJECT_ID ||
  !process.env.SANITY_STUDIO_DATASET
) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET environment variables!'
  );
}

export default defineConfig({
  name: 'default',
  title: 'sam-website',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [structureTool({ defaultDocumentNode }), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
