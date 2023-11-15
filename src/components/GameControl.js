import { useState, useEffect, useCallback } from 'react';
import Score from './Score';
import Maincontents from './MainContents';
import StartButton from './StartButton';
import StopButton from './StopButton';
import TimeLimit from './TimeLimit';
import { ButtonWrapper, DisplayWrapper, GridContainer, DisplayOutlet } from '../styles/styledComponents';

/**
 * ・スコアの保存
 * ・ランキング機能
 * ・ゲーム終了時にスコアについてのモーダルなダイアログを出す
 * ・モグラのアニメーション設定
 */

const GRID_ROW = 3;
const GRID_COLUMN = 3;
const STATUS_STOP = 'STOP'
const STATUS_START = 'START'
const MOLE_NUMBER = 5;
const MOLE_SCORE = 3;
const DEFAULT_SCORE = 0;
const TIME_LIMIT = 30;
const DEFAULT_HIT_COUNT = 0;

const defaultHolesState = Array.from({ length: GRID_ROW * GRID_COLUMN }, (_, id) => ({ id, mole: false }));

const GameControl = () => {

    const [holesState, setHolesState] = useState(defaultHolesState);
    const [gameStatus, setGameStatus] = useState(STATUS_STOP);
    const [score, setScore] = useState(DEFAULT_SCORE);
    const [hitCount, setHitCount] = useState(DEFAULT_HIT_COUNT);
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
    const gameStart = useCallback(() => {
        setGameStatus(STATUS_START);
    }, []) 

    /**
     * ゲームを中断する
     */
    const gameStop = useCallback(() => {
        setHolesState(createDefaultHolesState());
        setGameStatus(STATUS_STOP);
        setHitCount(DEFAULT_HIT_COUNT);
        setScore(DEFAULT_SCORE);
        setTimeLimit(TIME_LIMIT);
    }, []);
    
    /**
     * 初期状態のgridを生成する
     * コンポーネント外のdefaultHolesStateとは参照を別にしたいため新しく生成する
     * コンポーネント内にdefaultHolesStateを定義した場合はuseCallbackの影響で参照が変化しない
     * @returns 初期状態のgrid
     */
    const createDefaultHolesState = () => {
        return Array.from({ length: GRID_ROW * GRID_COLUMN }, (_, id) => ({
            id,
            mole: false,
        }));
    };
        
    /**
     * 
     * @param {*} e クリックされたgrid
     * @returns ゲーム状況の更新を行う
     */
    const updateStatus = (e) => {
        // クリックされたgridのidを取得
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

        // Hit数を更新
        setHitCount(prev => prev + 1);

        // スコアの更新
        setScore(prev => prev + MOLE_SCORE);
    }

    return (
        <GridContainer>
            <DisplayWrapper>
                <DisplayOutlet>
                    <Score score={score} hitCount={hitCount}/>
                    <TimeLimit timeLimit={timeLimit} />
                </DisplayOutlet>
            </DisplayWrapper>
            <Maincontents holesState={holesState} updateStatus={updateStatus} />
            <ButtonWrapper>
                <StartButton gameStart={gameStart} />
                <StopButton gameStop={gameStop} />
            </ButtonWrapper>
        </GridContainer>
    )
}

export default GameControl;