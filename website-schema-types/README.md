# @bbeetlesam/website-sanity-schema

Reusable Sanity schema definitions for the bbeetlesam website. This package contains the schema source only; the Sanity Studio remains in the parent repository and imports these files directly for local development.

## Installation

Install the package in a Sanity project:

```sh
pnpm add @bbeetlesam/website-sanity-schema
```

The package declares `sanity` as a peer dependency. Install a compatible Sanity version in the consuming project as well.

## Usage

Import the schema types from the package in a Sanity configuration:

```ts
import { defineConfig } from 'sanity';
import { schemaTypes } from '@bbeetlesam/website-sanity-schema';

export default defineConfig({
  // projectId, dataset, and plugins...
  schema: { types: schemaTypes },
});
```

The package exports `schemaTypes` from its root entry point. It includes the website's blog, desk, file, navigation, and shared object schemas.

This package ships TypeScript source rather than compiled JavaScript. Use it in a TypeScript-aware environment such as a Sanity CLI configuration or a bundler that transpiles TypeScript dependencies; it is not a plain Node.js JavaScript entry point.

## Development

The source of this package lives in the `website-schema-types/` directory of [the-website-sanity](https://github.com/bbeetlesam/the-website-sanity/tree/main/website-schema-types). In that repository, the Studio imports `./website-schema-types/schemaTypes` directly so local schema edits are available immediately without updating an installed package version.

When a schema change is ready for frontend consumers, publish a new package version and update the consumer to that version. Keep the package version aligned with the schema revision you intend consumers to use.

## License

MIT. See [LICENSE](./LICENSE).
