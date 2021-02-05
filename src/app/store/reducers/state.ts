import { BackendService } from "../../../backend";

export type User = {
  id: number;
  name: string;
};

export enum FILTER_BY {
  STATUS = 'STATUS',
  ASSIGNEE = 'ASSIGNEE'
}

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
  name: string;
};

export interface AppState {
  tickets: Ticket[];
  users: User[];
  backend: BackendService;
  loading: boolean;
  error: boolean;
  filterBy: [FILTER_BY, any];
}

export const initialState: AppState = {
  tickets: [],
  users: [],
  backend: null!,
  loading: false,
  error: false,
  filterBy: [null!, null]
}