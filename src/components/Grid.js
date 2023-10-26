import { GridContainer } from '../styles/styledComponents';
import MoleHole from './MoleHole';

const Grid = ({ holesState, updateStatus }) => {
    return (
        <GridContainer>
            { holesState.map(hole => {
                return(
                    <MoleHole id={hole.id} key={hole.id} $mole={hole.mole ? 1 : 0} updateStaus={updateStatus}>
                    </MoleHole>
                )
            })}
        </GridContainer>
    )
}

export default Grid;