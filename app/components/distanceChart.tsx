import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { DistanceType, } from '~/interfaces';
import { kilometerDataLabelFormatter, kilometerFormatter, meterDataLabelFormatter, meterFormatter } from '~/utils/formatters';

function getOptions(distance: DistanceType, index: string[]): Highcharts.Options {
    return {
        chart: {
            type: 'column', // Type de graphique (ici un graphique en colonnes)
        },
        title: {
            text: 'Distance', // Titre du graphique
        },
        xAxis: {
            categories: index, // Les catégories pour l'axe X
        },
        yAxis: [
            {
                title: {
                    text: 'Distance', // Titre de l'axe Y 1
                },
                labels: {
                    //formatter: kilometerFormatter, // Formatte les labels de l'axe Y 1 avec la fonction `kilometerFormatter`
                },
            },
            {
                title: {
                    text: 'Elevation', // Titre de l'axe Y 2
                },
                opposite: true, // Positionne l'axe à droite
                labels: {
                    //formatter: meterFormatter, // Formatte les labels de l'axe Y 2 avec la fonction `meterFormatter`
                },
            },
        ],
        series: [
            {
                name: 'Distance',
                color: '#22333b',
                yAxis: 0, // Lier cette série à l'axe Y 1
                dataLabels: {
                    enabled: true, // Active les data labels
                    formatter: kilometerDataLabelFormatter, // Formatte les labels de données pour cette série
                },
                data: distance['distance'], // Les données pour la série Distance
                type: 'line'
            },
            {
                name: 'Elevation',
                color: '#22333b',
                yAxis: 1, // Lier cette série à l'axe Y 2
                dataLabels: {
                    enabled: true, // Active les data labels
                    formatter: meterDataLabelFormatter, // Formatte les labels de données pour cette série
                },
                data: distance['elevationGain'], // Les données pour la série Elevation
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
