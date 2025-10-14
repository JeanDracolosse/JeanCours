import { Run } from 'tabler-icons-react';
import { useState } from 'react';
import { Flex, Group } from '@mantine/core';
import { Link } from 'react-router';


const links = [
    { link: '/', label: 'Home' },
    { link: '/charts', label: 'Charts' },
    { link: '/weekTypes', label: 'Week Types' },
];

export function CustomHeader() {
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <Link
            to={link.link}
            key={link.label}
            data-active={active === link.link || undefined} // TODO
            onClick={() => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <header>
            <Flex mih={50}
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
                    color={'black'} />
                <Group gap={5}>
                    {items}
                </Group>
            </Flex>
        </header>
    );
}