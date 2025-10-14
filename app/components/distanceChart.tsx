import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { kilometerDataLabelFormatter, kilometerFormatter, meterDataLabelFormatter, meterFormatter } from '../utils/formatters';
import type { DistanceType } from '../interfaces';

function getOptions(distance: DistanceType, index: string[]): Highcharts.Options {

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
        },
        yAxis: [
            {
                title: {
                    text: 'Distance',
                },
                labels: {
                    formatter: kilometerFormatter,
                },
            },
            {
                title: {
                    text: 'Elevation',
                },
                opposite: true,
                labels: {
                    formatter: meterFormatter,
                },
            },
        ],
        series: [
            {
                name: 'Distance',
                color: '#22333b',
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
                color: '#22333b',
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
                color: '#22333b',
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
                color: '#22333b',
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
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};
