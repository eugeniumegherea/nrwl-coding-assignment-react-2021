import Main from './components/Main';
import TicketList from './components/TicketList';



export const routes = [
  {
    path: '/',
    component: Main,
    routes: [
      {
        path: '/browse',
        component: TicketList
      }
    ]
  }
];