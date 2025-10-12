import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { HrInTimeZoneType } from '~/interfaces';

function getOptions(hrTimeInZone: HrInTimeZoneType, index: string[]): Highcharts.Options {
    return {
        chart: {
            type: 'column', // Type de graphique (ici un histogramme)
        },
        title: {
            text: 'Zone BPM', // Titre du graphique
        },
        xAxis: {
            categories: index, // Données pour les catégories de l'axe X
        },
        yAxis: {
            title: {
                text: 'Zone BPM', // Titre de l'axe Y
            },
        },
        plotOptions: {
            series: {
                stacking: 'normal', // Empilement des séries
                dataLabels: {
                    enabled: true, // Activer les labels de données
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
