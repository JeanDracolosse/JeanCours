import React from "react";
import { ArrowsDoubleNeSw, Heartbeat, ManualGearbox } from "tabler-icons-react";
import type { ChartType } from "~/interfaces";
import { defaultDataLabelFormatter, kilometerDataLabelFormatter, meterDataLabelFormatter } from "./formatters";
import { Text, List, ThemeIcon, type MantineTheme } from "@mantine/core";
import type { UseColorSchemeValue } from "@mantine/hooks";

export function defaultChartList(theme?: MantineTheme, colorScheme?: UseColorSchemeValue): ChartType[] {
  const colorIndex = colorScheme === "dark" ? 9 : 6;

  return [
    {
      id: "hrTimeInZone",
      title: "Zones de fréquence cardiaque",
      description: (
        <List>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart1Color[colorIndex]} size={24} radius="xl">
                <Heartbeat color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Course très facile à facile
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart2Color[colorIndex]} size={24} radius="xl">
                <Heartbeat color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Course facile ou modérée, jusqu'au seuil aérobique
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart3Color[colorIndex]} size={24} radius="xl">
                <Heartbeat color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Course du seuil aérobique au seuil lactique
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart4Color[colorIndex]} size={24} radius="xl">
                <Heartbeat color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Course anaérobique et mais encore supportable
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart5Color[colorIndex]} size={24} radius="xl">
                <Heartbeat color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Course en effort maximal
          </List.Item>
        </List>
      ),
      type: "column",
      icon: (iconColor: string) => <Heartbeat size={36} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "Zone 1",
          metric: "hrTimeInZone_1",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 2",
          metric: "hrTimeInZone_2",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 3",
          metric: "hrTimeInZone_3",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 4",
          metric: "hrTimeInZone_4",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 5",
          metric: "hrTimeInZone_5",
          formatter: defaultDataLabelFormatter,
        },
      ],
    },
    {
      id: "powerTimeInZone",
      title: "Zones de puissance",
      type: "column",
      icon: (iconColor: string) => <ManualGearbox size={36} strokeWidth={1.5} color={iconColor} />,
      description: (
        <List>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart1Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Effort de course facile
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart2Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Effort de course modéré
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart3Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Effort de course tempo
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart4Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Effort de course d'intervalle long
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart5Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox color="var(--mantine-color-text)" size={16} />
              </ThemeIcon>
            }
          >
            Effort de course d'intervalle court
          </List.Item>
        </List>
      ),
      series: [
        {
          name: "Zone 1",
          metric: "powerTimeInZone_1",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 2",
          metric: "powerTimeInZone_2",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 3",
          metric: "hrTimeInZone_3",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 4",
          metric: "powerTimeInZone_4",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 5",
          metric: "powerTimeInZone_5",
          formatter: defaultDataLabelFormatter,
        },
      ],
    },
    {
      id: "distance",
      title: "Distance",
      type: "line",
      description: (
        <Text>
          L'objectif est de faire jusqu'à 80km par semaine, autant de dénivelé que possible, mais aussi de se reposer au
          moins toutes les 4 semaines. La variation de distance ou de dénivelé doit aussi se trouver entre 10% et
          15%.{" "}
        </Text>
      ),
      icon: (iconColor: string) => <ArrowsDoubleNeSw size={36} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "Distance",
          metric: "distance",
          formatter: kilometerDataLabelFormatter,
        },
        {
          name: "Dénivelé +",
          metric: "elevationGain",
          formatter: meterDataLabelFormatter,
        },
        {
          name: "Dénivelé -",
          metric: "elevationLoss",
          formatter: meterDataLabelFormatter,
        },
      ],
    },
  ];
}
