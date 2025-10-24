import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

import { Blockquote, Flex, Loader, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { InfoCircle } from "tabler-icons-react";
import Charts from "~/components/chart/charts";
import type { DataSeriesType } from "~/interfaces";
import { defaultChartList } from "~/utils/charts";
import { getIndex, getMetricAvgByWeek, getMetricSumByWeek } from "~/utils/mongo";
import { useColorScheme } from "@mantine/hooks";

export async function loader() {
  const metricSumList = defaultChartList()
    .map((entry) => entry.series?.filter((serie) => serie.aggregation === "sum").map((entry) => entry.metric))
    .flat() as string[];
  const metricAvgList = defaultChartList()
    .map((entry) => entry.series?.filter((serie) => serie.aggregation === "avg").map((entry) => entry.metric))
    .flat() as string[];

  const metricSumValues = getMetricSumByWeek(metricSumList);
  const metricAvgValues = getMetricAvgByWeek(metricAvgList);
  const index = getIndex();

  return { index, metricAvgValues, metricSumValues };
}

export default function SeasonCharts() {
  const { index, metricAvgValues, metricSumValues } = useLoaderData() as {
    index: string[];
    metricAvgValues: DataSeriesType;
    metricSumValues: DataSeriesType;
  };

  const chartList = defaultChartList(useMantineTheme(), useColorScheme());
  return (
    <Stack gap="xl">
      <Title order={1}>Données saison en cours</Title>
      <Text>La saison a commencé le 13 octobre 2025.</Text>
      <Blockquote mb="xl" icon={<InfoCircle />} mt="xl">
        <Text>Cliquez sur les données d'une semaine pour accéder au détail</Text>
      </Blockquote>
      <Suspense
        fallback={
          <Flex justify="center" align="center">
            <Loader size={50} />
          </Flex>
        }
      >
        <Await resolve={Promise.all([index, metricAvgValues, metricSumValues])}>
          {([index, metricAvgValues, metricSumValues]) => (
            <Charts
              redirect={true}
              chartList={chartList}
              index={index}
              metricValues={{ ...metricAvgValues, ...metricSumValues }}
            />
          )}
        </Await>
      </Suspense>
    </Stack>
  );
}
