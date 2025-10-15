import { Run, ChevronDown } from 'tabler-icons-react';
import { Text, Button, Center, Flex, Group, Menu, Space, ThemeIcon, Title } from '@mantine/core';
import { NavLink } from 'react-router';

let links = [
    {
        link: '/charts',
        label: 'Graphes',
        links: [
            { link: '/charts#hrInTimeZoneChart', label: 'Zone BPM' },
            { link: '/charts#powerrInTimeZoneChart', label: 'Zones de puissance' },
            { link: '/charts#distanceChart', label: 'Distances' },
        ],
    },
    { link: '/weekTypes', label: 'Types de semaine' },
];

export function CustomHeader() {


    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <Button
                            component={NavLink}
                            to={link.link}
                            key={link.label}
                            variant="subtle"
                        >
                            <Center>
                                <span >{link.label}</span>
                                <Space w="xs" />
                                <ChevronDown size={14} />
                            </Center>
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Button
                component={NavLink}
                to={link.link}
                key={link.label}
                variant="subtle"
            >
                {link.label}
            </Button>
        );
    });

    return (
        <header>
            <Flex
                style={{
                    borderBottom: '1px solid #dee2e6'
                }}
                mih={50}
                justify="space-evenly"
                align="end"
                direction="row"
                pl="xl"
                pt="sm">
                <Flex
                    gap="xs"
                    justify="center"
                    align="end"
                    direction="row"
                >
                    <ThemeIcon size="lg" radius="xl" mb="sm">
                        <Run
                            size={48}
                        />
                    </ThemeIcon>
                    <Title mb="xs" order={4}>Jean Cours</Title>
                </Flex>
                <Group gap={5}>
                    {items}
                </Group>
            </Flex>
        </header>
    );
}