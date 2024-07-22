import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#80deea',
      main: '#0097a7',
      dark: '#006064',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#eeeeee',
      main: '#bdbdbd',
      dark: '#616161',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;