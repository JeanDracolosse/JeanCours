import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

import { Blockquote, Flex, Loader, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { InfoCircle } from "tabler-icons-react";
import Charts from "~/components/chart/charts";
import type { DataSeriesType } from "~/interfaces";
import { defaultChartList } from "~/utils/charts";
import { getIndex, getMetricAvgByWeek, getMetricSumByWeek } from "~/utils/mongo";
import { useColorScheme } from "@mantine/hooks";
import { NavBar } from "~/components/layout/navBar";

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
    <div>
      <NavBar />
      <Stack gap="md">
        <Title pl="md" order={1}>
          Saison en cours
        </Title>
        <Title order={2}>
          La saison a commencé le{" "}
          <Text span c="primaryColor" inherit>
            13 octobre 2025
          </Text>
        </Title>
        <Text>
          Première phase d'entraînement jusqu'à 2026. <br /> Pour l'instant, l'idée c'est de voir si j'arrive à me
          réhabituer à courir dans les montagnes. Puis en janvier, je me fixe un objectif pour l'été.
        </Text>
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
    </div>
  );
}
