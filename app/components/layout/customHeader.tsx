import React from "react";
import styles from "./customHeader.module.css";

import { Burger, Button, Center, Flex, Group, Menu, Space, ThemeIcon, Title, Box, AppShell } from "@mantine/core";
import { NavLink } from "react-router";
import { ChevronDown, Run } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { link: "/", label: "Accueil" },
  {
    link: "/charts",
    label: "Saison",
    /*links: [
      { link: "/charts#hrTimeInZone", label: "Zone BPM" },
      {
        link: "/charts#powerTimeInZone",
        label: "Zones de puissance",
      },
      { link: "/charts#distance", label: "Distances" },
      { link: "/charts#metrics", label: "Métriques" },
      { link: "/charts#training", label: "Effet entraînement" },
      { link: "/charts#feel", label: "Ressenti entraînement" },
    ],*/
  },
  {
    link: "/weekCharts",
    label: "Semaine",
    /*links: [
      { link: "/weekCharts#hrInTimeZoneChart", label: "Zone BPM" },
      {
        link: "/weekCharts#powerInTimeZoneChart",
        label: "Zones de puissance",
      },
      { link: "/weekCharts#distanceChart", label: "Distances" },
      { link: "/weekCharts#metrics", label: "Métriques" },
      { link: "/weekCharts#training", label: "Effet entraînement" },
      { link: "/weekCharts#feel", label: "Ressenti entraînement" },
    ],*/
  },
  { link: "/weekTypes", label: "Types de semaine" },
  { link: "/trainingTypes", label: "Types de scéances" },
];

export function CustomHeader() {
  const [opened, { toggle }] = useDisclosure();
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item className={styles.menuLabel} component={NavLink} to={item.link} key={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Button component={NavLink} to={link.link} key={link.label} variant="subtle">
              <Center>
                <span>{link.label}</span>
                <Space w="xs" />
                <ChevronDown size={14} />
              </Center>
            </Button>
          </Menu.Target>
          <Menu.Dropdown className={styles.menuEntry} bg="var(--mantine-color-body)">
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Button component={NavLink} to={link.link} key={link.label} variant="subtle">
        {link.label}
      </Button>
    );
  });

  return (
    <div>
      <AppShell.Header>
        <Box
          component="header"
          style={{
            borderBottom: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
          }}
          bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
        >
          <Flex
            justify="space-evenly"
            align="end"
            pl="xl"
            pt="sm"
            component="header"
            style={{
              borderBottom: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
            }}
            bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
          >
            <Flex gap="xs" justify="center" align="end" direction="row">
              <ThemeIcon size="lg" radius="xl" mb="sm">
                <Run size={48} />
              </ThemeIcon>
              <Title mb="xs" order={4}>
                Jean Cours
              </Title>
            </Flex>
            <Burger hiddenFrom="md" opened={opened} onClick={toggle} aria-label="Toggle navigation" pb="lg" />
            <Group visibleFrom="md" gap={5}>
              {items}
            </Group>
          </Flex>
        </Box>
      </AppShell.Header>
      {opened && (
        <AppShell.Navbar>
          <Flex component="nav" direction="column" gap={5}>
            {items}
          </Flex>
        </AppShell.Navbar>
      )}
    </div>
  );
}
