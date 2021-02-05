import React, { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import { AppState } from '../../store/reducers/state';
import { getFilteredTickets } from '../../store/utils';
import { Close, Container, Section, SectionItem, Title } from './styled'

type TicketDetailsProps = RouteComponentProps & {

};


class TicketDetails extends PureComponent<PrivateTicketListProps> {

  render() {
    if (!this.props.ticket) {
      return 'Ticket not found!';
    }

    return (
      <Container>
        <Close onClick={() => this.navigateToList()}>X</Close>
        <Title>{this.props.ticket.name}</Title>

        <Section>
          <SectionItem>
            <div className="title">Status</div>
            {this.props.ticket.completed ? 'Complete' : 'To Do'}
          </SectionItem>
          <SectionItem>
            <div className="title">Assignee</div>
            {this.props.usernames[this.props.ticket.assigneeId!] || 'Not assigned'}
          </SectionItem>
          <SectionItem>
            <div className="title">Description</div>
            {this.props.ticket.description}
          </SectionItem>
        </Section>

        <Section>
          {
            !this.props.ticket.completed && (
              <SectionItem>
                <div className="title">Change assignment</div>
                <select
                  disabled={this.props.loading}
                  onChange={(ev) => this.props.backend.assign(this.props.ticket!.id, parseInt(ev.target.value, 10)).subscribe()}
                  value={this.props.ticket.assigneeId || '-'}
                >
                  <option value="-" disabled>Unassigned</option>
                  {
                    this.props.users.map((user: any) => {
                      return (
                        <option key={user.id + user.name} value={user.id}>{user.name}</option>
                      );
                    })
                  }
                </select>
              </SectionItem>
            )
          }
          {
            !this.props.ticket.completed && (
              <SectionItem>
                <div className="title">Complete ticket</div>
                <button
                  disabled={this.props.loading}
                  onClick={() => this.props.backend.complete(this.props.ticket!.id).subscribe()}
                >Complete</button>
              </SectionItem>
            )
          }
        </Section>
      </Container>
    )
  }

  private navigateToList() {
    this.props.history.push('/browse');
  }

}

const mapStateToProps = (state: AppState, props: TicketDetailsProps) => {
  return {
    loading: state.loading,
    backend: state.backend,
    ticket: getFilteredTickets(state.tickets, state.filterBy).find(t => t.id + '' === (props.match.params as any).id + ''),
    usernames: state.users.reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {} as {[key: number]: string}),
    users: state.users
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch: dispatch
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PrivateTicketListProps = ConnectedProps<typeof connector> & TicketDetailsProps;

export default connector(TicketDetails);
