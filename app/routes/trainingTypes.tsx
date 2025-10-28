import React from "react";
import { Stack, Space, Title, Text, Box } from "@mantine/core";
import WeekTypeCard from "../components/cards/WeekTypeCard";
import { CellSignal2, CellSignal3, CellSignal5, Gauge } from "tabler-icons-react";

export default function TrainingTypes() {
  return (
    <Box>
      <Title order={1}>
        Exemples de types de{" "}
        <Text span c="primaryColor" inherit>
          scéances
        </Text>
      </Title>

      <Text c="dimmed" mt="md">
        Plus jamais je n'aurai peur de m'ennuyer lors d'une sortie
      </Text>
      <Text mt="md">Juste une petite liste de type de scéances, toujours dans l'objectif d'amélioration continue.</Text>

      <Space h="xl" />
      <Stack gap="xl">
        <WeekTypeCard
          title="Scéance TIR"
          subTitle="Threshold, Intervalle, Repetition"
          order="row"
          photo="/photos/others/3.jpg"
          content={[
            {
              title: "Threshold",
              text: "15 minutes à l'intensité T (ex: 3 x 5 min T, 1 min réc)",
              icon: <CellSignal2 />,
            },
            { title: "Intervalle", text: "10 min allure I (ex: 2 x 5 min I, 2 min réc)", icon: <CellSignal3 /> },
            {
              title: "Repetition",
              text: "5 min R (ex: 5 x 1 min R, 1 min réc, ou 5 x 400m R, 400m réc, ou 10 x 200m R, 200m réc)",
              icon: <CellSignal5 />,
            },
            { title: "VDOT (50)", text: "T: 4:15/km, I: 3:55/km, R: 3:35/km", icon: <Gauge /> },
          ]}
        />
      </Stack>
    </Box>
  );
}
