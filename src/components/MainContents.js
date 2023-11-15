import { HoleGridContents, HoleGridWrapper } from '../styles/styledComponents';
import Grid from './Grid';

const Maincontents= ({ holesState, updateStatus }) => {
    return (
        <HoleGridWrapper>
            <HoleGridContents>
                { holesState.map(hole => {
                    return(
                        <Grid id={hole.id}
                            key={hole.id} 
                            $mole={hole.mole ? 1 : 0} 
                            updateStaus={updateStatus}>
                        </Grid>
                    )
                })}
            </HoleGridContents>
        </HoleGridWrapper>
    )
}

export default Maincontents;