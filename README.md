# Kaizen Boards

A storefront prototype for handcrafted wooden cutting boards, with product collections, wood-pattern illustrations, and the story behind the craft.

[View the demo](https://kaizen-boards-web.vercel.app)

The current implementation is a landing page, not a complete online shop. Some links are placeholders, and the repository does not implement checkout or order processing.

## Local development

Use Bun 1.3.5, the package manager pinned in `package.json`, and Node.js 22.12 or newer for the Vite toolchain.

From the repository root:

```sh
bun install
bun run dev
```

Open `http://localhost:3000`.

## Project layout

- `apps/web`: the TanStack Start app. The landing page is `src/routes/index.tsx`.
- `packages/ui`: shared React components and Tailwind CSS styles.

Turborepo runs tasks across both workspaces.

## Checks

```sh
bun run typecheck
bun run lint
```

`bun run build` creates the production build. There is no automated test script configured. Check layout, navigation, and animations in a browser when changing the page.
