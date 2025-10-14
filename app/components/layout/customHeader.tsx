import { Run } from 'tabler-icons-react';
import { useState } from 'react';
import { Button, Flex, Group, useMantineTheme } from '@mantine/core';
import { NavLink } from 'react-router';

const links = [
    { link: '/', label: 'Home' },
    { link: '/charts', label: 'Charts' },
    { link: '/weekTypes', label: 'Week Types' },
];

export function CustomHeader() {

    const theme = useMantineTheme();
    const iconColor = theme.colors[theme.primaryColor][6];

    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <NavLink
            to={link.link}
            key={link.label}
            onClick={() => {
                setActive(link.link);
            }}
        >
            <Button variant={active === link.link ? "filled" : "subtle"}>{link.label}</Button>
        </NavLink>
    ));

    return (
        <header>
            <Flex
                style={{
                    borderBottom: '1px solid #dee2e6'
                }}
                mih={50}
                gap="xl"
                justify="flex-start"
                align="center"
                direction="row"
                pl="xl"
                pt="sm"
                pb="sm">
                <Run
                    size={48}
                    strokeWidth={1}
                    color={iconColor}
                />
                <Group gap={5}>
                    {items}
                </Group>
            </Flex>
        </header>
    );
}