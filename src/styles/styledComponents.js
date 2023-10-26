import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10%;
    width: 500px;
    height: 500px;
    margin: 0 auto;
`;

export const HoleContainer = styled.div`
    background: ${({$mole}) => $mole ? 'red': 'blue'};
`;

export const StartButtonContainer = styled.button`
  width: 100px;
  height: 50px;
  margin-right: 20px;
`;

export const StopButtonContainer = styled.button`
  width: 100px;
  height: 50px;
  margin-left: 20px;
`;

export const DisplayContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;