import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("test", "routes/weekTypesCards.tsx"), route("charts", "routes/charts.tsx"), route("weekTypes", "routes/weekTypes.tsx")] satisfies RouteConfig;
