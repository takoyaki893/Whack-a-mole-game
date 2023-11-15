import { gsap } from 'gsap'
import { useRef, useCallback, useEffect } from 'react';
import { HoleContainer, MoleImage } from '../styles/styledComponents';

const Grid = ({ id, $mole, updateStaus }) => {

    const moleElementRef = useRef(null);

    /**
     * モグラにgsapでアニメーションをつける
     */
    const runUpDownMoleAnimation = useCallback(() => {

        gsap.to(moleElementRef.current, {
            duration: .7,
            y: -100,
            yoyo: true,
            repeat: 1,
            onUpdate: () => {
                if(moleElementRef.current) {
                    if (gsap.getProperty(moleElementRef.current, "y") < -50) {
                    // 要素を非表示にする
                    moleElementRef.current.style.visibility = 'visible';
                    } else {
                    // それ以外の場合は表示する
                    moleElementRef.current.style.visibility = 'hidden';
                    }
                }else{
                    gsap.killTweensOf(moleElementRef.current);
                }
              }
        })
    })

    useEffect(() => {
        $mole ? runUpDownMoleAnimation() : moleElementRef.current.style.visibility = 'hidden';

        // モグラを初期位置に戻す and アニメーションのリセット
        return () => {
            gsap.set(moleElementRef.current, {y: 0})
            gsap.killTweensOf(moleElementRef.current);
        }
    },[$mole]);

    return (
        <div>
            <HoleContainer></HoleContainer>
            <MoleImage 
                data-id={id}
                ref={moleElementRef}
                src="/images/mogura.png" 
                onClick={updateStaus}
            />
        </div>
    );
}

export default Grid;