import React, { PureComponent } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import Filters from '../Filters';
import Form from '../Form';
import Header from '../Header';
import styled from 'styled-components';

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`;


type MainProps = RouteComponentProps & {
  routes: any[];
};

export default class Main extends PureComponent<MainProps> {

  render() {
    return (
      <div>
        <Header/>

        <Container>
          <Filters/>
          <Form/>
          <div>
            <Switch>
              {
                this.props.routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route}/>
                ))
              }

              <Redirect to="/browse" />
            </Switch>
          </div>
        </Container>
      </div>
    )
  }
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}