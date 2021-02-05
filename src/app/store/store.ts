import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers';
import { AppState } from './reducers/state';
import { BackendService } from '../../backend';

let store: Store;


function initStore(backend: BackendService) {

  const middlewares = [];

  if (process.env.NODE_ENV === `development`) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
  }

  const store = createStore(rootReducer(backend), applyMiddleware(...middlewares));

  return store;
}

export function getStore(backend?: BackendService) {
  if (!store) {
    store = initStore(backend!);
  }

  return store;
}

export function getState(): AppState {
  return getStore().getState();
}