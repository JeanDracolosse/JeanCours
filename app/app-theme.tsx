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