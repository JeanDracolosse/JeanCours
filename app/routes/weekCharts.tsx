import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import { Stack, Title, Text, useMantineTheme, Flex, Loader } from "@mantine/core";

import Charts from "~/components/chart/charts";
import type { ChartType, DataSeriesType } from "~/interfaces";
import { defaultChartList } from "~/utils/charts";
import { getMetricByActivity } from "~/utils/mongo";
import { useColorScheme } from "@mantine/hooks";

export async function loader({ params }: { params: { year: string; week: string } }) {
  const chartList: ChartType[] = defaultChartList();
  const metricList = chartList.map((entry) => entry.series?.map((entry) => entry.metric)).flat() as string[];
  const date = new Date(parseFloat(params.year), 0, 1 + (parseFloat(params.week) - 1) * 7);

  const metricValues = getMetricByActivity(params.year, params.week, metricList);
  return { metricValues, date };
}

export default function WeekCharts() {
  const { metricValues, date } = useLoaderData() as {
    metricValues: DataSeriesType;
    date: Date;
  };

  const chartList = defaultChartList(useMantineTheme(), useColorScheme());

  return (
    <Stack gap="xl">
      <Title order={1}>Données semaine</Title>
      <Text>
        Semaine du{" "}
        {new Intl.DateTimeFormat("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date)}
        .
      </Text>
      <Suspense
        fallback={
          <Flex justify="center" align="center">
            <Loader size={50} />
          </Flex>
        }
      >
        <Await resolve={metricValues}>
          {(metricValues) => (
            <Charts
              redirect={false}
              chartList={chartList}
              index={metricValues.startTimeLocal}
              metricValues={metricValues}
            />
          )}
        </Await>
      </Suspense>
    </Stack>
  );
}
