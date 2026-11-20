import React, { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import { Stack, Title, Text, useMantineTheme, Flex, Loader, ActionIcon } from "@mantine/core";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";

import Charts from "~/components/chart/charts";
import type { ActivityMetricsType, ChartType } from "~/interfaces";
import { defaultChartList } from "~/utils/charts";
import { isoWeekMonday, shiftIsoWeek } from "~/utils/isoWeek";
import { getMetricByActivity } from "~/utils/mongo";
import { useColorScheme } from "@mantine/hooks";
import { NavBar } from "~/components/layout/navBar";

export async function loader({ params }: { params: { year: string; week: string } }) {
  const chartList: ChartType[] = defaultChartList();
  const metricList = chartList.map((entry) => entry.series?.map((entry) => entry.metric)).flat() as string[];
  const year = parseInt(params.year);
  const week = parseInt(params.week);

  const metricValues = getMetricByActivity(year, week, metricList);
  return { metricValues, date: isoWeekMonday(year, week), year, week };
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
    metricValues: ActivityMetricsType;
    date: Date;
    year: number;
    week: number;
  };

  const chartList = defaultChartList(useMantineTheme(), useColorScheme());

  const navigate = useNavigate();
  const redirectToWeek = (delta: number) => {
    const target = shiftIsoWeek(year, week, delta);
    navigate(`/weekCharts/${target.year}/${target.week}`);
  };
  const redirectToPreviousWeek = () => redirectToWeek(-1);
  const redirectToNextWeek = () => redirectToWeek(1);

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
              timeZone: "UTC",
            }).format(new Date(date))}{" "}
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
