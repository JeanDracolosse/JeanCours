import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import Highcharts, { type SeriesClickEventObject } from "highcharts";
import { useNavigate, type NavigateFunction } from "react-router";
import type { LineDataType } from "../../interfaces";
import { dateFormatter, getSerieFormatterByType } from "../../utils/formatters";
import { weekChartsPath } from "~/utils/isoWeek";
import Chart from "./chart";

function getOptions(
  redirect: boolean,
  navigate: NavigateFunction,
  lineDataArray: LineDataType[],
  index: string[]
): Highcharts.Options {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme() === "dark" ? theme.colors.dark[0] : theme.black;
  const colorIndex = useColorScheme() === "dark" ? 8 : 6;

  const plotOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "var(--mantine-color-body)",
      borderColor: "light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
      borderWidth: 1,
      borderRadius: 8,
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
    yAxis: [
      {
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
    ],
    legend: {
      itemStyle: {
        color: colorScheme,
      },
      itemHiddenStyle: {
        color: colorScheme,
      },
    },
    plotOptions: {
      series: {
        events: {
          show: function () {
            const chart = this.chart,
              series = chart.series;
            let i = series.length,
              otherSeries;
            while (i--) {
              otherSeries = series[i];
              if (otherSeries != this && otherSeries.visible) {
                otherSeries.hide();
              }
            }
          },
        },
      },
    },
    series: lineDataArray.map((lineData, index) => ({
      name: lineData.name,
      color: theme.colors.chart2Color[colorIndex],
      yAxis: 0,
      dataLabels: {
        enabled: true,
        formatter: lineData.formatter || getSerieFormatterByType(lineData.unit),
        style: {
          color: colorScheme,
        },
      },
      visible: index === 0,
      data: lineData.serie,
      type: "line",
    })),
  };
  if (redirect && plotOptions.plotOptions?.series?.events) {
    plotOptions.plotOptions.series.events.click = function (event: SeriesClickEventObject) {
      navigate(weekChartsPath(this.chart.xAxis[0].categories[event.point.x]));
    };
  }
  return plotOptions;
}

export default function LineChart({
  redirect,
  lineDataArray,
  index,
}: {
  redirect: boolean;
  lineDataArray: LineDataType[];
  index: string[];
}) {
  const naviguate: NavigateFunction = useNavigate();
  const options: Highcharts.Options = getOptions(redirect, naviguate, lineDataArray, index);
  return <Chart options={options} />;
}
