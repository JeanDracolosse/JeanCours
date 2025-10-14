
import { useLoaderData } from "react-router";

import { ClientOnly } from 'remix-utils/client-only';
import HrTimeInZoneChart from "~/components/hrTImeInZoneChart";
import DistanceChart from "~/components/distanceChart";
import type { HrTimeInZoneType, DistanceType, PowerTimeInZoneType } from "~/interfaces";
import { getHrTimeInZone, getDistance, getIndex, getPowerTimeInZone } from "~/utils/mongo";
import { Accordion, Space, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { ActivityHeartbeat, ArrowsDoubleNeSw, Windmill } from 'tabler-icons-react';
import PowerTimeInZoneChart from "~/components/powerTImeInZoneChart";

export async function loader() {
    const hrTimeInZone = await getHrTimeInZone();
    const powerTimeInZone = await getPowerTimeInZone();
    const distance = await getDistance()
    const index = await getIndex()

    return { hrTimeInZone, powerTimeInZone, distance, index };
}

function hrTimeInZoneIcon(iconColor: string) {
    return <ActivityHeartbeat
        size={48}
        strokeWidth={1}
        color={iconColor} />;
}

function powerTimeInZoneIcon(iconColor: string) {
    return <Windmill
        size={48}
        strokeWidth={1}
        color={iconColor} />;
}


function distanceIcon(iconColor: string) {
    return <ArrowsDoubleNeSw
        size={48}
        strokeWidth={1}
        color={iconColor} />;
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
        <ClientOnly fallback={<p>Chargement ...</p>}>
            {() => (
                <div>
                    <Title order={2}>Data charts</Title>
                    <Space h="md" />
                    <Accordion variant="unstyled" multiple={true} defaultValue={['hrTimeInZone']}>
                        <Accordion.Item key="hrTimeInZone" value="hrTimeInZone" >
                            <Accordion.Control icon={hrTimeInZoneIcon(iconColor)}>BPM Zone</Accordion.Control>
                            <Accordion.Panel><HrTimeInZoneChart index={index} hrTimeInZone={hrTimeInZone} /></Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item key="powerTimeInZone" value="powerTimeInZone" >
                            <Accordion.Control icon={powerTimeInZoneIcon(iconColor)}>Power Zone</Accordion.Control>
                            <Accordion.Panel><PowerTimeInZoneChart index={index} powerTimeInZone={powerTimeInZone} /></Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item key="distance" value="distance">
                            <Accordion.Control icon={distanceIcon(iconColor)}>Distance</Accordion.Control>
                            <Accordion.Panel><DistanceChart index={index} distance={distance} /></Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </div>)}
        </ClientOnly>

    );
}


