import { AnyAction } from 'redux';
import { BackendService } from '../../../backend';
import * as actionTypes from '../actions/actionTypes';
import { AppState, initialState as _initialState } from './state';


export default function rootReducer(backend: BackendService) {
  const initialState = {
    ..._initialState,
    backend
  }

  return (state = initialState, action: AnyAction): AppState => {
    switch (action.type) {

      case actionTypes.SET_TICKETS: {
        return {
          ...state,
          tickets: action.tickets || []
        };
      }

      case actionTypes.SET_USERS: {
        return {
          ...state,
          users: action.users || []
        };
      }

      case actionTypes.SET_FILTER: {
        return {
          ...state,
          filterBy: [action.filterBy, action.value]
        };
      }

      case actionTypes.SET_ERROR: {
        return {
          ...state,
          error: action.isError
        };
      }

      case actionTypes.SET_LOADING_STATE: {
        return {
          ...state,
          loading: action.isLoading
        };
      }
  
      default:
        return state;
    }
  }

}
