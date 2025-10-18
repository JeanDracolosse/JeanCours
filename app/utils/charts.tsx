import { ArrowsDoubleNeSw } from "tabler-icons-react";
import { defaultDataLabelFormatter, kilometerDataLabelFormatter, meterDataLabelFormatter } from "./formatters";
import type { ChartType } from "~/interfaces";
import React from "react";

export const defaultChartList: ChartType[] = [

    {
        id: "hrTimeInZone",
        title: "Zone BPM",
        type: "column",
        icon: (iconColor: string) => <ArrowsDoubleNeSw
            size={36}
            strokeWidth={1.5}
            color={iconColor} />,
        series: [{
            name: "Zone 1",
            metric: "hrTimeInZone_1",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 2",
            metric: "hrTimeInZone_2",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 3",
            metric: "hrTimeInZone_3",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 4",
            metric: "hrTimeInZone_4",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 5",
            metric: "hrTimeInZone_5",
            formatter: defaultDataLabelFormatter
        },]
    },
    {
        id: "powerTimeInZone",
        title: "Zone Puissance",
        type: "column",
        icon: (iconColor: string) => <ArrowsDoubleNeSw
            size={36}
            strokeWidth={1.5}
            color={iconColor} />,
        series: [{
            name: "Zone 1",
            metric: "powerTimeInZone_1",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 2",
            metric: "powerTimeInZone_2",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 3",
            metric: "hrTimeInZone_3",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 4",
            metric: "powerTimeInZone_4",
            formatter: defaultDataLabelFormatter
        }, {
            name: "Zone 5",
            metric: "powerTimeInZone_5",
            formatter: defaultDataLabelFormatter
        },
        ]
    },
    {
        id: "distance",
        title: "Distance",
        type: "line",
        icon: (iconColor: string) => <ArrowsDoubleNeSw
            size={36}
            strokeWidth={1.5}
            color={iconColor} />,
        series: [{
            name: "Distance",
            metric: "distance",
            formatter: kilometerDataLabelFormatter,
        },
        {
            name: "Dénivelé +",
            metric: "elevationGain",
            formatter: meterDataLabelFormatter,
        },
        {
            name: "Dénivelé -",
            metric: "elevationLoss",
            formatter: meterDataLabelFormatter,
        }]
    }]
