import React from "react";
import { Accordion, Stack, Title, useMantineTheme } from "@mantine/core";
import LineChart from "~/components/chart/lineChart";
import TimeInZoneChart from "~/components/chart/tImeInZoneChart";
import type { ChartType, DataSeriesType } from "~/interfaces";
import { InfoCircle } from "tabler-icons-react";

export default function Charts({
  redirect,
  chartList,
  index,
  metricValues,
}: {
  redirect: boolean;
  chartList: ChartType[];
  index: string[];
  metricValues: DataSeriesType;
}) {
  const theme = useMantineTheme();
  const iconColor = theme.colors[theme.primaryColor][6];
  return (
    <Stack align="stretch" justify="flex-start" gap="xl">
      {chartList.map((metricEntry) => (
        <div id={metricEntry.id} key={metricEntry.id}>
          <Accordion
            variant="unstyled"
            chevron={<InfoCircle color="var(--mantine-color-text)" />}
            disableChevronRotation={true}
          >
            <Accordion.Item value={metricEntry.title}>
              <Accordion.Control icon={metricEntry.icon(iconColor)}>
                <Title order={3} style={{ color: "var(--mantine-color-text)" }}>
                  {" "}
                  {metricEntry.title}
                </Title>
              </Accordion.Control>
              <Accordion.Panel>{metricEntry.description}</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          {metricEntry.type === "line" && (
            <LineChart
              redirect={redirect}
              index={index}
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
            <TimeInZoneChart
              redirect={redirect}
              index={index}
              timeInZoneData={{
                timeInZone1: metricValues[metricEntry.series[0].metric],
                timeInZone2: metricValues[metricEntry.series[1].metric],
                timeInZone3: metricValues[metricEntry.series[2].metric],
                timeInZone4: metricValues[metricEntry.series[3].metric],
                timeInZone5: metricValues[metricEntry.series[4].metric],
              }}
            />
          )}
        </div>
      ))}
    </Stack>
  );
}
