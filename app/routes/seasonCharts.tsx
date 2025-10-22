import React from "react";
import { useLoaderData } from "react-router";

import { Blockquote, Stack, Text, Title, useMantineTheme } from "@mantine/core";
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
  const metricSumValues = await getMetricSumByWeek(metricSumList);

  const metricAvgList = defaultChartList()
    .map((entry) => entry.series?.filter((serie) => serie.aggregation === "avg").map((entry) => entry.metric))
    .flat() as string[];
  const metricAvgValues = await getMetricAvgByWeek(metricAvgList);

  const metricValues: DataSeriesType = { ...metricAvgValues, ...metricSumValues };

  const index = await getIndex();

  return { index, metricValues };
}

export default function SeasonCharts() {
  const { index, metricValues } = useLoaderData() as {
    index: string[];
    metricValues: DataSeriesType;
  };

  const chartList = defaultChartList(useMantineTheme(), useColorScheme());
  return (
    <Stack gap="xl">
      <Title order={1}>Données saison en cours</Title>
      <Text>La saison a commencé le 13 octobre 2025.</Text>
      <Blockquote mb="xl" icon={<InfoCircle />} mt="xl">
        <Text>Cliquez sur les données d'une semaine pour accéder au détail</Text>
      </Blockquote>
      <Charts redirect={true} chartList={chartList} index={index} metricValues={metricValues} />
    </Stack>
  );
}
