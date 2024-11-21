import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.scss';
import '../styles/VolunteerList.scss';
import '../styles/VolunteerProfile.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
