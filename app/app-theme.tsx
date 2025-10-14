import {
  ColorSchemeScript,
  Container,
  createTheme,
  MantineProvider,
  Paper,
  type MantineColorsTuple,
  type MantineProviderProps,
} from "@mantine/core";
import { CustomHeader } from "./components/layout/customHeader";

const myColor: MantineColorsTuple = [
  '#ffede5',
  '#ffdace',
  '#ffbda8',
  '#fe8a65',
  '#fe6738',
  '#fe511b',
  '#fe460b',
  '#e33700',
  '#cb2f00',
  '#b12400'
];

const appTheme = createTheme({
  colors: {
    myColor: myColor,
  },
  primaryColor: "myColor"
});


export function AppTheme({ children, ...props }: MantineProviderProps) {
  return <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider theme={appTheme} {...props} defaultColorScheme="auto">
      <Container fluid>
        <CustomHeader />
        <Paper
          p="xl">
          {children}
        </Paper>
      </Container>
    </MantineProvider>
  </>
}