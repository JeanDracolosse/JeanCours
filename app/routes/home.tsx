import { Shoe } from "tabler-icons-react";
import { Container, Flex, Image, List, Text, ThemeIcon, Title } from "@mantine/core";
import home from "../../public/home.jpg";
export default function Home() {
  return (
    <Flex>
      <Container>
        <Title order={1}>
          L'incroyable{" "}
          <Text span c="primaryColor" inherit>
            Jean Cours
          </Text>
          ,
        </Title>
        <Title order={2}>ou l'histoire de mon alternative nulle à Strava</Title>
        <Text c="dimmed" mt="md">
          Tout est parti d'une simple interdiction d'accéder à mon Drive depuis mon lieu de travail ...
        </Text>
        <Text mt="md">
          Le site est fait pour que je puisse suivre au jour le jour mon entraînement de course à pied et planifier mes sorties. Et
          si je me sens l'âme d'un data analysist, pourquoi pas aussi exploiter un peu ces données.
        </Text>
        <Text mt="md">On y trouve les sections suivantes:</Text>
        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <Shoe size={12} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>Saison</b> – pour suivre la saison en cours
          </List.Item>
          <List.Item>
            <b>Semaine</b> – pour suivre la semaine en cours, et chaque entraînement
          </List.Item>
          <List.Item>
            <b>Type de semaine</b> – section amenée à être améliorée, qui décrira mon plan d'entraînement
          </List.Item>
        </List>
      </Container>
      <Image src={home} radius="md" visibleFrom="md" />
    </Flex>
  );
}
