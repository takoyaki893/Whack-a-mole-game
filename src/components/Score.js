import { memo } from "react";
import { ScoreDisplay, HitCountDisplay } from "../styles/styledComponents";

const Score= memo(({ score, hitCount }) => {
  return (
    <>
      <ScoreDisplay>スコア：{score}</ScoreDisplay>
      <HitCountDisplay>ヒット数 : {hitCount}</HitCountDisplay>
    </>
  );
})

export default Score;