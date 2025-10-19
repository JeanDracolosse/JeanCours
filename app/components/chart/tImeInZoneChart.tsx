import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { SeriesClickEventObject } from "highcharts";
import type { NavigateFunction } from "react-router";
import { useNavigate } from "react-router";
import type { TimeInZoneDataType } from "~/interfaces";
import { dateFormatter } from "~/utils/formatters";
import Chart from "./chart";

function getOptions(
  redirect: boolean,
  navigate: NavigateFunction,
  timeInZoneData: TimeInZoneDataType,
  index: string[]
): Highcharts.Options {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme() === "dark" ? theme.colors.dark[0] : theme.black;
  const colorIndex = useColorScheme() === "dark" ? 9 : 6;

  const plotOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: undefined,
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
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
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
      itemStyle: {
        color: colorScheme,
      },
      itemHiddenStyle: {
        color: colorScheme,
      },
    },
    series: [
      {
        name: "Zone 5",
        color: theme.colors.chart5Color[colorIndex],
        legendIndex: 5,
        dataLabels: {
          format: "{point.percentage:.0f}%",
        },
        data: timeInZoneData.timeInZone5,
        type: "column",
      },
      {
        name: "Zone 4",
        color: theme.colors.chart4Color[colorIndex],
        legendIndex: 4,
        dataLabels: {
          format: "{point.percentage:.0f}%",
        },
        data: timeInZoneData.timeInZone4,
        type: "column",
      },
      {
        name: "Zone 3",
        color: theme.colors.chart3Color[colorIndex],
        legendIndex: 3,
        dataLabels: {
          format: "{point.percentage:.0f}%",
        },
        data: timeInZoneData.timeInZone3,
        type: "column",
      },
      {
        name: "Zone 2",
        color: theme.colors.chart2Color[colorIndex],
        legendIndex: 2,
        dataLabels: {
          format: "{point.percentage:.0f}%",
        },
        data: timeInZoneData.timeInZone2,
        type: "column",
      },
      {
        name: "Zone 1",
        color: theme.colors.chart1Color[colorIndex],
        legendIndex: 1,
        dataLabels: {
          format: "{point.percentage:.0f}%",
        },
        data: timeInZoneData.timeInZone1,
        type: "column",
      },
    ],
  };
  if (redirect && plotOptions.plotOptions?.series?.events) {
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

export default function TimeInZoneChart({
  redirect,
  timeInZoneData,
  index,
}: {
  redirect: boolean;
  timeInZoneData: TimeInZoneDataType;
  index: string[];
}) {
  const navigate: NavigateFunction = useNavigate();
  const options: Highcharts.Options = getOptions(redirect, navigate, timeInZoneData, index);
  return <Chart options={options} />;
}
