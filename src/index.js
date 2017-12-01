/* Core */
import React from 'react';
import 'config/ReactotronConfig';

/* Redux */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from 'redux/store';

/* Presentational */
import Main from 'pages/Main';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
);

export default App;
