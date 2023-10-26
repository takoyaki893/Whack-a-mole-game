import { StartButtonContainer } from '../styles/styledComponents';

const StartButton = ({ gameStart }) => {
  return <StartButtonContainer onClick={gameStart}>start</StartButtonContainer>;
}

export default StartButton;