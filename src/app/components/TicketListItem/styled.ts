import styled from 'styled-components';

export const Container = styled.div<{ bgColor: string; }>`
  border: 1px solid #c1c7d0;
  color: #172b4d;
  cursor: pointer;
  display: flex;
  background: ${props => props.bgColor};
  margin: 2px 0;
  padding: 4px;
`;

export const Grow = styled.span`
  flex-grow: 1;
`

export const TicketNumber = styled.div`
  color: #0052cc;
  margin-right: 8px;
`;