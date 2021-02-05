import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import { BackendService } from '../backend';
import { Provider } from 'react-redux';
import { getStore } from './store/store';

test('renders learn react link', () => {
  const backend = new BackendService();

  const { getByText } = render(
    <Provider store={getStore(backend)}>
      <App />
    </Provider>
  );
  const header = getByText(/nrwl demo app/i);
  expect(header).toBeInTheDocument();
});
