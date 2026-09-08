import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

import { defaultDocumentNode } from './studio/structure';

export default defineConfig({
  name: 'default',
  title: 'sam-website',

  projectId: '55meutke',
  dataset: 'production',

  plugins: [structureTool({ defaultDocumentNode }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
