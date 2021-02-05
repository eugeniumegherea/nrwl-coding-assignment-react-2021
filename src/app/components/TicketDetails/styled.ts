import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #efefef;
  border-radius: 4px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
`;

export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const Title = styled.div`
  padding: 8px;
  font-size: 18px;
  font-weight: 600;
`;

export const Section = styled.div`
  padding: 12px;
  margin: 8px;
`;

export const SectionItem = styled.div`
  .title {
    font-weight: bold;
  }
`;

