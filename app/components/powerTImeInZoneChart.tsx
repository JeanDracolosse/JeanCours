import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { PowerTimeInZoneType } from '../interfaces';
import { ClientOnly } from 'remix-utils/client-only';
import { useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { dateFormatter } from '~/utils/formatters';

function getOptions(powerTimeInZone: PowerTimeInZoneType, index: string[]): Highcharts.Options {
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
                text: 'Zone de Puissance',
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
                color: theme.colors.myColor[8],
                legendIndex: 5,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_5'],
                type: 'column'
            },
            {
                name: 'Zone 4',
                color: theme.colors.myColor[6],
                legendIndex: 4,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_4'],
                type: 'column'
            },
            {
                name: 'Zone 3',
                color: theme.colors.myColor[4],
                legendIndex: 3,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_3'],
                type: 'column'

            },
            {
                name: 'Zone 2',
                color: theme.colors.myColor[2],
                legendIndex: 2,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_2'],
                type: 'column'

            },
            {
                name: 'Zone 1',
                color: theme.colors.myColor[0],
                legendIndex: 1,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_1'],
                type: 'column'

            },
        ],
    };
}

export default function PowerTimeInZoneChart({ powerTimeInZone, index }: { powerTimeInZone: PowerTimeInZoneType, index: string[] }) {
    const options: Highcharts.Options = getOptions(powerTimeInZone, index)
    return (
        <ClientOnly fallback={<p>Chargement ...</p>}>
            {() => (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}</ClientOnly>
    );
};
