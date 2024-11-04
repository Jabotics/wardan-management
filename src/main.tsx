import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

import { Provider } from 'react-redux'
import {
  // persistor,
  store,
} from './store'
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
)
