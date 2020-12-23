import React from 'react';
import { unstable_createRoot } from 'react-dom';
import App from './App';

unstable_createRoot(document.getElementById('root')).render(<App />);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    unstable_createRoot(document.getElementById('root')).render(<NextRoot />);
  });
}
