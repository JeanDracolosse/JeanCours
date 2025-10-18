import React from 'react';
import {
  Box,
  ColorSchemeScript,
  Container,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
  type MantineProviderProps,
} from '@mantine/core';
import { CustomHeader } from './components/layout/customHeader';

import { generateColors } from '@mantine/colors-generator';

const appTheme = createTheme({
  colors: {
    primaryColor: generateColors('#ff715b'),
    secondaryColor: generateColors('#4c5454'),
  },
  primaryColor: 'primaryColor',
  primaryShade: { light: 6, dark: 8 },
  defaultGradient: {
    from: 'orange',
    to: 'white',
    deg: 0,
  },
  /*fontFamily: 'Roboto',
  headings: {
    fontFamily: 'Roboto',
  }*/
});

const theme = mergeMantineTheme(DEFAULT_THEME, appTheme);

export function AppTheme({ children, ...props }: MantineProviderProps) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} {...props} defaultColorScheme="auto">
        <Box>
          <CustomHeader />
          <Container size="xl" mt="xl">
            {children}
          </Container>
        </Box>
      </MantineProvider>
    </>
  );
}
