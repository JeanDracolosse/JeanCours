
import { useLoaderData } from "react-router";

import HrTimeInZoneChart from "~/components/hrTImeInZoneChart";
import DistanceChart from "~/components/distanceChart";
import type { HrTimeInZoneType, DistanceType, PowerTimeInZoneType } from "~/interfaces";
import { getHrTimeInZone, getDistance, getIndex, getPowerTimeInZone } from "~/utils/mongo";
import { Flex, Stack, Title, useMantineTheme } from '@mantine/core';
import { ActivityHeartbeat, ArrowsDoubleNeSw, Windmill } from 'tabler-icons-react';
import PowerTimeInZoneChart from "~/components/powerTImeInZoneChart";

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
            <HrTimeInZoneChart index={index} hrTimeInZone={hrTimeInZone} />
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
            <PowerTimeInZoneChart index={index} powerTimeInZone={powerTimeInZone} />

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
            <DistanceChart index={index} distance={distance} />
        </Stack>)
}


