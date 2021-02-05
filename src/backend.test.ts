import { BackendService } from './backend';

test('backend should return nothing on missing ticket', () => {
  const backend = new BackendService();

  expect(backend.ticket(Math.random()).toPromise()).resolves.toBeFalsy();
});

test('backend should create new ticket', async () => {
  const backend = new BackendService();

  await backend.newTicket({
    name: 'test',
    description: 'test description',
  }).toPromise();

  const foundTicket = backend.storedTickets.value.find(t => t.name === 'test');

  expect(foundTicket).toHaveProperty('name', 'test');
});
