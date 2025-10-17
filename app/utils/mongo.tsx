import type { DistanceType, HrTimeInZoneType, PowerTimeInZoneType, DataSeriesType } from "../interfaces";

export async function getHrTimeInZone(): Promise<HrTimeInZoneType> {
  const hrTimeInZoneApiUrl = `${process.env.BACKEND_URL}/hrTimeInZone`;
  const hrTimeInZoneRes = await fetch(hrTimeInZoneApiUrl);
  const hrTimeInZone = await hrTimeInZoneRes.json();
  return hrTimeInZone
}

export async function getPowerTimeInZone(): Promise<PowerTimeInZoneType> {
  const powerTimeInZoneApiUrl = `${process.env.BACKEND_URL}/powerTimeInZone`;
  const powerTimeInZoneRes = await fetch(powerTimeInZoneApiUrl);
  const powerTimeInZone = await powerTimeInZoneRes.json();
  return powerTimeInZone
}

export async function getIndex(): Promise<string[]> {
  const indexApiUrl = `${process.env.BACKEND_URL}/index`;
  const indexRes = await fetch(indexApiUrl);
  const index = await indexRes.json();
  return index
}

export async function getDistance(): Promise<DistanceType> {
  const distanceApiUrl = `${process.env.BACKEND_URL}/distance`;
  const distanceRes = await fetch(distanceApiUrl);
  const distance = await distanceRes.json();
  return distance
}

export async function getMetricByWeek(metricList: string[]): Promise<DataSeriesType> {
  const params = new URLSearchParams();
  metricList.forEach(metric => params.append("metrics", metric))
  const metricsByWeekUrl = `${process.env.BACKEND_URL}/metricsByWeek?${params}`;
  const metricsByWeekRes = await fetch(metricsByWeekUrl);
  const metricsByWeek = await metricsByWeekRes.json();
  return metricsByWeek
}

export async function getMetricByActivity(year: string, week: string, metricList: string[]): Promise<DataSeriesType> {
  const params = new URLSearchParams();
  params.append("year", year)
  params.append("week", week)
  metricList.forEach(metric => params.append("metrics", metric))
  const metricsByActivityUrl = `${process.env.BACKEND_URL}/metricsByActivity?${params}`;
  const metricsByActivityRes = await fetch(metricsByActivityUrl);
  const metricsByActivity = await metricsByActivityRes.json();
  return metricsByActivity
}