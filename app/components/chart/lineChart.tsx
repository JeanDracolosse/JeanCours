import Highcharts from 'highcharts';
import { dateFormatter, getSerieFormatterByType } from '../../utils/formatters';
import type { LineDataType } from '../../interfaces';
import { useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Chart from './chart';

function getOptions(lineDataArray: LineDataType[], index: string[]): Highcharts.Options {
    const theme = useMantineTheme()
    const colorScheme = useColorScheme() === 'dark' ? theme.colors.dark[0] : theme.black
    const dataColor = useColorScheme() === 'dark' ? theme.colors.secondaryColor[2] : theme.colors.secondaryColor[6]

    return {
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
                }
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
}

export default function LineChart({ lineDataArray: lineDataArray, index }: { lineDataArray: LineDataType[], index: string[] }) {
    const options: Highcharts.Options = getOptions(lineDataArray, index)
    return (
        <Chart options={options} />
    );
};
