import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { DataLabelsFormatterCallbackFunction, Point, SeriesClickEventObject } from "highcharts";
import type { NavigateFunction } from "react-router";
import { useNavigate } from "react-router";
import { dateFormatter } from "~/utils/formatters";
import type { MetricValue, WeekType } from "~/interfaces";
import { weekChartsPath } from "~/utils/isoWeek";
import ChartDraw from "./chart";

// One column per week of `index`, colored by the planned week type (matched on the Monday's date).
export default function WeekTypeChart({
  index,
  values,
  formatter,
  weekTypes,
}: {
  index: string[];
  values: MetricValue[];
  formatter: DataLabelsFormatterCallbackFunction;
  weekTypes: WeekType[];
}) {
  const navigate: NavigateFunction = useNavigate();
  const theme = useMantineTheme();
  const colorScheme = "var(--mantine-color-text)";
  const colorIndex = useColorScheme() === "dark" ? 8 : 6;

  const typeColors: Record<string, string> = {
    Base: theme.colors.chart2Color[colorIndex],
    Récupération: theme.colors.chart1Color[colorIndex],
    Intensive: theme.colors.chart3Color[colorIndex],
    Spécifique: theme.colors.chart4Color[colorIndex],
  };
  const labelByDate = new Map(weekTypes.map((entry) => [entry.date, entry.label]));
  const labels = index.map((date) => labelByDate.get(date.slice(0, 10)) ?? "");

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "var(--mantine-color-body)",
      borderColor: "light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
      borderWidth: 1,
      borderRadius: 8,
      style: {
        fontFamily: theme.fontFamily,
      },
    },
    title: {
      text: "",
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      categories: index,
      labels: {
        style: {
          color: colorScheme,
        },
        formatter: dateFormatter,
      },
      lineColor: colorScheme,
      lineWidth: 0.3,
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
      lineColor: colorScheme,
      gridLineColor: colorScheme,
      gridLineWidth: 0.3,
    },
    plotOptions: {
      series: {
        events: {
          click: function (event: SeriesClickEventObject) {
            navigate(weekChartsPath(this.chart.xAxis[0].categories[event.point.x]));
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "column",
        borderWidth: 0,
        color: theme.colors.gray[colorIndex - 2],
        data: values.map((y, i) => ({ y, color: typeColors[labels[i]] })),
        dataLabels: [
          {
            enabled: true,
            formatter: function (this: Point) {
              return this.index !== undefined ? labels[this.index] : "";
            },
            style: {
              color: colorScheme,
            },
          },
          {
            enabled: true,
            formatter,
            verticalAlign: "top",
            style: {
              color: colorScheme,
            },
          },
        ],
      },
    ],
  };

  return <ChartDraw options={options} />;
}
