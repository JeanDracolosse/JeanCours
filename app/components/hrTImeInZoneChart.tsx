import { Chart, PlotOptions, Title, XAxis, YAxis } from "@highcharts/react";
import { Column } from "@highcharts/react/series";
import type { HrInTimeZoneType } from "~/interfaces";

export default function HrTimeInZoneChart({ hrTimeInZone, index }: { hrTimeInZone: HrInTimeZoneType, index: string[] }) {
    return (
        <Chart >
            <Title>{"Zone BPM"}</Title>
            <XAxis
                categories={index} />
            <YAxis
                title={{ text: 'Zone BPM' }} />
            <PlotOptions
                series={{
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }} />
            <Column.Series
                options={{
                    color: "#233d4d", yAxis: 0, name: "Zone 5", dataLabels: { format: '{point.percentage:.0f}%' }
                }}
                data={hrTimeInZone["hrTimeInZone_5"]} />
            <Column.Series
                options={{ color: "#fe7f2d", name: "Zone 4", dataLabels: { format: '{point.percentage:.0f}%' } }}
                data={hrTimeInZone["hrTimeInZone_4"]} />
            <Column.Series
                options={{ color: "#fcca46", name: "Zone 3", dataLabels: { format: '{point.percentage:.0f}%' } }}
                data={hrTimeInZone["hrTimeInZone_3"]} />
            <Column.Series
                options={{ color: "#a1c181", name: "Zone 2", dataLabels: { format: '{point.percentage:.0f}%' } }}
                data={hrTimeInZone["hrTimeInZone_2"]} />
            <Column.Series
                options={{ color: "#619b8a", name: "Zone 1", dataLabels: { format: '{point.percentage:.0f}%' } }}
                data={hrTimeInZone["hrTimeInZone_1"]} />
        </Chart>
    );
}