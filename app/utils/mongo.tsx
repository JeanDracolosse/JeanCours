import type { DistanceType, HrTimeInZoneType, PowerTimeInZoneType } from "../interfaces";

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