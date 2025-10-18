import React from "react";
import { List, Paper, Space, Title } from "@mantine/core";

export default function WeekTypeCard(props: { title: string; content: string[] }) {
  const items = props.content.map((item) => <List.Item key={item}>{item}</List.Item>);

  return (
    <Paper p="xl">
      <Title order={5}>{props.title}</Title>
      <Space h="md" />
      <List>{items}</List>
    </Paper>
  );
}
