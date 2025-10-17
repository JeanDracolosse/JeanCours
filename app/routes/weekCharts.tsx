
import { useLoaderData } from "react-router";

import { getMetricByActivity } from "~/utils/mongo";
import type { ChartType, DataSeriesType } from "~/interfaces";
import Charts from "~/components/chart/charts";
import { defaultChartList } from "~/utils/charts";

const chartList: ChartType[] = defaultChartList

export async function loader({ params }: { params: { year: string, week: string } }) {
    const metricList = chartList.map(entry => entry.series?.map(entry => entry.metric)).flat() as string[];
    const metricValues = await getMetricByActivity(params.year, params.week, metricList)
    return { metricValues };
}

export default function WeekCharts() {
    const { metricValues } = useLoaderData() as {
        metricValues: DataSeriesType;
    }

    const index = metricValues.startTimeLocal

    return (
        <Charts
            redirect={false}
            chartList={chartList}
            index={index}
            metricValues={metricValues}
        />)
}


