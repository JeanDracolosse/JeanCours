import { Paper, Title, Space, List } from '@mantine/core';
import React from "react";

export default function WeekTypeCard(props: { title: string, content: string[] }) {
    const items = props.content.map((item) => (
        <List.Item key={item}>{item}</List.Item>
    ));

    return (
        <Paper p="xl">
            <Title order={5}>{props.title}</Title>
            <Space h="md" />
            <List>
                {items}
            </List>
        </Paper>
    );
}