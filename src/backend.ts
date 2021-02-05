import { BehaviorSubject, of, timer } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { Ticket, User } from './app/store/reducers/state';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

function randomDelay() {
  return Math.random() * 4000;
}

export class BackendService {
  storedTickets = new BehaviorSubject<Ticket[]>([
    {
      id: 0,
      name: 'Install monitor',
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      name: 'Move desk',
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false
    }
  ]);

  storedUsers = new BehaviorSubject<User[]>([{ id: 111, name: 'Victor' }, { id: 222, name: 'John' }]);

  pending$ = new BehaviorSubject<number>(0);

  private lastId = 1;

  private findTicketById = (id: number): Ticket|undefined => {
    return this.storedTickets.value.find(ticket => ticket.id + '' === id + '');
  };

  private findUserById = (id: number) => {
    return this.storedUsers.value.find(user => user.id + '' === id + '');
  }

  tickets() {
    this.pending$.next(this.pending$.value + 1);
    return this.storedTickets.pipe(
      delay(randomDelay()),
      tap(() => this.pending$.next(this.pending$.value - 1))
    );
  }

  ticket(id: number) {
    return of(this.findTicketById(id)).pipe(
      delay(randomDelay())
    );
  }

  users() {
    this.pending$.next(this.pending$.value + 1);
    return this.storedUsers.pipe(
      delay(randomDelay()),
      tap(() => this.pending$.next(this.pending$.value - 1))
    );
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(
      delay(randomDelay())
    );
  }

  newTicket(payload: { name: string, description: string, assigneeId?: number }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: payload.assigneeId || null,
      completed: false,
      name: payload.name
    };

    const tickets = [...this.storedTickets.value];
    tickets.push(newTicket);
    this.pending$.next(this.pending$.value + 1);

    return timer(randomDelay()).pipe(
      tap(() => {
        this.storedTickets.next(tickets);
        this.pending$.next(this.pending$.value - 1);
      }),
      take(1)
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(ticketId);
    const user = this.findUserById(userId);

    if (!foundTicket || !user) {
      throw new Error('ticket or user not found');
    }

    this.pending$.next(this.pending$.value + 1);

    return timer(randomDelay()).pipe(
      tap(() => {
        const tickets = [...this.storedTickets.value];
        tickets[tickets.indexOf(foundTicket)] = {
          ...foundTicket,
          assigneeId: userId
        };
        this.storedTickets.next(tickets);
        this.pending$.next(this.pending$.value - 1);
      }),
      take(1)
    );
  }

  complete(ticketId: number) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      throw new Error('ticket not found');
    }

    this.pending$.next(this.pending$.value + 1);
    return timer(randomDelay()).pipe(
      tap(() => {
        const tickets = [...this.storedTickets.value];
        tickets[tickets.indexOf(foundTicket)] = {
          ...foundTicket,
          completed: true
        };
        this.storedTickets.next(tickets);
        this.pending$.next(this.pending$.value - 1);
        console.log('was here!');

      }),
      take(1)
    );
  }
}
