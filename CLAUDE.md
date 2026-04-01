# CLAUDE.md — sitwhm-solar

## HARD GUARDRAILS

- **NEVER push to the GitHub remote (`origin` / `git@github.com:sitwhm/sitwhm-web.git`).** GitHub Pages serves the public production site. Only push there when explicitly told by the user.
- For development/staging work, push to the GitLab remote (`gitlab` / `https://gitlab.com/maxstr_syntax/sitwhm-solar`).
- Always confirm with the user before any `git push` to `origin`.

## Project

- **Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **Styling**: Tailwind utility classes, brand colors defined in `globals.css` (`@theme`) and `tailwind.config.ts`
- **Brand colors**: syntax-blue (#0632A0), syntax-cyan (#1EB4E6), syntax-green (#3CC85A), syntax-gray (#F5F5F5), syntax-dark (#262626)
- **Icons**: Remix Icon (@remixicon/react)
- **Animation**: Motion (Framer Motion alternative)
- **Feature flags**: `app/featureFlags.ts` controls page mode (full/teaser/mystery)
