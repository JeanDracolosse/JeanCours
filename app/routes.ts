import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),
    route('weekCharts/:year/:week', 'routes/weekCharts.tsx'),
    route('weekCharts', 'routes/currentWeekCharts.tsx'),
    route('charts', 'routes/seasonCharts.tsx'),
    route('weekTypes', 'routes/weekTypes.tsx'),
] satisfies RouteConfig
