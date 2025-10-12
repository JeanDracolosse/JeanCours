import {
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  Paper,
  type MantineProviderProps,
} from "@mantine/core";

export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: "brand",
})

export function AppTheme({ children, theme = appTheme, ...props }: MantineProviderProps) {
  return <MantineProvider theme={theme} {...props}>
    <Paper p="xl">
      <Paper p="xl" shadow="xs">
        {children}
      </Paper>
    </Paper>
  </MantineProvider>
}