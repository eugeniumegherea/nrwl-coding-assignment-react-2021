import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 500px;
  position: relative;
`;

export const LeftSide = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const RightSide = styled.div`
  min-width: 60%;
  flex-grow: 1;
  position: relative;
  padding: 0 8px;
`;