import { BackendService } from '../../../backend';
import { setError } from '../actions';
import * as actionTypes from '../actions/actionTypes';
import reducer from './index';

test('reducer should change error state', async () => {


  expect(reducer(new BackendService())(undefined, setError(true))).toHaveProperty('error', true);
});

