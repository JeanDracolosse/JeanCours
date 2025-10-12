import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { HrInTimeZoneType } from '../interfaces';

function getOptions(hrTimeInZone: HrInTimeZoneType, index: string[]): Highcharts.Options {
    return {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Zone BPM',
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
                data: hrTimeInZone['hrTimeInZone_5'],
                type: 'column'
            },
            {
                name: 'Zone 4',
                color: '#fe7f2d',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_4'],
                type: 'column'
            },
            {
                name: 'Zone 3',
                color: '#fcca46',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_3'],
                type: 'column'

            },
            {
                name: 'Zone 2',
                color: '#a1c181',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_2'],
                type: 'column'

            },
            {
                name: 'Zone 1',
                color: '#619b8a',
                dataLabels: {
                    format: '{point.percentage:.0f}%',
                },
                data: hrTimeInZone['hrTimeInZone_1'],
                type: 'column'

            },
        ],
    };
}

export default function HrTimeInZoneChart({ hrTimeInZone, index }: { hrTimeInZone: HrInTimeZoneType, index: string[] }) {
    const options: Highcharts.Options = getOptions(hrTimeInZone, index)
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};
