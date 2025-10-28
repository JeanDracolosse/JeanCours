import React from "react";
import {
  ColorSchemeScript,
  Container,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
  AppShell,
  type MantineProviderProps,
} from "@mantine/core";
import { CustomHeader } from "./components/layout/customHeader";

import { generateColors } from "@mantine/colors-generator";

const appTheme = createTheme({
  colors: {
    primaryColor: generateColors("#3bceac"),
    chart1Color: generateColors("#0ead69"),
    chart2Color: generateColors("#3bceac"),
    chart3Color: generateColors("#ffd23f"),
    chart4Color: generateColors("#ee4266"),
    chart5Color: generateColors("#540d6e"),
  },
  primaryColor: "primaryColor",
  primaryShade: { light: 6, dark: 8 },
});

const theme = mergeMantineTheme(DEFAULT_THEME, appTheme);

export function AppTheme({ children, ...props }: MantineProviderProps) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} {...props} defaultColorScheme="auto">
        <AppShell padding="md" header={{ height: 60 }}>
          <AppShell.Header>
            <CustomHeader />
          </AppShell.Header>
          <AppShell.Main>
            <Container p="0">{children}</Container>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}
