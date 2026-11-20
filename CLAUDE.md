# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React Router v7 (framework mode, SSR) front-end that visualizes a runner's training data (heart-rate/power zones, distance, performance metrics, training effect, training load, feel) as Highcharts charts. UI text is in **French**. There is no database access here: all data comes from a separate backend API whose base URL is `BACKEND_URL` (set in `.env`, read server-side via `process.env`). Deployed on Vercel (`vercelPreset()` in [react-router.config.ts](react-router.config.ts)); a Dockerfile also exists.

The backend is a FastAPI app: Swagger at https://jean-cours-backend.vercel.app/docs (spec at `/openapi.json`), source in the sibling repo `../jean-cours-backend`, whose own CLAUDE.md describes the API contract.

## Commands

`node_modules` is installed for Linux, so on this Windows machine run npm scripts through WSL, e.g. `wsl -e bash -lc "cd /mnt/j/Projets/Javascript/jean-cours && npm run typecheck"`. From PowerShell, nested quotes break: put multi-step commands in a script file and run `wsl -e bash <script>`.

- `npm run dev` — dev server with HMR at http://localhost:5173
- `npm run build` / `npm run start` — production build and serve `build/server/index.js`
- `npm run typecheck` — runs `react-router typegen` then `tsc` (route types in `./+types/*` are generated into `.react-router/`; rerun typegen after adding/changing routes)
- `npm run lint` — `eslint app --fix` (modifies files; `npx eslint app` only checks). typescript-eslint + react + prettier plugin
- `npm run format` — prettier (120 char width, LF line endings, trailing commas es5)

There is no test suite.

Known noise when checking:
- 13 pre-existing tsc errors (Mantine color types in `utils/charts.tsx`, `customHeader.tsx`, `WeekTypeCard.tsx`) and pre-existing `react/no-unescaped-entities` lint errors (French apostrophes).
- `core.autocrlf=true` makes the working copy CRLF, so prettier (`endOfLine: lf`) reports `Delete ␍` on every line. The repo stores LF; commits are fine.
- WSL 1: a dev server running in WSL keeps old file contents open. If WSL sees a stale file after an edit from Windows, restart the dev server.

## Architecture

- **Routes** are declared explicitly in [app/routes.ts](app/routes.ts) (not file-based). `/weekCharts` has only a loader that redirects to `/weekCharts/:year/:week` for the current ISO week; `/charts` shows the season aggregated by week.
- **Data flow**: route `loader`s call fetch helpers in [app/utils/mongo.tsx](app/utils/mongo.tsx) (despite the name, plain `fetch` calls to `BACKEND_URL`). They all go through `fetchApi`, which throws on non-2xx with the backend's `detail`; weekly helpers take an optional `DateRange` (`from`/`to`). Loaders return **un-awaited promises**, consumed with `<Suspense>` + `<Await errorElement>` for streaming. Optional data (training load, which is a 409 when no heart-rate threshold is stored) is `.catch`-ed in the loader so only its chart stays empty.
- **API contract**: weekly arrays are aligned with `/index` (ISO Mondays). Empty weeks are `0` for sums and `null` for averages (`MetricValue = number | null` in [app/interfaces/index.ts](app/interfaces/index.ts)). Weeks are **ISO weeks**: use [app/utils/isoWeek.ts](app/utils/isoWeek.ts) (`toIsoWeek`, `isoWeekMonday`, `isoWeekRange`, `shiftIsoWeek`, `weekChartsPath`), never Jan-1-based week math. Dates are parsed and formatted in UTC.
- **Season**: `SEASON_START` in [app/utils/charts.tsx](app/utils/charts.tsx) is sent as `from` to the season page's weekly routes. The backend has no season concept.
- **Chart definitions are config-driven**: `defaultChartList()` in [app/utils/charts.tsx](app/utils/charts.tsx) is the single source of truth for every chart — id, French title/description, `type`, icon, and `series` (backend `metric` name, `aggregation`, label formatter from [app/utils/formatters.tsx](app/utils/formatters.tsx)). `aggregation` picks the route:
  - `"sum"` / `"avg"`: `/metricsSumByWeek` / `/metricsAvgByWeek` on the season page, `/metricsByActivity` (one point per run) on the week page.
  - `"trainingLoad"` (`tss`, `ctl`, `atl`, `tsb`): `/trainingLoad` (weekly) on the season page, `/trainingLoadByDay` (daily) on the week page.

  Loaders call `defaultChartList()` *without* theme args and filter series by aggregation to build their requests; components call it again *with* `useMantineTheme()`/`useColorScheme()` for themed rendering. It also feeds the nav bar (`defaultNavbarContent`). To add a metric/chart, edit this list.
- **Rendering**: [app/components/chart/charts.tsx](app/components/chart/charts.tsx) maps the chart list to `LineChart` (`"line"`: one series visible at a time, the legend toggles) or `TimeInZoneChart` (`"column"`: exactly 5 zone series). It takes a shared `index` (x-axis) plus optional `indexes` keyed by chart id for charts on another axis (daily training load on the week page). Highcharts is wrapped in `ClientOnly` from `remix-utils` ([chart.tsx](app/components/chart/chart.tsx)) because it can't render during SSR. The `redirect` prop enables clicking a week point to open that week's page.
- **UI/theme**: Mantine v8 is the main component library; [app/app-theme.tsx](app/app-theme.tsx) defines custom palettes (`primaryColor`, `chart1Color`…`chart5Color`) via `@mantine/colors-generator` and wraps everything in an `AppShell` with the header. Charts pick shade 6 in light mode and 8 in dark mode. Tailwind v4 is also configured but used sparingly.
- Path alias `~/*` → `app/*`.
