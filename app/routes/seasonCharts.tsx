
import { useLoaderData } from "react-router";

import { getIndex, getMetricByWeek } from "~/utils/mongo";
import type { ChartType, DataSeriesType } from "~/interfaces";
import Charts from "~/components/chart/charts";
import { defaultChartList } from "~/utils/charts";
import { Space } from "@mantine/core";
import { Blockquote } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';
const chartList: ChartType[] = defaultChartList

export async function loader() {
    const metricList = chartList.map(entry => entry.series?.map(entry => entry.metric)).flat() as string[];
    const metricValues = await getMetricByWeek(metricList)
    const index = await getIndex()

    return { index, metricValues };
}

export default function SeasonCharts() {
    const { index, metricValues } = useLoaderData() as {
        index: string[]
        metricValues: DataSeriesType;
    }

    return (
        <Space h="xl">
            <Blockquote mb="xl" icon={<InfoCircle />} mt="xl">
                Cliquer sur les données d'une semaine permet d'en voir le détail
            </Blockquote>
            <Charts
                redirect={true}
                chartList={chartList}
                index={index}
                metricValues={metricValues}
            />
        </Space>)
}


