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

// hrTSS, fitness (CTL), fatigue (ATL) and form (TSB). Weekly arrays are aligned with /index.
export type TrainingLoadWeeksType = { tss: MetricValue[]; ctl: MetricValue[]; atl: MetricValue[]; tsb: MetricValue[] };

export type TrainingLoadDaysType = { date: string[]; tss: number[]; ctl: number[]; atl: number[]; tsb: number[] };

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
    // sum / avg: /metricsSumByWeek or /metricsAvgByWeek (or /metricsByActivity on the week page).
    // trainingLoad: a key of /trainingLoad (season) or /trainingLoadByDay (week).
    aggregation: "sum" | "avg" | "trainingLoad";
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
