import { Chart, Title, XAxis, YAxis } from "@highcharts/react";
import { Column, Line } from "@highcharts/react/series";
import type { DistanceType } from "~/interfaces";
import { kilometerDataLabelFormatter, kilometerFormatter, meterDataLabelFormatter, meterFormatter } from "~/utils/formatters";
import Highcharts from "highcharts/esm/highcharts.src";

export default function DistanceChart({ distance, index }: { distance: DistanceType, index: string[] }) {
    return (
        <Chart highcharts={Highcharts}>
            <Title>{"Distance"}</Title>
            <XAxis
                categories={index} />
            <YAxis
                title={{ text: 'Distance' }} />
            <YAxis
                title={{ text: 'Elevation' }} opposite={true} />
            <Line.Series
                options={{
                    color: "#22333b", yAxis: 0, name: "Distance", label: {
                        enabled: true,
                        //formatter: kilometerFormatter
                    }, dataLabels: {
                        enabled: true,
                        formatter: kilometerDataLabelFormatter
                    }
                }}
                data={distance["distance"]} />
            <Line.Series
                options={{
                    color: "#22333b", yAxis: 1, name: "Elevation", label: {
                        enabled: true,
                        //formatter: meterFormatter
                    }, dataLabels: {
                        enabled: true,
                        formatter: meterDataLabelFormatter
                    }
                }}
                data={distance["elevationGain"]} />
        </Chart>
    );
}