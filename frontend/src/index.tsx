import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';

import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import apolloClient from './apollo-client';
import theme from './theme';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
