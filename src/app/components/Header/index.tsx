import React, { PureComponent } from 'react';
import { Container, Title } from './styled';

export default class Header extends PureComponent {
  render() {
    return (
      <Container>
        <Title>
          Nrwl Demo app
        </Title>
      </Container>
    )
  }
}
