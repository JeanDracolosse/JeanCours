import { Text, Paper, Title, Space, List } from '@mantine/core';

export default function WeekTypeCard(props: { title: string, content: string[] }) {
    const items = props.content.map((item) => (
        <List.Item>{item}</List.Item>
    ));

    return (
        <Paper p="xl">
            <Title order={3}>{props.title}</Title>
            <Space h="md" />
            <List>
                {items}
            </List>
        </Paper>
    );
}