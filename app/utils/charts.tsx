import React from "react";
import { ArrowsDoubleNeSw, Heartbeat, ManualGearbox, MoodHappy, RulerMeasure, StepInto } from "tabler-icons-react";
import type { ChartType } from "~/interfaces";
import {
  caloriesDataLabelFormatter,
  centimeterDataLabelFormatter,
  defaultDataLabelFormatter,
  fiveDataLabelFormatter,
  kilometerDataLabelFormatter,
  meterDataLabelFormatter,
  milliSecondDataLabelFormatter,
  percentDataLabelFormatter,
  tenDataLabelFormatter,
} from "./formatters";
import { Text, List, ThemeIcon, type MantineTheme } from "@mantine/core";
import type { UseColorSchemeValue } from "@mantine/hooks";

export function defaultNavbarContent() {
  return defaultChartList().map((entry) => ({ icon: entry.icon, label: entry.title, link: "#" + entry.id }));
}

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
                <Heartbeat  size={16} />
              </ThemeIcon>
            }
          >
            Course très facile à facile
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart2Color[colorIndex]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course facile ou modérée, jusqu'au seuil aérobique
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart3Color[colorIndex]} size={24} radius="xl">
                <Heartbeat  size={16} />
              </ThemeIcon>
            }
          >
            Course du seuil aérobique au seuil lactique
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart4Color[colorIndex]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course anaérobique mais encore supportable
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart5Color[colorIndex]} size={24} radius="xl">
                <Heartbeat size={16} />
              </ThemeIcon>
            }
          >
            Course en effort maximal
          </List.Item>
        </List>
      ),
      type: "column",
      icon: (iconColor: string, size: number) => <Heartbeat size={size} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "Zone 1",
          metric: "hrTimeInZone_1",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 2",
          metric: "hrTimeInZone_2",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 3",
          metric: "hrTimeInZone_3",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 4",
          metric: "hrTimeInZone_4",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 5",
          metric: "hrTimeInZone_5",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
      ],
    },
    {
      id: "powerTimeInZone",
      title: "Zones de puissance",
      type: "column",
      icon: (iconColor: string, size: number) => <ManualGearbox size={size} strokeWidth={1.5} color={iconColor} />,
      description: (
        <List>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart1Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox  size={16} />
              </ThemeIcon>
            }
          >
            Effort de course facile
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart2Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox size={16} />
              </ThemeIcon>
            }
          >
            Effort de course modéré
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart3Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox  size={16} />
              </ThemeIcon>
            }
          >
            Effort de course tempo
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart4Color[colorIndex]} size={24} radius="xl">
                <ManualGearbox size={16} />
              </ThemeIcon>
            }
          >
            Effort de course d'intervalle long
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color={theme?.colors.chart5Color[colorIndex]} size={24} radius="xl">
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
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 2",
          metric: "powerTimeInZone_2",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 3",
          metric: "hrTimeInZone_3",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 4",
          metric: "powerTimeInZone_4",
          aggregation: "sum",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Zone 5",
          metric: "powerTimeInZone_5",
          aggregation: "sum",
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
      icon: (iconColor: string, size: number) => <ArrowsDoubleNeSw size={size} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "Distance",
          metric: "distance",
          aggregation: "sum",
          formatter: kilometerDataLabelFormatter,
        },
        {
          name: "Dénivelé +",
          metric: "elevationGain",
          aggregation: "sum",
          formatter: meterDataLabelFormatter,
        },
        {
          name: "Dénivelé -",
          metric: "elevationLoss",
          aggregation: "sum",
          formatter: meterDataLabelFormatter,
        },
      ],
    },
    {
      id: "metrics",
      title: "Statistiques de performance",
      type: "line",
      description: <Text>Je ne sais pas si ces données seront utiles, mais elles sont là! </Text>,
      icon: (iconColor: string, size: number) => <RulerMeasure size={size} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "V02 Max",
          metric: "vO2MaxValue",
          aggregation: "avg",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Calories",
          metric: "calories",
          aggregation: "avg",
          formatter: caloriesDataLabelFormatter,
        },
        {
          name: "Cadence",
          metric: "averageRunningCadenceInStepsPerMinute",
          aggregation: "avg",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Temps de contact au sol",
          metric: "avgGroundContactTime",
          aggregation: "avg",
          formatter: milliSecondDataLabelFormatter,
        },
        {
          name: "Longueur de foulée",
          metric: "avgStrideLength",
          aggregation: "avg",
          formatter: centimeterDataLabelFormatter,
        },
        {
          name: "Oscillation verticale",
          metric: "avgVerticalOscillation",
          aggregation: "avg",
          formatter: centimeterDataLabelFormatter,
        },
        {
          name: "Rapport vertical",
          metric: "avgVerticalRatio",
          aggregation: "avg",
          formatter: percentDataLabelFormatter,
        },
      ],
    },
    {
      id: "training",
      title: "Effet de la séance",
      type: "line",
      description: <Text>Charge et effet de l'entraînement. </Text>,
      icon: (iconColor: string, size: number) => <StepInto size={size} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "Charge d'entraînement",
          metric: "activityTrainingLoad",
          aggregation: "avg",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Effet sur l'aérobie",
          metric: "aerobicTrainingEffect",
          aggregation: "avg",
          formatter: defaultDataLabelFormatter,
        },
        {
          name: "Effet sur l'anaérobie",
          metric: "anaerobicTrainingEffect",
          aggregation: "avg",
          formatter: defaultDataLabelFormatter,
        },
      ],
    },
    {
      id: "feel",
      title: "Ressenti",
      type: "line",
      description: <Text>Mon état de forme (de 0 à 4) et la difficultée de chaque sortie (de 1 à 10). </Text>,
      icon: (iconColor: string, size: number) => <MoodHappy size={size} strokeWidth={1.5} color={iconColor} />,
      series: [
        {
          name: "Etat de forme",
          metric: "workoutFeel",
          aggregation: "avg",
          formatter: fiveDataLabelFormatter,
        },
        {
          name: "Difficultée ressentie",
          metric: "workoutRpe",
          aggregation: "avg",
          formatter: tenDataLabelFormatter,
        },
      ],
    },
  ];
}
