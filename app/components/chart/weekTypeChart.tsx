import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { Chart, Point, SeriesClickEventObject } from "highcharts";
import type { NavigateFunction } from "react-router";
import { useNavigate } from "react-router";
import { dateFormatter, kilometerDataLabelFormatter } from "~/utils/formatters";
import ChartDraw from "./chart";

function getOptions(
  navigate: NavigateFunction,
  distance: string[],
  label: string[],
  index: string[]
): Highcharts.Options {
  const theme = useMantineTheme();
  const colorScheme = "var(--mantine-color-text)";
  const colorIndex = useColorScheme() === "dark" ? 8 : 6;

  const plotOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "var(--mantine-color-body)",
      borderColor: "light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
      borderWidth: 1,
      borderRadius: 8,
      style: {
        fontFamily: theme.fontFamily,
      },
      events: {
        load: function (this: Chart) {
          console.log(this);
          this.series[0].points.forEach(function (i, e) {
            switch (label[e]) {
              case "Base":
                i.update({ color: theme.colors.chart2Color[colorIndex] });
                break;
              case "Récupération":
                i.update({ color: theme.colors.chart1Color[colorIndex] });
                break;
              case "Intensive":
                i.update({ color: theme.colors.chart3Color[colorIndex] });
                break;
              case "Spécifique":
                i.update({ color: theme.colors.chart4Color[colorIndex] });
                break;
              default:
                break;
            }
          });
        },
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
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
        events: {},
      },
    },
    legend: {
      enabled: false
    },
    series: [
      {
        dataLabels: [
          {
            formatter: function (this: Point) {
              if (this.index !== undefined) {
                return label[this.index];
              }
              return "";
            },
            style: {
              color: colorScheme,
            },
          },
          {
            formatter: kilometerDataLabelFormatter,
            verticalAlign: "top",
            style: {
              color: colorScheme,
            },
          },
        ],
        data: distance,
        type: "column",
        borderWidth: 0,
      },
    ],
  };
  if (plotOptions.plotOptions?.series?.events) {
    plotOptions.plotOptions.series.events.click = function (event: SeriesClickEventObject) {
      const dateString = this.chart.xAxis[0].categories[event.point.x];
      const date = new Date(dateString);
      const year = date.getFullYear();

      const startDate = new Date(year, 0, 1);
      const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil((days + 1) / 7);
      navigate(`/weekCharts/${year}/${weekNumber}`);
    };
  }

  return plotOptions;
}

export default function WeekTypeChart({
  distance,
  label,
  index,
}: {
  distance: string[];
  label: string[];
  index: string[];
}) {
  const navigate: NavigateFunction = useNavigate();
  const options: Highcharts.Options = getOptions(navigate, distance, label, index);
  return <ChartDraw options={options} />;
}
