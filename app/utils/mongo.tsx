import type {
  ActivityMetricsType,
  DataSeriesType,
  DateRange,
  DistanceType,
  HrTimeInZoneType,
  PowerTimeInZoneType,
  TrainingLoadDaysType,
  TrainingLoadWeeksType,
  WeekType,
} from "../interfaces";

// Calls the backend API (BACKEND_URL). Throws on any non-2xx answer, with the backend's `detail` as message.
async function fetchApi<T>(path: string, params: URLSearchParams = new URLSearchParams()): Promise<T> {
  const query = params.toString();
  const res = await fetch(`${process.env.BACKEND_URL}${path}${query ? `?${query}` : ""}`);
  if (!res.ok) {
    let detail: unknown = res.statusText;
    try {
      detail = (await res.json()).detail ?? detail;
    } catch {
      // Body is not JSON: keep the status text.
    }
    throw new Error(`${res.status} ${path}: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
  }
  return res.json();
}

function rangeParams(range: DateRange = {}, metricList: string[] = []): URLSearchParams {
  const params = new URLSearchParams();
  if (range.from) params.append("from", range.from);
  if (range.to) params.append("to", range.to);
  metricList.forEach((metric) => params.append("metrics", metric));
  return params;
}

export function getHrTimeInZone(range?: DateRange): Promise<HrTimeInZoneType> {
  return fetchApi("/hrTimeInZone", rangeParams(range));
}

export function getPowerTimeInZone(range?: DateRange): Promise<PowerTimeInZoneType> {
  return fetchApi("/powerTimeInZone", rangeParams(range));
}

export function getWeekTypes(): Promise<WeekType[]> {
  return fetchApi("/weekTypes");
}

export function getIndex(range?: DateRange): Promise<string[]> {
  return fetchApi("/index", rangeParams(range));
}

export function getDistance(range?: DateRange): Promise<DistanceType> {
  return fetchApi("/distance", rangeParams(range));
}

export function getMetricSumByWeek(metricList: string[], range?: DateRange): Promise<DataSeriesType> {
  return fetchApi("/metricsSumByWeek", rangeParams(range, metricList));
}

export function getMetricAvgByWeek(metricList: string[], range?: DateRange): Promise<DataSeriesType> {
  return fetchApi("/metricsAvgByWeek", rangeParams(range, metricList));
}

// Both throw a 409 error when no heart-rate threshold is stored in the backend.
export function getTrainingLoad(range?: DateRange): Promise<TrainingLoadWeeksType> {
  return fetchApi("/trainingLoad", rangeParams(range));
}

export function getTrainingLoadByDay(range?: DateRange): Promise<TrainingLoadDaysType> {
  return fetchApi("/trainingLoadByDay", rangeParams(range));
}

export function getMetricByActivity(year: number, week: number, metricList: string[]): Promise<ActivityMetricsType> {
  const params = rangeParams({}, metricList);
  params.append("year", year.toString());
  params.append("week", week.toString());
  return fetchApi("/metricsByActivity", params);
}
