import { memo } from "react";
import { StopButtonBody } from "../styles/styledComponents";

const StopButton = memo(({ gameStop }) => {
  return <StopButtonBody onClick={gameStop}>やめる</StopButtonBody>;
})

export default StopButton;