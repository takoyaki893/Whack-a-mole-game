import { useState, useEffect } from 'react';
import ScoreDisplay from './ScoreDisplay';
import Grid from './Grid';
import StartButton from './StartButton';
import StopButton from './StopButton';
import TimeLimitDisplay from './TimeLimitDisplay';
import { DisplayContainer } from '../styles/styledComponents';

/**
 * ・git連携
 * ・スコアの保存
 * ・ランキング機能
 */

const GameControl = () => {

    const GRID_ROW = 3;
    const GRID_COLUMN = 3;
    const STATUS_STOP = 'STOP'
    const STATUS_START = 'START'
    const MOLE_NUMBER = 3;
    const MOLE_SCORE = 3;
    const DEFAULT_SCORE = 0;
    const TIME_LIMIT = 10;

    const defaultHolesState = [];

    for (let id = 0; id < GRID_ROW * GRID_COLUMN; id++){
        defaultHolesState.push(
            {
                id: id,
                mole: false
            }
        );
    }

    const [holesState, setHolesState] = useState(defaultHolesState);
    const [gameStatus, setGameStatus] = useState(STATUS_STOP);
    const [score, setScore] = useState(DEFAULT_SCORE);
    const [timeLimit, setTimeLimit] = useState(TIME_LIMIT);

    useEffect(() => {
        if(gameStatus !== STATUS_START) return;
        
        // モグラの出現/消滅の開始
        const moleInterval = setInterval(() => {
            const randomIndexList = appearRamdomMole(MOLE_NUMBER);
            setTimeout(() => disappearRamdomMole(randomIndexList), 2000);
        }, 3000);
        
        
        return () => clearInterval(moleInterval);
    }, [gameStatus]);


    useEffect(() => {
        // ゲームが開始しているか確認
        if(gameStatus !== STATUS_START) return;

        // 制限時間に達した場合ゲームを止める
        if(timeLimit === 0){
            gameStop();
            return;
        }

        // 制限時間のカウントダウン開始
        const countDown = setInterval(() => {
            setTimeLimit(prev => prev - 1);
        },1000)

        return () => clearInterval(countDown);

    }, [timeLimit, gameStatus]);

    /**
     * 指定の数だけモグラを出現させる
     * @param {*} moleNumber 指定の数
     */
    const appearRamdomMole = (moleNumber) => {
        let randomIndexList = [];
        let targetList = [ ...holesState ];
  
        // ランダムに指定の数だけインデックスを選ぶ
        while(randomIndexList.length < moleNumber && targetList.length > 0){
            const randomNumber = Math.floor(Math.random() * targetList.length);
            randomIndexList.push(targetList[randomNumber].id);
            targetList.splice(randomNumber, 1);
        }

        // ランダムに選んだgridにモグラを出現させる
        setHolesState(prev => {
            let newHoleState = [ ...prev ];
            randomIndexList.forEach(randomIndex => {
                newHoleState[randomIndex].mole = true;
            });
            return newHoleState;

        })
        return randomIndexList;
    };

    /**
     * 指定インデックスのモグラの出現を止める
     * @param {*} randomIndexList 指定のインデックスのリスト
     */
    const disappearRamdomMole = (randomIndexList) => {

        setHolesState(prev => {
            let newHoleState = [ ...prev ];
            randomIndexList.forEach(randomIndex => {
                newHoleState[randomIndex].mole = false;
            });
            return newHoleState;
        })
    }

    /**
     * ゲームを開始する
     */
    const gameStart = () => {
        setGameStatus(prev => {
            if(prev === STATUS_STOP){
                return STATUS_START;
            }
        });
    };

    /**
     * ゲームを中断する
     */
    const gameStop = () => {
        setGameStatus(STATUS_STOP);
        setHolesState(defaultHolesState);
        setScore(DEFAULT_SCORE);
        setTimeLimit(TIME_LIMIT);
    }

    /**
     * 
     * @param {*} e クリックされたgrid
     * @returns ゲーム状況の更新を行う
     */
    const updateStatus = (e) => {
        const targetId = parseInt(e.target.dataset.id);

        if(!holesState[targetId].mole){
            return;
        }

        // クリックされたモグラを引っ込める
        setHolesState(prev => {
            let newHoleState = [ ...prev ];
            newHoleState[targetId].mole = false;
            return newHoleState;
        })

        // スコアの更新
        setScore(prev => prev + MOLE_SCORE);
    }

    return (
        <>
            <h1 style={{textAlign: 'center'}}>モグラ叩きゲーム</h1>
            <DisplayContainer>
                <ScoreDisplay score={score} />
                <TimeLimitDisplay timeLimit={timeLimit}></TimeLimitDisplay>
            </DisplayContainer>
            <Grid holesState={holesState} updateStatus={updateStatus} />
            <div style={{ textAlign: 'center', paddingTop: '80px' }}>
                <StartButton gameStart={gameStart} />
                <StopButton gameStop={gameStop} />
            </div>
        </>
    )
}

export default GameControl;