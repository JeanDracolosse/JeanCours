import React from "react";
import { Accordion, Card, Stack, Title, useMantineTheme } from "@mantine/core";
import LineChart from "~/components/chart/lineChart";
import TimeInZoneChart from "~/components/chart/tImeInZoneChart";
import ZoneShareChart from "~/components/chart/zoneShareChart";
import type { ChartType, DataSeriesType, TimeInZoneDataType } from "~/interfaces";

// Column charts have exactly 5 series, zone 1 to zone 5.
function timeInZoneData(chart: ChartType, metricValues: DataSeriesType): TimeInZoneDataType {
  return {
    timeInZone1: metricValues[chart.series[0].metric],
    timeInZone2: metricValues[chart.series[1].metric],
    timeInZone3: metricValues[chart.series[2].metric],
    timeInZone4: metricValues[chart.series[3].metric],
    timeInZone5: metricValues[chart.series[4].metric],
  };
}

export default function Charts({
  redirect,
  chartList,
  index,
  indexes,
  metricValues,
}: {
  redirect: boolean;
  chartList: ChartType[];
  index: string[];
  // x-axis per chart id, for charts that don't use `index` (e.g. daily training load on the week page).
  indexes?: Record<string, string[]>;
  metricValues: DataSeriesType;
}) {
  const theme = useMantineTheme();
  const iconColor = theme.colors[theme.primaryColor][6];
  return (
    <Stack align="stretch" justify="flex-start" gap="xl">
      {chartList.map((metricEntry) => (
        <div id={metricEntry.id} key={metricEntry.id}>
          <Card withBorder radius="md">
            <Card.Section>
              <Accordion mb="md" variant="default">
                <Accordion.Item value={metricEntry.title}>
                  <Accordion.Control icon={metricEntry.icon(iconColor, 36)}>
                    <Title order={3} style={{ color: "var(--mantine-color-text)" }}>
                      {metricEntry.title}
                    </Title>
                  </Accordion.Control>
                  <Accordion.Panel>{metricEntry.description}</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card.Section>

            {metricEntry.type === "line" && (
              <LineChart
                redirect={redirect}
                index={indexes?.[metricEntry.id] ?? index}
                lineDataArray={
                  metricEntry.series?.map((serie) => ({
                    name: serie.name,
                    serie: metricValues[serie.metric],
                    formatter: serie.formatter,
                  })) || []
                }
              />
            )}
            {metricEntry.type === "column" && (
              <Stack gap="md">
                <TimeInZoneChart
                  redirect={redirect}
                  index={indexes?.[metricEntry.id] ?? index}
                  timeInZoneData={timeInZoneData(metricEntry, metricValues)}
                />
                <ZoneShareChart timeInZoneData={timeInZoneData(metricEntry, metricValues)} />
              </Stack>
            )}
          </Card>
        </div>
      ))}
    </Stack>
  );
}
