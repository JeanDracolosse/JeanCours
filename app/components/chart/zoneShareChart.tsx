import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { Point } from "highcharts";
import type { TimeInZoneDataType } from "~/interfaces";
import { formatDuration } from "~/utils/formatters";
import Chart from "./chart";

// Share of the time spent in each zone over the whole period shown (season or week).
export default function ZoneShareChart({ timeInZoneData }: { timeInZoneData: TimeInZoneDataType }) {
  const theme = useMantineTheme();
  const colorScheme = "var(--mantine-color-text)";
  const colorIndex = useColorScheme() === "dark" ? 8 : 6;
  const zoneColors = [
    theme.colors.chart1Color,
    theme.colors.chart2Color,
    theme.colors.chart3Color,
    theme.colors.chart4Color,
    theme.colors.chart5Color,
  ];
  const zones = [
    timeInZoneData.timeInZone1,
    timeInZoneData.timeInZone2,
    timeInZoneData.timeInZone3,
    timeInZoneData.timeInZone4,
    timeInZoneData.timeInZone5,
  ];

  const data = zones.map((zone, index) => ({
    name: `Zone ${index + 1}`,
    y: (zone ?? []).reduce<number>((total, seconds) => total + (seconds ?? 0), 0),
    color: zoneColors[index][colorIndex],
  }));

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "var(--mantine-color-body)",
      borderColor: "light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
      borderWidth: 1,
      borderRadius: 8,
      height: 300,
      style: {
        fontFamily: theme.fontFamily,
      },
    },
    title: {
      text: "Répartition sur la période",
      style: { color: colorScheme, fontSize: "14px" },
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        name: "Répartition",
        borderWidth: 0,
        data,
        dataLabels: {
          enabled: true,
          formatter: function (this: Point) {
            if (!this.y) return "";
            return `${this.name}: ${Math.round(this.percentage ?? 0)}% (${formatDuration(this.y)})`;
          },
          style: {
            color: colorScheme,
          },
        },
      },
    ],
  };

  return <Chart options={options} />;
}
