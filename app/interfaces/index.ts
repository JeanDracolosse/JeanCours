import type { DataLabelsFormatterCallbackFunction } from "highcharts";

// API types (see the backend Swagger at /docs)

// Weekly sums are 0 for weeks without runs, weekly averages are null.
export type MetricValue = number | null;

export type HrTimeInZoneType = {
  hrTimeInZone_1: number[];
  hrTimeInZone_2: number[];
  hrTimeInZone_3: number[];
  hrTimeInZone_4: number[];
  hrTimeInZone_5: number[];
};

export type PowerTimeInZoneType = {
  powerTimeInZone_1: number[];
  powerTimeInZone_2: number[];
  powerTimeInZone_3: number[];
  powerTimeInZone_4: number[];
  powerTimeInZone_5: number[];
};

export type WeekType = {
  date: string;
  label: string;
};

export type DistanceType = {
  distance: number[];
  elevationGain: number[];
  elevationLoss: number[];
  kilometerEffort: number[];
  fullKilometerEffort: number[];
};

export type DataSeriesType = Record<string, MetricValue[]>;

// One value per run; startTimeLocal is always included.
export type ActivityMetricsType = DataSeriesType & { startTimeLocal: string[] };

export type DateRange = { from?: string; to?: string };

// Chart types
export type ChartType = {
  id: string;
  title: string;
  description: JSX.Element;
  type: string;
  icon: (iconColor: string, size: number) => JSX.Element;
  series: {
    name: string;
    metric: string;
    aggregation: string;
    formatter: DataLabelsFormatterCallbackFunction;
  }[];
};

export type LineDataType = {
  serie: MetricValue[];
  name: string;
  unit?: string;
  formatter?: DataLabelsFormatterCallbackFunction;
};

export type TimeInZoneDataType = {
  timeInZone1: MetricValue[];
  timeInZone2: MetricValue[];
  timeInZone3: MetricValue[];
  timeInZone4: MetricValue[];
  timeInZone5: MetricValue[];
};
