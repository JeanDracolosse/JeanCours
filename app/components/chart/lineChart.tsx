import Highcharts, { type SeriesClickEventObject } from 'highcharts';
import { dateFormatter, getSerieFormatterByType } from '../../utils/formatters';
import type { LineDataType } from '../../interfaces';
import { useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Chart from './chart';
import { useNavigate, type NavigateFunction } from 'react-router';

function getOptions(redirect: boolean, navigate: NavigateFunction, lineDataArray: LineDataType[], index: string[]): Highcharts.Options {
    const theme = useMantineTheme()
    const colorScheme = useColorScheme() === 'dark' ? theme.colors.dark[0] : theme.black
    const dataColor = useColorScheme() === 'dark' ? theme.colors.secondaryColor[2] : theme.colors.secondaryColor[6]

    const plotOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            backgroundColor: undefined,
        },
        title: {
            text: '',
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            categories: index,
            labels: {
                style: {
                    color: colorScheme
                },
                formatter: dateFormatter
            },
        },
        yAxis: [
            {
                title: {
                    text: '',
                },
                labels: {
                    enabled: false
                },
            },
        ],
        legend: {
            itemStyle: {
                color: colorScheme,
            },
            itemHiddenStyle: {
                color: colorScheme,
            }
        },
        plotOptions: {
            series: {
                events: {
                    show: (function () {
                        var chart = this.chart,
                            series = chart.series,
                            i = series.length,
                            otherSeries;
                        while (i--) {
                            otherSeries = series[i];
                            if (otherSeries != this && otherSeries.visible) {
                                otherSeries.hide();
                            }
                        }
                    })
                },
            }
        },
        series: lineDataArray.map((lineData, index) =>
        ({
            name: lineData.name,
            color: dataColor,
            yAxis: 0,
            dataLabels: {
                enabled: true,
                formatter: lineData.formatter || getSerieFormatterByType(lineData.unit),
            },
            data: lineData.serie,
            type: 'line',
            selected: index === 0
        }))
    }
    if (redirect && plotOptions.plotOptions?.series?.events) {
        plotOptions.plotOptions.series.events.click = (function (event: SeriesClickEventObject) {
            const dateString = this.chart.xAxis[0].categories[event.point.x]
            const date = new Date(dateString)
            const year = date.getFullYear()

            const startDate = new Date(year, 0, 1);
            const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
            const weekNumber = Math.ceil((days + 1) / 7)
            navigate(`/weekCharts/${year}/${weekNumber}`)
        }
        )
    }
    return plotOptions
}

export default function LineChart({ redirect, lineDataArray, index }: { redirect: boolean, lineDataArray: LineDataType[], index: string[] }) {
    const naviguate: NavigateFunction = useNavigate()
    const options: Highcharts.Options = getOptions(redirect, naviguate, lineDataArray, index)
    return (
        <Chart options={options} />
    );
};
