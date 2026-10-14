# My Prayer Site

A reading catalog for prayers, psalms and mantras, built with Next.js, JavaScript and MongoDB.

## Current scope

- Catalog and collection pages.
- Dedicated reading pages for individual entries.
- MongoDB-backed content models through Mongoose.
- Reusable reading and catalog components.
- A subscription API route.
- Local scripts for importing and maintaining content.

The application uses the **Next.js Pages Router**. A shared toolbar implements a simple client-side title/content filter; semantic search is not implemented.

## Stack

| Area | Implementation |
| --- | --- |
| Application | Next.js and React |
| Language | JavaScript |
| Styling | CSS and Tailwind CSS |
| Data | MongoDB and Mongoose |
| Routing | `pages/` |

The public application interface and content are primarily in Portuguese.

## Local development

Prerequisites: Node.js compatible with the locked Next.js version, npm and a development MongoDB database.

```bash
git clone https://github.com/cesaints/my-prayer-site.git
cd my-prayer-site
npm ci
npm run dev
```

Set `MONGODB_URI` in your local environment before using database-backed pages. Keep connection values outside version control.

Open [localhost:3000](http://localhost:3000).

## Repository map

- [pages](pages): catalog, collection and reading routes.
- [components](components): shared interface components.
- [models](models): Mongoose content and subscription models.
- [lib/dbConnect.js](lib/dbConnect.js): database connection helper.
- [scripts](scripts): content maintenance utilities.
- [pages/api/subscribe.js](pages/api/subscribe.js): subscription endpoint.

Import and maintenance scripts can write to a database. Review each script and its target before running it; no import is needed to inspect the frontend source.

## Available commands

| Command | Defined purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Build the application |
| `npm run start` | Serve an existing build |

The repository also defines a legacy lint command using `next lint`; compatibility with the locked Next.js version needs review before relying on it as a quality gate.

Commands and features were checked against source for this README. They were not executed during the documentation review. No automated test suite, CI workflow, deployment outcome or traffic measurement is asserted.

## Content and rights

Texts, imagery and other contributed material retain their original authorship. Verify attribution and permission before redistributing content.

No license file was present in the reviewed revision.
