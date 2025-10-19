import React from "react";
import { useLoaderData } from "react-router";
import { Stack, Title, useMantineTheme } from "@mantine/core";

import Charts from "~/components/chart/charts";
import type { ChartType, DataSeriesType } from "~/interfaces";
import { defaultChartList } from "~/utils/charts";
import { getMetricByActivity } from "~/utils/mongo";

export async function loader({ params }: { params: { year: string; week: string } }) {
  const chartList: ChartType[] = defaultChartList();
  const metricList = chartList.map((entry) => entry.series?.map((entry) => entry.metric)).flat() as string[];
  const metricValues = await getMetricByActivity(params.year, params.week, metricList);
  return { metricValues };
}

export default function WeekCharts() {
  const { metricValues } = useLoaderData() as {
    metricValues: DataSeriesType;
  };

  const index = metricValues.startTimeLocal;
  const chartList = defaultChartList(useMantineTheme());

  return (
    <Stack gap="xl">
      <Title order={4}>Données semaine</Title>
      <Charts redirect={false} chartList={chartList} index={index} metricValues={metricValues} />
    </Stack>
  );
}
