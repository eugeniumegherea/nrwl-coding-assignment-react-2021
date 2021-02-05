import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: #eceff1;
  color: black;
  z-index: 1;
  opacity: 0.8;
`;

export default class Loader extends PureComponent {
  render() {
    return (
      <Container>
        Loading...
      </Container>
    )
  }
}
