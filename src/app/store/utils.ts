import { FILTER_BY, Ticket } from './reducers/state';


export function getFilteredTickets(tickets: Ticket[], _filterBy: [FILTER_BY, any]) {
  const [filterBy, value] = _filterBy || [];
  if (!filterBy) {
    return tickets;
  }

  switch (filterBy) {
    case FILTER_BY.STATUS:
      return tickets.filter(t => t.completed === value);
    case FILTER_BY.ASSIGNEE:
      return tickets.filter(t => t.assigneeId + '' === value + '')

    default:
      return tickets;
  }
}