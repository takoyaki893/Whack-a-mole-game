import styled, { keyframes } from 'styled-components';

export const GridContainer = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 100px 500px 100px;
  grid-template-columns: 2fr 1fr;
`;

export const HoleGridWrapper = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  background-color: green;
  padding: 20px;
`;
  
export const HoleGridContents = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10%;
  width: 500px;
  height: 500px;
`;


export const ButtonWrapper = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  margin-top: 10px;
  `;

export const DisplayWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  `

export const DisplayOutlet = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 3fr 1fr;
  `

export const ScoreDisplay = styled.div`
  font-size: 30px;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  `

export const HitCountDisplay = styled.div`
  font-size: 30px;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  `

export const TimeLimitDisplay = styled.div`
  font-size: 80px;
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  margin-left: auto;
  margin-right: 0px;
  `

export const StartButtonBody = styled.button`
  width: 50%;
  padding: 20px 0;
  font-size: 2em;
  `

export const StopButtonBody = styled.button`
  width: 50%;
  padding: 20px 0;
  font-size: 2em; 
  `

export const HoleContainer = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 70%;
  background: #CC9966;
`;

export const MoleImage = styled.img`
  width: 70%;
  padding-left: 10%;
  visibility: hidden;
`;
