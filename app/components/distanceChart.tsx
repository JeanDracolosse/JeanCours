import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { kilometerDataLabelFormatter, kilometerFormatter, meterDataLabelFormatter, meterFormatter } from '../utils/formatters';
import type { DistanceType } from '../interfaces';
import { ClientOnly } from 'remix-utils/client-only';
import { useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function getOptions(distance: DistanceType, index: string[]): Highcharts.Options {
    const theme = useMantineTheme()
    const colorScheme = useColorScheme() === 'dark' ? theme.colors.dark[0] : theme.black
    const dataColor = useColorScheme() === 'dark' ? theme.colors.myColor[2] : theme.colors.myColor[8]

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
                }
            }
        },
        yAxis: [
            {
                title: {
                    text: 'Distance',
                },
                labels: {
                    formatter: kilometerFormatter,
                    style: {
                        color: colorScheme
                    }
                },
            },
            {
                title: {
                    text: 'Elevation',
                },
                opposite: true,
                labels: {
                    formatter: meterFormatter,
                    style: {
                        color: colorScheme
                    }
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
        series: [
            {
                name: 'Distance',
                color: dataColor,
                yAxis: 0,
                dataLabels: {
                    enabled: true,
                    formatter: kilometerDataLabelFormatter,
                },
                data: distance['distance'],
                type: 'line'
            },
            {
                name: 'Kilomètre effort',
                color: dataColor,
                yAxis: 0,
                dataLabels: {
                    enabled: true,
                    formatter: kilometerDataLabelFormatter,
                },
                data: distance['fullKilometerEffort'],
                type: 'line'
            },
            {
                name: 'Kilomètre effort complet',
                color: dataColor,
                yAxis: 0,
                dataLabels: {
                    enabled: true,
                    formatter: kilometerDataLabelFormatter,
                },
                data: distance['kilometerEffort'],
                type: 'line'
            },
            {
                name: 'Elevation',
                color: dataColor,
                yAxis: 1,
                dataLabels: {
                    enabled: true,
                    formatter: meterDataLabelFormatter,
                },
                data: distance['elevationGain'],
                type: 'line'
            },
        ],
    }
}

export default function DistanceChart({ distance, index }: { distance: DistanceType, index: string[] }) {
    const options: Highcharts.Options = getOptions(distance, index)
    return (
        <ClientOnly fallback={<p>Chargement ...</p>}>
            {() => (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}</ClientOnly>
    );
};
