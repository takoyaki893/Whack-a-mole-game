import { HoleContainer } from '../styles/styledComponents';

const MoleHole = ({ id, $mole, updateStaus }) => {
    return (
        <HoleContainer data-id={id} $mole={$mole ? 1 : 0} onClick={updateStaus}></HoleContainer>
    );
}

export default MoleHole;