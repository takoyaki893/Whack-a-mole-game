import { memo } from "react";
import { StartButtonBody } from "../styles/styledComponents";

const StartButton = memo(({ gameStart }) => {
  return <StartButtonBody onClick={gameStart}>開始</StartButtonBody>;
})

export default StartButton;