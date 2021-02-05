import React, { Dispatch, PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { AnyAction } from 'redux';
import { AppState } from '../../store/reducers/state';
import { getFilteredTickets } from '../../store/utils';
import Loader from '../Loader';
import TicketDetails from '../TicketDetails';
import TicketListItem from '../TicketListItem';
import { Container, LeftSide, RightSide } from './styled';

type TicketListProps = RouteComponentProps & {

};

class TicketList extends PureComponent<PrivateTicketListProps> {

  render() {
    const { path } = this.props.match;

    return (
      <Container>
        <LeftSide>
          {
            this.props.loading && <Loader/>
          }

          {
            this.props.tickets.length === 0 && <h3>No tickets yet. Create one!</h3>
          }
          {
            this.props.tickets.map((ticket) => {
              return (
                <Link to={`${path}/${ticket.id}`} key={ticket.id}>
                  <TicketListItem
                    onClick={() => null}
                    ticket={{
                      ...ticket,
                      username: this.props.usernames[ticket.assigneeId!]
                    }}
                  />
                </Link>
              );
            })
          }
        </LeftSide>

        <Route
          path={`${this.props.match.path}/:id`}
          render={props => {
            return (
              <RightSide>
                {
                  this.props.loading && <Loader/>
                }
                <TicketDetails {...props}/>
              </RightSide>
            )
          }}
        />
      </Container>
    )
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.loading,
    backend: state.backend,
    tickets: getFilteredTickets(state.tickets, state.filterBy),
    usernames: state.users.reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {} as {[key: number]: string})
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch: dispatch
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PrivateTicketListProps = ConnectedProps<typeof connector> & TicketListProps;

export default connector(TicketList);
