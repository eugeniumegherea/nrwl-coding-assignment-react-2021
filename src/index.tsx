import React from 'react';
import ReactDOM from 'react-dom';
import { BackendService } from './backend';
import App from './app/app';
import { Provider } from 'react-redux';
import { getStore } from './app/store/store';
import './index.css';


const backend = new BackendService();

ReactDOM.render(
  <Provider store={getStore(backend)}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
