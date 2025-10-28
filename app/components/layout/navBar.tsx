import React from "react";
import { AppShell, Flex, Space, UnstyledButton, Text } from "@mantine/core";
import { defaultNavbarContent } from "~/utils/charts";
import { NavLink } from "react-router";

export function NavBar() {
  const links = defaultNavbarContent().map((link) => (
    <UnstyledButton key={link.link} component={NavLink} viewTransition to={{ hash: link.link }} pl="md" pr="md">
      <Flex gap="xs" align="center">
        {link.icon("var(--mantine-color-primaryColor-6)", 25)}
        <Text truncate="end" lineClamp={1} visibleFrom="lg" size="sm">
          {link.label}
        </Text>
      </Flex>
    </UnstyledButton>
  ));

  return (
    <AppShell.Navbar visibleFrom="md">
      <Flex
        component="nav"
        style={{
          height: "100%",
          borderRight: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
          borderLeft: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
        }}
        justify="flex-start"
        align={{ base: "center", lg: "flex-start" }}
        direction="column"
        wrap="nowrap"
        gap="xs"
        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
      >
        <Space h="xl" />
        {links}
      </Flex>
    </AppShell.Navbar>
  );
}
