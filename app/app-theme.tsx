import {
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  Paper,
  type MantineProviderProps,
} from "@mantine/core";
import { CustomHeader } from "./components/layout/customHeader";

export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: "brand",
})

export function AppTheme({ children, theme = appTheme, ...props }: MantineProviderProps) {
  return <MantineProvider theme={theme} {...props}>
    <CustomHeader />
    <Paper
      p="xl">
      {children}
    </Paper>
  </MantineProvider>
}