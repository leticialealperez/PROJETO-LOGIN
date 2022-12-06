import React from 'react';
import { AppRoutes } from './AppRoutes';
import { GlobalStyle } from './config';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;
