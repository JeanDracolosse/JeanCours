import React from "react";
import { Stack, Space, Title, Text, Container } from "@mantine/core";
import WeekTypeCard from "../components/cards/WeekTypeCard";
import { MoodSmile, Clock, ChartBar, MoodSadDizzy, MoodSadSquint } from "tabler-icons-react";

export default function WeekTypes() {
  return (
    <Container>
      <Title order={1}>
        Description succinte de mon{" "}
        <Text span c="primaryColor" inherit>
          entraînement
        </Text>
      </Title>

      <Text c="dimmed" mt="md">
        Je perds trop de temps à feuilleter mes bouquins ... 
      </Text>
      <Text mt="md">
       Je vais essayer de compiler petit à petit les ressources que je peux trouver dans des livres et des sites. L'objectif n'est pas de fabriquer l'entraînement parfait, mais celui qui m'irait le mieux.
      </Text>

      <Space h="xl" />
      <Stack gap="xl">

        <WeekTypeCard
          title="Base"
          subTitle="augmentation de volume, sans prise de risque"
          order="row"
          photo="/photos/others/4.jpg"
          content={[
            { title: "Zones", text: "Que du Z1, essayer de limiter Z2 à 15%", icon: <ChartBar /> },
            { title: "Anaérobie", text: "2 séances de sprints en côte/foulées bondissantes", icon: <MoodSadDizzy /> },
            {
              title: "Aérobie",
              text: "1 séance Z3 de 5 à 10%, puis Z4 à partir de 5% quand possible (petite, et si envie)",
              icon: <MoodSadSquint />,
            },
            { title: "Sortie longue", text: "Weekend: sortie longue de 30 à 40% du volume", icon: <Clock /> },
          ]}
        />
        <WeekTypeCard
          title="Intensive"
          subTitle="travail sur les zones 4 et 5"
          order="row-reverse"
          photo="/photos/others/3.jpg"
          content={[
            { title: "Zones", text: "Séances Z3 de 5 à 10%, puis Z4 à partir de 5% quand possible", icon: <ChartBar /> },
            { title: "Anaérobie", text: "2 séances de sprints en côte/foulées bondissantes", icon: <MoodSadDizzy /> },
            { title: "Sortie longue", text: "Weekend: sortie longue de 30 à 40% du volume", icon: <Clock /> },
          ]}
        />
        <WeekTypeCard
          title="Récupération"
          subTitle="remise en forme en vue, ou après, une grosse semaine"
          order="row"
          photo="/photos/others/2.jpg"
          content={[
            { title: "Volume", text: "50% du volume de la semaine précédente", icon: <MoodSmile /> },
            { title: "Zones", text: "Que du Z1, essayer de limiter Z2 à 15%", icon: <ChartBar /> },
            {
              title: "Anaérobie",
              text: "1 séance de sprints en côte/foulées bondissantes, moitié plus petite",
              icon: <MoodSadDizzy />,
            },
            {
              title: "Sortie longue",
              text: "1 sortie mi-longue de 20% du volume, le weekend: sortie longue de 30 à 40% du volume",
              icon: <Clock />,
            },
          ]}
        />
        <WeekTypeCard
          title="Spécifique"
          subTitle="travail sur les courses longues"
          order="row-reverse"
          photo="/photos/others/1.jpg"
          content={[
            { title: "Zones", text: "Essayer de limiter Z2 à 15%", icon: <ChartBar /> },
            { title: "Anaérobie", text: "1 séance de sprints en côte/foulées bondissantes", icon: <MoodSadDizzy /> },
            { title: "Aérobie", text: "Séances Z4 de 5 à 10%", icon: <MoodSadSquint /> },
            {
              title: "Sorties longues",
              text: "Weekend: 2 sorties longues pour arriver entre 60 à 80% du volume",
              icon: <Clock />,
            },
          ]}
        />
      </Stack>
    </Container>
  );
}
