import React, { Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { routes } from './routes';
import { setLoadingState, setTickets, setUsers } from './store/actions';
import { AppState } from './store/reducers/state';
import { RouteWithSubRoutes } from './utils/nested-route';

interface AppProps {

}

class App extends React.PureComponent<PrivateAppProps> {
  private destroy$ = new Subject();

  async componentDidMount() {
    this.props.backend.storedTickets.pipe(
      takeUntil(this.destroy$)
    ).subscribe((tickets) => {
      this.props.dispatch(setTickets(tickets));
    });

    this.props.backend.storedUsers.pipe(
      takeUntil(this.destroy$)
    ).subscribe((users) => {
      this.props.dispatch(setUsers(users));
    });

    this.props.backend.pending$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((pendingRequests) => {
      this.props.dispatch(setLoadingState(pendingRequests > 0));
    });
  }

  componentWillUnmount() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {
              routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = (state: AppState) => {
  return {
    backend: state.backend
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch: dispatch
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PrivateAppProps = ConnectedProps<typeof connector> & AppProps;

export default connector(App);

