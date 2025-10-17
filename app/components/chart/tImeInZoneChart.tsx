
import { useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { dateFormatter } from '~/utils/formatters';
import type { TimeInZoneDataType } from '~/interfaces';
import Chart from './chart';

function getOptions(timeInZoneData: TimeInZoneDataType, index: string[]): Highcharts.Options {
    const theme = useMantineTheme()
    const colorScheme = useColorScheme() === 'dark' ? theme.colors.dark[0] : theme.black
    return {
        chart: {
            type: 'column',
            backgroundColor: undefined,
        },
        title: {
            text: ""
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
            }
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                enabled: false
            },

        },
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                },
            },
        },
        legend: {
            itemStyle: {
                color: colorScheme,
            },
            itemHiddenStyle: {
                color: colorScheme,
            }
        },
        series: [
            {
                name: 'Zone 5',
                color: theme.colors.secondaryColor[8],
                legendIndex: 5,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: timeInZoneData.timeInZone5,
                type: 'column'
            },
            {
                name: 'Zone 4',
                color: theme.colors.secondaryColor[6],
                legendIndex: 4,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: timeInZoneData.timeInZone4,
                type: 'column'
            },
            {
                name: 'Zone 3',
                color: theme.colors.secondaryColor[4],
                legendIndex: 3,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: timeInZoneData.timeInZone3,
                type: 'column'

            },
            {
                name: 'Zone 2',
                color: theme.colors.secondaryColor[2],
                legendIndex: 2,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: timeInZoneData.timeInZone2,
                type: 'column'

            },
            {
                name: 'Zone 1',
                color: theme.colors.secondaryColor[0],
                legendIndex: 1,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: timeInZoneData.timeInZone1,
                type: 'column'

            },
        ],
    };
}

export default function TimeInZoneChart({ timeInZoneData, index }: { timeInZoneData: TimeInZoneDataType, index: string[] }) {
    const options: Highcharts.Options = getOptions(timeInZoneData, index)
    return (
        <Chart options={options} />
    );
};
