import React from "react";
import { Card, Flex, Container, Title, Image, Divider, Box, ThemeIcon, Text } from "@mantine/core";

export default function WeekTypeCard(props: {
  title: string;
  subTitle: string;
  order: string;
  photo: string;
  content: { title: string; text: string; icon: JSX.Element }[];
}) {
  const items = props.content.map((item) => (
    <Flex gap="md" direction="row" key={item.title}>
      <ThemeIcon variant="light" size={50} radius="md">
        {item.icon}
      </ThemeIcon>
      <div>
        <Text fw={700} fz="lg">
          {item.title}
        </Text>
        <Text c="dimmed">{item.text}</Text>
      </div>
    </Flex>
  ));

  return (
    <Card withBorder radius="md" p={0}>
      <Flex direction={props.order} wrap="nowrap" justify="flex-start" align="flex-start">
        <Box w="100%">
          <Container>
            <Title order={3}>
              {props.title}{" "}
              <Text span c="dimmed">
                {props.subTitle}
              </Text>
            </Title>
          </Container>
          <Divider />
          <Flex gap="sm" direction="column" m="md">
            {items}
          </Flex>
        </Box>
        <Image maw="30%" src={props.photo} visibleFrom="md" />
      </Flex>
    </Card>
  );
}
