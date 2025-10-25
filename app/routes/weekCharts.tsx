import React, { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import { Stack, Title, Text, useMantineTheme, Flex, Loader, ActionIcon, Container } from "@mantine/core";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";

import Charts from "~/components/chart/charts";
import type { ChartType, DataSeriesType } from "~/interfaces";
import { defaultChartList } from "~/utils/charts";
import { getMetricByActivity } from "~/utils/mongo";
import { useColorScheme } from "@mantine/hooks";
import { NavBar } from "~/components/layout/navBar";

export async function loader({ params }: { params: { year: string; week: string } }) {
  const chartList: ChartType[] = defaultChartList();
  const metricList = chartList.map((entry) => entry.series?.map((entry) => entry.metric)).flat() as string[];
  const date = new Date(parseFloat(params.year), 0, 1 + (parseFloat(params.week) - 1) * 7);

  const metricValues = getMetricByActivity(params.year, params.week, metricList);
  return { metricValues, date, year: params.year, week: params.week };
}

function ErrorElement() {
  return (
    <Stack pl="xl" align="stretch" justify="flex-start">
      <Title pt="xl" order={4}>
        Pas de données sur cette semaine
      </Title>
      <Text c="dimmed">Laissez moi le temps de courir ! </Text>
    </Stack>
  );
}

export default function WeekCharts() {
  const { metricValues, date, year, week } = useLoaderData() as {
    metricValues: DataSeriesType;
    date: Date;
    year: string;
    week: string;
  };

  const chartList = defaultChartList(useMantineTheme(), useColorScheme());

  let nextWeek = parseInt(week) + 1;
  let nextYear = parseInt(year);
  if (nextWeek > 51) {
    nextWeek = 1;
    nextYear = nextYear + 1;
  }

  let previousWeek = parseInt(week) - 1;
  let previousYear = parseInt(year);
  if (previousWeek < 1) {
    previousWeek = 0;
    previousYear = nextYear - 1;
  }

  const navigate = useNavigate();
  const redirectToPreviousWeek = () => {
    navigate(`/weekCharts/${previousYear}/${previousWeek}`);
  };
  const redirectToNextWeek = () => {
    navigate(`/weekCharts/${nextYear}/${nextWeek}`);
  };

  return (
    <div>
      <NavBar />
      <Stack gap="md">
        <Title pl="md" order={1}>
          Semaine du{" "}
          <Text span c="primaryColor" inherit>
            {new Intl.DateTimeFormat("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date)}{" "}
          </Text>
        </Title>
        <Title order={2}>
          Changer de semaine{" "}
          <ActionIcon variant="filled" aria-label="Settings" onClick={redirectToPreviousWeek}>
            <ArrowLeft style={{ width: "70%", height: "70%" }} />
          </ActionIcon>{" "}
          <ActionIcon variant="filled" aria-label="Settings" onClick={redirectToNextWeek}>
            <ArrowRight style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        </Title>
        <Text>
          Liste des entraînements de la semaine. <br /> Je suis routinier, j'aime garder un schéma fixe pour mes
          entraînements. Le lundi et le samedi pour le repos, le dimanche pour la cource longue, et un aller-retour
          travail en courant. Mais avoir une vie active fait que c'est plus facile d'improviser au jour le jour...{" "}
        </Text>
        <Suspense
          fallback={
            <Flex justify="center" align="center">
              <Loader size={50} />
            </Flex>
          }
        >
          <Await resolve={metricValues} errorElement={<ErrorElement />}>
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
    </div>
  );
}
