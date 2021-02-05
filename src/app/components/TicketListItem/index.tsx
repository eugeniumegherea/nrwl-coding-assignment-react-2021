import React, { PureComponent } from 'react'
import { Ticket } from '../../store/reducers/state'
import { Container, Grow, TicketNumber } from './styled'

type ListTicket = Ticket & {
  username: string;
}

interface TicketListItemProps {
  ticket: ListTicket;
  onClick(): void;
}

export default class TicketListItem extends PureComponent<TicketListItemProps> {

  render() {
    return (
      <Container onClick={this.props.onClick} bgColor={this.getStatusColor()}>
        <TicketNumber>NRWL-{this.props.ticket.id}</TicketNumber>
        <div>{this.props.ticket.name}</div>
        <Grow/>
        <div>{this.props.ticket.username}</div>
      </Container>
    )
  }

  private getStatusColor() {
    return this.props.ticket.completed ? '#c8e6c9' : '#ef9a9a';
  }

}

