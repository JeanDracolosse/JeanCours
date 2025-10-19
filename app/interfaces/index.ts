import type { DataLabelsFormatterCallbackFunction } from "highcharts";

// API types
export type HrTimeInZoneType = {
  hrTimeInZone_1: string[];
  hrTimeInZone_2: string[];
  hrTimeInZone_3: string[];
  hrTimeInZone_4: string[];
  hrTimeInZone_5: string[];
};

export type PowerTimeInZoneType = {
  powerTimeInZone_1: string[];
  powerTimeInZone_2: string[];
  powerTimeInZone_3: string[];
  powerTimeInZone_4: string[];
  powerTimeInZone_5: string[];
};

export type DistanceType = {
  distance: string[];
  elevationGain: string[];
  kilometerEffort: string[];
  fullKilometerEffort: string[];
};

export type DataSeriesType = {
  [key: string]: string[];
};

// Chart types
export type ChartType = {
  id: string;
  title: string;
  description?: JSX.Element;
  type: string;
  icon: (iconColor: string) => JSX.Element;
  series: {
    name: string;
    metric: string;
    formatter: DataLabelsFormatterCallbackFunction;
  }[];
};

export type LineDataType = {
  serie: string[];
  name: string;
  unit?: string;
  formatter?: DataLabelsFormatterCallbackFunction;
};

export type TimeInZoneDataType = {
  timeInZone1: string[];
  timeInZone2: string[];
  timeInZone3: string[];
  timeInZone4: string[];
  timeInZone5: string[];
};
