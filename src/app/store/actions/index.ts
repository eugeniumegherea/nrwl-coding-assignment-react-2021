import { FILTER_BY, Ticket, User } from '../reducers/state';
import * as actions from './actionTypes';

export function setTickets(tickets: Ticket[]) {
  return {
    type: actions.SET_TICKETS,
    tickets
  };
}

export function setUsers(users: User[]) {
  return {
    type: actions.SET_USERS,
    users
  };
}

export function setLoadingState(isLoading: boolean) {
  return {
    type: actions.SET_LOADING_STATE,
    isLoading
  };
}

export function setError(isError: boolean) {
  return {
    type: actions.SET_ERROR,
    isError
  };
}

export function setFilter(filterBy: FILTER_BY, value: any) {
  return {
    type: actions.SET_FILTER,
    filterBy,
    value
  };
}
