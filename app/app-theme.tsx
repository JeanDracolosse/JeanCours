import {
  ColorSchemeScript,
  Container,
  createTheme,
  MantineProvider,
  type MantineColorsTuple,
  type MantineProviderProps,
} from "@mantine/core";
import { CustomHeader } from "./components/layout/customHeader";

const myColor: MantineColorsTuple = [
  "#ffe9e9",
  "#ffd3d2",
  "#f7a5a4",
  "#f27b79",
  "#ec4b48",
  "#ea312d",
  "#e9221f",
  "#d01513",
  "#ba0c0f",
  "#a30009"
];

const appTheme = createTheme({
  colors: {
    myColor: myColor,
  },
  primaryColor: "myColor",
  primaryShade: { light: 6, dark: 8 },
  defaultGradient: {
    from: 'orange',
    to: 'white',
    deg: 0,
  }
});


export function AppTheme({ children, ...props }: MantineProviderProps) {
  return <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider theme={appTheme} {...props} defaultColorScheme="auto">
      <CustomHeader />
      <Container size="xl" mt="xl">
        {children}
      </Container>
    </MantineProvider>
  </>
}