# The Website, Pt. II Sanity Studio

The content management studio for [my website](https://github.com/bbeetlesam/the-website).

Built with [Sanity](https://www.sanity.io/) and used to manage the
content consumed by the site's SvelteKit frontend.

This is the source that powers my little whimsy site.

## What's inside

- Content schemas
- Sanity Studio configuration
- Custom Studio components and plugins
- Content editing tools
- Dataset configuration
- Probably something insignificant.

## Structure

The important breadcrumbs:

```text
.
├── schemaTypes/       # Content schemas
├── sanity.config.ts   # Studio configuration
├── sanity.cli.ts      # Sanity CLI configuration
└── .env.example       # Environment variables list
```

## Development

If you ever need to install or develop this studio locally:

Install dependencies:

```bash
pnpm install
```

Start the studio locally:

```bash
pnpm dev
```

## Tech

- [Sanity](https://www.sanity.io/), obviously.
- [React](https://react.dev/). Sanity needs to react, however.
- [TypeScript](https://www.typescriptlang.org/). The language itself speaks.
- My brain.

The website is where things are presented, and this is where I tell those things what to be.

Sincerely, Sam.
