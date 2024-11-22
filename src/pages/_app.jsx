import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.scss';
import '../styles/VolunteerList.scss';
import '../styles/VolunteerProfile.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
