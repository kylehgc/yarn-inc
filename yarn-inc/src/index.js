import { ColorModeScript } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import '@fontsource/expletus-sans/'
import '@fontsource/hind/'
import '@fontsource/ibm-plex-sans/'
import '@fontsource/ibm-plex-serif'
import '@fontsource/red-hat-display'
import '@fontsource/fraunces'
import '@fontsource/commissioner'
import '@fontsource/libre-baskerville'
import '@fontsource/roboto'
import '@fontsource/libre-franklin'
import '@fontsource/poppins'
import '@fontsource/fraunces'
import '@fontsource/lexend-deca'
import '@fontsource/firago'

ReactDOM.render(
  <Fragment>
    <App />
  </Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
