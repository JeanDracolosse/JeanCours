
import { useLoaderData } from "react-router";

import { getMetricByActivity } from "~/utils/mongo";
import { Flex, Stack, Title, useMantineTheme } from '@mantine/core';
import { ArrowsDoubleNeSw } from 'tabler-icons-react';
import LineChart from "~/components/chart/lineChart";
import type { DataSeriesType } from "~/interfaces";
import { kilometerDataLabelFormatter, meterDataLabelFormatter } from "~/utils/formatters";

const chartList = [
    {
        title: "Distance",
        icon: (iconColor: string) => <ArrowsDoubleNeSw
            size={36}
            strokeWidth={1.5}
            color={iconColor} />,
        series: [{
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
        }]
    }]

export async function loader({ params }: { params: { year: string, week: string } }) {
    const metricList = chartList.map(entry => entry.series?.map(entry => entry.metric)).flat() as string[];
    const metricValues = await getMetricByActivity(params.year, params.week, metricList)
    return { metricValues };
}

export default function Charts() {
    const { metricValues } = useLoaderData() as {
        metricValues: DataSeriesType;
    }
    const theme = useMantineTheme();
    const iconColor = theme.colors[theme.primaryColor][6];
    return (
        <Stack
            align="stretch"
            justify="flex-start"
            gap="xl">
            <Title order={4}>Graphes de données</Title>
            {chartList.map((metricEntry) => (<div><Flex
                id={metricEntry.title}
                align="center"
                ml="lg">
                {metricEntry.icon(iconColor)}
                <Title order={5} >{metricEntry.title}</Title>
            </Flex>
                <LineChart index={metricValues.startTimeLocal} lineDataArray={
                    metricEntry.series?.map(serie => ({ name: serie.name, serie: metricValues[serie.metric], formatter: serie.formatter })) || []
                } /></div>))}
        </Stack>)
}


