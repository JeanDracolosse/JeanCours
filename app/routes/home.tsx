
import { useLoaderData } from "react-router";

import { ClientOnly } from 'remix-utils/client-only';
import HrTimeInZoneChart from "~/components/hrTImeInZoneChart";
import DistanceChart from "~/components/distanceChart";
import type { HrInTimeZoneType, DistanceType } from "~/interfaces";
import { getHrTimeInZone, getDistance, getIndex } from "~/utils/mongo";
import { Accordion, Space, Title } from '@mantine/core';
import { ActivityHeartbeat, ArrowsDoubleNeSw } from 'tabler-icons-react';
import WeekTypeCard from "../components/cards/WeekTypeCard";

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

export default function Home() {
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
          <Space h="md" />
          <Title order={2}>Types de semaine</Title>
          <Space h="md" />
          <WeekTypeCard
            title="Base"
            content={["Que du Z1, essayer de limiter Z2 à 15%", "2 séances de sprints en côte/foulées bondissantes", "1 séance Z3 de 5 à 10%, puis Z4 à partir de 5% quand possible (petite, et si envie)", "Weekend: sortie longue de 30 à 40% du volume"]}
          />
          <WeekTypeCard
            title="Intensive"
            content={["Séances Z3 de 5 à 10%, puis Z4 à partir de 5% quand possible", "2 séances de sprints en côte/foulées bondissantes", "Weekend: sortie longue de 30 à 40% du volume"]}
          />
          <WeekTypeCard
            title="Récupération"
            content={["50% du volume de la semaine précédente", "Essayer de limiter Z2 à 15%", "1 séance de sprints en côte/foulées bondissantes, moitié plus petite", "Que du Z1, essayer de limiter Z2 à 15%", "1 sortie mi-longue de 20% du volume", "Weekend: sortie longue de 30 à 40% du volume"]}
          />
          <WeekTypeCard
            title="Spécifique"
            content={["Essayer de limiter Z2 à 15%", "1 séance de sprints en côte/foulées bondissantes", "Séances Z4 de 5 à 10%", "Weekend: 2 sorties longues pour arriver entre 60 à 80% du volume"]}
          />
        </div>)}
    </ClientOnly>

  );
}


