import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    createRoot(document.getElementById('root')).render(<NextRoot />);
  });
}
