
import { useLoaderData } from "react-router";

import type { HrTimeInZoneType, DistanceType, PowerTimeInZoneType } from "~/interfaces";
import { getHrTimeInZone, getDistance, getIndex, getPowerTimeInZone } from "~/utils/mongo";
import { Flex, Stack, Title, useMantineTheme } from '@mantine/core';
import { ActivityHeartbeat, ArrowsDoubleNeSw, Windmill } from 'tabler-icons-react';
import LineChart from "~/components/chart/lineChart";
import { kilometerDataLabelFormatter, meterDataLabelFormatter } from "~/utils/formatters";
import TimeInZoneChart from "~/components/chart/tImeInZoneChart";

export async function loader() {
    const hrTimeInZone = await getHrTimeInZone();
    const powerTimeInZone = await getPowerTimeInZone();
    const distance = await getDistance()
    const index = await getIndex()

    return { hrTimeInZone, powerTimeInZone, distance, index };
}

export default function Charts() {
    const { hrTimeInZone, powerTimeInZone, distance, index } = useLoaderData() as {
        hrTimeInZone: HrTimeInZoneType;
        powerTimeInZone: PowerTimeInZoneType;
        distance: DistanceType;
        index: string[];
    }
    const theme = useMantineTheme();
    const iconColor = theme.colors[theme.primaryColor][6];
    return (
        <Stack
            align="stretch"
            justify="flex-start"
            gap="xl">
            <Title order={4}>Graphes de données</Title>
            <Flex
                id="hrIntImeZoneChart"
                align="center"
                ml="lg">
                <ActivityHeartbeat
                    size={36}
                    strokeWidth={1.5}
                    color={iconColor} />
                <Title order={5}>Zones BPM</Title>
            </Flex>
            <TimeInZoneChart index={index} timeInZoneData={{
                timeInZone1: hrTimeInZone.hrTimeInZone_1,
                timeInZone2: hrTimeInZone.hrTimeInZone_2,
                timeInZone3: hrTimeInZone.hrTimeInZone_3,
                timeInZone4: hrTimeInZone.hrTimeInZone_4,
                timeInZone5: hrTimeInZone.hrTimeInZone_5,
            }} />
            <Flex
                id="powerIntImeZoneChart"
                align="center"
                ml="lg">
                <Windmill
                    size={36}
                    strokeWidth={1.5}
                    color={iconColor} />
                <Title order={5}>Zone de puissance</Title>
            </Flex>
            <TimeInZoneChart index={index} timeInZoneData={{
                timeInZone1: powerTimeInZone.powerTimeInZone_1,
                timeInZone2: powerTimeInZone.powerTimeInZone_2,
                timeInZone3: powerTimeInZone.powerTimeInZone_3,
                timeInZone4: powerTimeInZone.powerTimeInZone_4,
                timeInZone5: powerTimeInZone.powerTimeInZone_5,
            }} />

            <Flex
                id="distanceChart"
                align="center"
                ml="lg">
                <ArrowsDoubleNeSw
                    size={36}
                    strokeWidth={1.5}
                    color={iconColor} />
                <Title order={5} >Distance</Title>
            </Flex>
            <LineChart index={index} lineDataArray={[
                { name: "Distance", serie: distance.distance, formatter: kilometerDataLabelFormatter },
                { name: "Dénivelé", serie: distance.elevationGain, formatter: meterDataLabelFormatter },
                { name: "Kilomètre effort", serie: distance.kilometerEffort, formatter: kilometerDataLabelFormatter },
                { name: "Kilomètre effort complet", serie: distance.fullKilometerEffort, formatter: kilometerDataLabelFormatter },
            ]} />
        </Stack>)
}


