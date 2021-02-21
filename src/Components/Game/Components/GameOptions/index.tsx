import React from 'react';
import styled from 'styled-components';

const GameOptionsContainer = styled.div`
    display:flex;
    justify-content:center;
`;

const GameStateButton = styled.button`
    height: 80px;
    border-radius: 10px;
    outline:none;
    border:1px solid white;
    cursor:pointer;
    background-color:var(--secondary-color);
    color:var(--cream);
    font-size: 25px;
    font-family: PressStart;
`;

type Props = {
    onGameStateClick: () => void;
    isPlaying: boolean
}

function GameOptions({ onGameStateClick, isPlaying }: Props) {
    return (
        <GameOptionsContainer>
            <GameStateButton onClick={onGameStateClick}>
                {isPlaying ? 'Parar' : 'Play'}
            </GameStateButton>
        </GameOptionsContainer>
    )
}

export default GameOptions;