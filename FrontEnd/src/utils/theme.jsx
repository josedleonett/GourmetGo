import "@fontsource/josefin-sans";
import { createTheme } from "@mui/material";

export const companyLogo = {
  primaryColor: "/images/logo/GG_LOGO_AZUL.png",
  secondaryColor: "/images/logo/GG_LOGO_ROSA.png",
  grayColor: "/images/logo/GG_LOGO_GRIS.png",
  positiveColor: "/images/logo/GG_LOGO_POSITIVO.png",
  negativeColor: "/images/logo/GG_LOGO_NEGATIVO.png",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#274556",
      light: "#688B9A",
      dark: "#001B30",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F76C6F",
      light: "#E2D6D6",
      dark: "#C63B3E",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF0000",
      light: "#FF7E7E",
      dark: "#BD0000",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFC107",
      light: "#FFE04D",
      dark: "#C79100",
      contrastText: "#000000",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#F5F5F5",
      100: "#EEEEEE",
      200: "#E0E0E0",
      300: "#BDBDBD",
      400: "#9E9E9E",
      500: "#757575",
      600: "#616161",
      700: "#424242",
      800: "#212121",
      900: "#000000",
      A100: "#D5D5D5",
      A200: "#AAAAAA",
      A400: "#303030",
      A700: "#616161",
    },
    contrastThreshold: 3,
    text: {
      primary: "#222222",
      secondary: "#757575",
      disabled: "#BDBDBD",
    },
    divider: "#BDBDBD",
    background: {
      paper: "#FFFFFF",
      default: "#F8F2F2",
    },
    action: {
      active: "#274556",
      hover: "#688B9A",
      selected: "#EEEEEE",
      disabled: "#BDBDBD",
      focus: "#222222",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Josefin Sans','Roboto'",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});