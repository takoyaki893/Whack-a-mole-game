import { memo } from "react";
import { TimeLimitDisplay } from "../styles/styledComponents";

const TimeLimit = memo(({ timeLimit }) => {
    return (
        <TimeLimitDisplay>{timeLimit}</TimeLimitDisplay>
    );
})

export default TimeLimit;