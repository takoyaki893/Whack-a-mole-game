import { StopButtonContainer } from '../styles/styledComponents';

const StopButton = ({ gameStop }) => {
  return <StopButtonContainer onClick={gameStop}>reset</StopButtonContainer>;
}

export default StopButton;