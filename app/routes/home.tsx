import type { Route } from "./+types/home";

import {
  Chart,
  PlotOptions,
  Title,
  YAxis
} from '@highcharts/react';

import {
  Column,
  Line
} from '@highcharts/react/series';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Chart>
      <Title>hrTimeInZone</Title>
      <YAxis title={{ text: 'hrTimeInZone' }}></YAxis>
      <YAxis title={{ text: 'distance' }}></YAxis>
      <PlotOptions
        series={{ stacking: 'normal' }} />
      <Column.Series
        yAxis={0}
        name="hrTimeInZone_5"
        data={[
          0,
          0,
          0,
          0,
          0
        ]} />
      <Column.Series
        yAxis={0}
        name="hrTimeInZone_4"
        data={[
          142,
          1086.9180000000001,
          3,
          392.162,
          0
        ]} />

      <Column.Series
        yAxis={0}
        name="hrTimeInZone_3"
        data={[
          4416.401,
          6065.868,
          7744.129,
          12210.532000000001,
          2653.272
        ]} />
      <Column.Series
        yAxis={0}
        name="hrTimeInZone_2"
        data={[
          12691.806,
          19741.636000000002,
          13122.56,
          7176.906,
          4396.134
        ]} />
      <Column.Series
        yAxis={0}
        name="hrTimeInZone_1"
        data={[
          1075.87,
          11212.374,
          3776.6330000000003,
          2350.69,
          358.37
        ]} />
      <Line.Series
        yAxis={1}
        name="distance"
        data={[
          60448.080078125,
          82725.9892578125,
          70273.5810546875,
          73711.029296875,
          22069.3203125]} />
    </Chart>
  );
}
