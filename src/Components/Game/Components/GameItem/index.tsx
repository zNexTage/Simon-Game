import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import simonGameSound1 from '../../../../Sounds/simonSound1.mp3';
import simonGameSound2 from '../../../../Sounds/simonSound2.mp3';
import simonGameSound3 from '../../../../Sounds/simonSound3.mp3';
import simonGameSound4 from '../../../../Sounds/simonSound4.mp3';
import AudioEffects from '../../../../AudioEffects';

enum Sides {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_LEFT = 2,
    BOTTOM_RIGHT = 3
}

const GameItemConfigStyle = {
    [Sides.TOP_LEFT]: {
        backgroundColor: 'green',
        borderRadius: '100% 0 0 0',
        sound: simonGameSound1
    },
    [Sides.TOP_RIGHT]: {
        backgroundColor: 'red',
        borderRadius: '0 100% 0 0',
        sound: simonGameSound2
    },
    [Sides.BOTTOM_LEFT]: {
        backgroundColor: 'yellow',
        borderRadius: '0 0 0 100%',
        sound: simonGameSound3
    },
    [Sides.BOTTOM_RIGHT]: {
        backgroundColor: 'blue',
        borderRadius: '0 0 100% 0',
        sound: simonGameSound4
    },
}

type GameItemStyle = {
    backgroundColor: string,
    borderRadius: string,
    applyEffects: boolean;
    activateHover: boolean;
}

const GameItemBase = styled.div<GameItemStyle>`
    width: 30%;
    height: 180px;
    background-color:${({ backgroundColor }) => backgroundColor};
    border-radius:${({ borderRadius }) => borderRadius};
    /*border: 5px solid black;*/
    box-shadow:0 0 5px ${({ backgroundColor }) => backgroundColor};
    transform:scale(${({ applyEffects }) => applyEffects ? 1.08 : 1});
    transition: all .2s ease-in-out;
    z-index: ${({ applyEffects }) => applyEffects ? 2 : 1};

   

    ${({ activateHover }) => activateHover &&
        css`
     :hover{
        transform:scale(1.08);
        transition: all .2s ease-in-out;
        z-index: 2;         
    };  
    `
    } 

    @media(max-width: 500px){
        width: 40%;
        height: 160px;
    }

    @media(max-width: 343px){
        width: 50%;
        height: 150px;
    }
`;

/**
 *  @media(max-width: 422px){
        width: 80%;
        height: 160px;
    }

    @media(max-width: 850px){
        width: 50%;
        height: 160px;
    }

    @media(max-width: 1024px){
        width: 30%;
        height: 180px;
    }  

    @media(max-width: 430px){
        width: 85%;
        height: 160px;
    }
 * 
 */

type Props = {
    side: Sides,
    gameState: {
        isPlaying: boolean;
        isShowSequence: boolean;
        gameItemChoose: number
    },
    onGameItemClick: (itemClicked: Sides) => void
}

function GameItem({ side, gameState, onGameItemClick }: Props) {
    const gameItemStyle = GameItemConfigStyle[side];
    let applyEffects = gameState.isShowSequence && side === gameState.gameItemChoose;

    if (applyEffects) {
        console.log(gameItemStyle);

        AudioEffects({
            audioUrl: GameItemConfigStyle[side].sound,
            play: true
        });

        console.log("Alo mundo");

    }
    return (
        <>
            <GameItemBase
                activateHover={gameState.isPlaying && !gameState.isShowSequence}
                onClick={(e) => {
                    AudioEffects({
                        audioUrl: gameItemStyle.sound,
                        play: true
                    });

                    onGameItemClick(side)
                }}
                applyEffects={applyEffects}
                backgroundColor={gameItemStyle.backgroundColor}
                borderRadius={gameItemStyle.borderRadius} />

        </>
    )
}

export default GameItem;

export { Sides }