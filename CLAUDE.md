# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React Router v7 (framework mode, SSR) front-end that visualizes a runner's training data (heart-rate/power zones, distance, performance metrics, training effect, feel) as Highcharts charts. UI text is in **French**. There is no database access here: all data comes from a separate backend API whose base URL is `BACKEND_URL` (set in `.env`, read server-side via `process.env`). Deployed on Vercel (`vercelPreset()` in [react-router.config.ts](react-router.config.ts)); a Dockerfile also exists.

## Commands

- `npm run dev` — dev server with HMR at http://localhost:5173
- `npm run build` / `npm run start` — production build and serve `build/server/index.js`
- `npm run typecheck` — runs `react-router typegen` then `tsc` (route types in `./+types/*` are generated into `.react-router/`; rerun typegen after adding/changing routes)
- `npm run lint` — `eslint app --fix` (typescript-eslint + react + prettier plugin)
- `npm run format` — prettier (120 char width, LF line endings, trailing commas es5)

There is no test suite.

## Architecture

- **Routes** are declared explicitly in [app/routes.ts](app/routes.ts) (not file-based). `/weekCharts` has only a loader that redirects to `/weekCharts/:year/:week` for the current week; `/charts` shows the whole season aggregated by week.
- **Data flow**: route `loader`s call fetch helpers in [app/utils/mongo.tsx](app/utils/mongo.tsx) (despite the name, these are plain `fetch` calls to `BACKEND_URL` endpoints like `/metricsSumByWeek`, `/metricsAvgByWeek`, `/metricsByActivity`, `/index`, `/weekTypes`). Loaders return **un-awaited promises**, which components consume with `<Suspense>` + `<Await>` for streaming.
- **Chart definitions are config-driven**: [app/utils/charts.tsx](app/utils/charts.tsx) `defaultChartList()` is the single source of truth for every chart — id, French title/description, `type` (`"line"` or `"column"`), icon, and `series` (each with backend `metric` name, `aggregation` `"sum"|"avg"`, and a label formatter from [app/utils/formatters.tsx](app/utils/formatters.tsx)). Loaders call it *without* theme args to derive which metrics to request (split by aggregation); components call it again *with* `useMantineTheme()`/`useColorScheme()` for themed rendering. It also feeds the nav bar (`defaultNavbarContent`). To add a metric/chart, edit this list.
- **Rendering**: [app/components/chart/charts.tsx](app/components/chart/charts.tsx) maps the chart list to `LineChart` or `TimeInZoneChart` (column charts assume exactly 5 zone series). Highcharts is wrapped in `ClientOnly` from `remix-utils` ([chart.tsx](app/components/chart/chart.tsx)) because it can't render during SSR. The `redirect` prop enables clicking a week point to navigate to that week's detail page.
- **UI/theme**: Mantine v8 is the main component library; [app/app-theme.tsx](app/app-theme.tsx) defines custom palettes (`primaryColor`, `chart1Color`…`chart5Color`) via `@mantine/colors-generator` and wraps everything in an `AppShell` with the header. Charts pick shade 6 in light mode and 8 in dark mode. Tailwind v4 is also configured but used sparingly.
- Path alias `~/*` → `app/*`.
