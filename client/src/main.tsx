import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from '@redux';
import { ThemeProvider } from '@context';
import { AppRouter } from '@router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <ThemeProvider>
          <RouterProvider router={AppRouter} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    ,
  </React.StrictMode>,
);
