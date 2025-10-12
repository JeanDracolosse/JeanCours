import type { DistanceType, HrInTimeZoneType } from "../interfaces";

export async function getHrTimeInZone(): Promise<HrInTimeZoneType> {
  const hrTimeInZoneApiUrl = `${process.env.BACKEND_URL}/hrTimeInZone`;
  const hrTimeInZoneRes = await fetch(hrTimeInZoneApiUrl);
  const hrTimeInZone = await hrTimeInZoneRes.json();
  return hrTimeInZone
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