import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { HrTimeInZoneType } from '../interfaces';
import { ClientOnly } from 'remix-utils/client-only';
import { useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { dateFormatter } from '~/utils/formatters';

function getOptions(hrTimeInZone: HrTimeInZoneType, index: string[]): Highcharts.Options {
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
                data: hrTimeInZone['hrTimeInZone_5'],
                type: 'column'
            },
            {
                name: 'Zone 4',
                color: theme.colors.secondaryColor[6],
                legendIndex: 4,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_4'],
                type: 'column'
            },
            {
                name: 'Zone 3',
                color: theme.colors.secondaryColor[4],
                legendIndex: 3,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_3'],
                type: 'column'

            },
            {
                name: 'Zone 2',
                color: theme.colors.secondaryColor[2],
                legendIndex: 2,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_2'],
                type: 'column'

            },
            {
                name: 'Zone 1',
                color: theme.colors.secondaryColor[0],
                legendIndex: 1,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_1'],
                type: 'column'

            },
        ],
    };
}

export default function HrTimeInZoneChart({ hrTimeInZone, index }: { hrTimeInZone: HrTimeInZoneType, index: string[] }) {
    const options: Highcharts.Options = getOptions(hrTimeInZone, index)
    return (
        <ClientOnly fallback={<p>Chargement ...</p>}>
            {() => (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}</ClientOnly>
    );
};
