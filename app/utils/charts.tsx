import React from "react";
import { ArrowsDoubleNeSw, Heartbeat, ManualGearbox } from "tabler-icons-react";
import type { ChartType } from "~/interfaces";
import { defaultDataLabelFormatter, kilometerDataLabelFormatter, meterDataLabelFormatter } from "./formatters";
import { List, ThemeIcon, type MantineTheme } from "@mantine/core";

export function defaultChartList(theme?: MantineTheme): ChartType[] {
  return [
    {
      id: "hrTimeInZone",
      title: "Zones de fréquence cardiaque",
      description: (
        <List>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart1Color[6]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course très facile à facile
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart2Color[6]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course facile ou modérée, jusqu'au seuil aérobique
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart3Color[6]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course du seuil aérobique au seuil lactique
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart4Color[6]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course anaérobique et mais encore supportable
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart5Color[6]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course en effort maximal
          </List.Item>
        </List>
      ),
      type: "column",
      icon: (iconColor: string) => <ArrowsDoubleNeSw size={36} strokeWidth={1.5} color={iconColor} />,
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
      icon: (iconColor: string) => <ArrowsDoubleNeSw size={36} strokeWidth={1.5} color={iconColor} />,
      description: (
        <List>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart1Color[6]} size={24} radius="xl">
                <ManualGearbox size={16} />
              </ThemeIcon>
            }
          >
            Effort de course facile
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart2Color[6]} size={24} radius="xl">
                <ManualGearbox size={16} />
              </ThemeIcon>
            }
          >
            Effort de course modéré
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart3Color[6]} size={24} radius="xl">
                <ManualGearbox size={16} />
              </ThemeIcon>
            }
          >
            Effort de course tempo
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart4Color[6]} size={24} radius="xl">
                <ManualGearbox size={16} />
              </ThemeIcon>
            }
          >
            Effort de course d'intervalle long
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart5Color[6]} size={24} radius="xl">
                <ManualGearbox size={16} />
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
