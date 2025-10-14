import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { PowerTimeInZoneType } from '../interfaces';

function getOptions(powerTimeInZone: PowerTimeInZoneType, index: string[]): Highcharts.Options {
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
        },
        yAxis: {
            title: {
                text: 'Zone BPM',
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
        series: [
            {
                name: 'Zone 5',
                color: '#233d4d',
                yAxis: 0,
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_5'],
                type: 'column'
            },
            {
                name: 'Zone 4',
                color: '#fe7f2d',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_4'],
                type: 'column'
            },
            {
                name: 'Zone 3',
                color: '#fcca46',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_3'],
                type: 'column'

            },
            {
                name: 'Zone 2',
                color: '#a1c181',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: powerTimeInZone['powerTimeInZone_2'],
                type: 'column'

            },
            {
                name: 'Zone 1',
                color: '#619b8a',
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
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};
