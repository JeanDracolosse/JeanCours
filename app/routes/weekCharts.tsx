import React from 'react';
import { useLoaderData } from 'react-router';

import Charts from '~/components/chart/charts';
import type { ChartType, DataSeriesType } from '~/interfaces';
import { defaultChartList } from '~/utils/charts';
import { getMetricByActivity } from '~/utils/mongo';

const chartList: ChartType[] = defaultChartList;

export async function loader({ params }: { params: { year: string; week: string } }) {
  const metricList = chartList.map((entry) => entry.series?.map((entry) => entry.metric)).flat() as string[];
  const metricValues = await getMetricByActivity(params.year, params.week, metricList);
  return { metricValues };
}

export default function WeekCharts() {
  const { metricValues } = useLoaderData() as {
    metricValues: DataSeriesType;
  };

  const index = metricValues.startTimeLocal;

  return <Charts redirect={false} chartList={chartList} index={index} metricValues={metricValues} />;
}
