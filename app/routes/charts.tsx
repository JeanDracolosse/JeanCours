
import { useLoaderData } from "react-router";

import { ClientOnly } from 'remix-utils/client-only';
import HrTimeInZoneChart from "~/components/hrTImeInZoneChart";
import DistanceChart from "~/components/distanceChart";
import type { HrInTimeZoneType, DistanceType } from "~/interfaces";
import { getHrTimeInZone, getDistance, getIndex } from "~/utils/mongo";
import { Accordion, Space, Title } from '@mantine/core';
import { ActivityHeartbeat, ArrowsDoubleNeSw } from 'tabler-icons-react';

export async function loader() {
    const hrTimeInZone = await getHrTimeInZone();
    const distance = await getDistance()
    const index = await getIndex()

    return { hrTimeInZone, distance, index };
}

function hrTimeInZoneIcon() {
    return <ActivityHeartbeat
        size={48}
        strokeWidth={1}
        color={'black'} />;
}

function distanceIcon() {
    return <ArrowsDoubleNeSw
        size={48}
        strokeWidth={1}
        color={'black'} />;
}

export default function Charts() {
    const { hrTimeInZone, distance, index } = useLoaderData() as {
        hrTimeInZone: HrInTimeZoneType;
        distance: DistanceType;
        index: string[];
    }

    return (
        <ClientOnly fallback={<p>Chargement ...</p>}>
            {() => (
                <div>
                    <Title order={2}>Data charts</Title>
                    <Space h="md" />
                    <Accordion multiple={true} >
                        <Accordion.Item key="hrTimeInZone" value="hrTimeInZone" >
                            <Accordion.Control icon={hrTimeInZoneIcon()}>BPM Zone</Accordion.Control>
                            <Accordion.Panel><HrTimeInZoneChart index={index} hrTimeInZone={hrTimeInZone} /></Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item key="distance" value="distance">
                            <Accordion.Control icon={distanceIcon()}>Distance</Accordion.Control>
                            <Accordion.Panel><DistanceChart index={index} distance={distance} /></Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </div>)}
        </ClientOnly>

    );
}


