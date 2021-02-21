import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GameItem, { Sides } from './Components/GameItem';
import GameOptions from './Components/GameOptions';
import Modal from './Modal';

const GameContainer = styled.div`
    display:flex;
    flex: 1;
    flex-direction:column;    
    justify-content:center;
    align-items:center;
    padding: 10px;
`;

type GameWrapperProps = {
    isTheTopItem:boolean;
}

const GameWrapper = styled.div<GameWrapperProps>`
    width: 50%;
    display:flex;   
    flex-direction:row;
    justify-content:center;
    align-items:center;

    display: flex;
    align-items: ${({isTheTopItem})=> isTheTopItem ? 'flex-end' : 'flex-start'};

    @media(max-width: 1120px){
        width: 60%;
    }

    @media(max-width: 1025px){
        width: 70%;
    }

    @media(max-width: 850px){
        width: 80%;
    }

    @media(max-width: 690px){
        width: 90%;
    }

    @media(max-width: 620px){
        width: 100%;
    }
`;

const ModalBody = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;

    > p {
        padding: 20px
    }
`;

const GameStatusContainer = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    padding: 10px;
`;

type ModalButtonProps = {
    color: string
}

const ModalButtons = styled.button<ModalButtonProps>`
    width: 80%;
    height: 40px;
    margin: 0 0 10px 0;
    background-color: ${({ color }) => color};
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    font-family: PressStart;
`

const totalItemsInSequence = 5;

enum SequenceStatus {
    DID_NOT_START = 0,
    REALIZING = 1,
    SUCCESS = 2,
    FAILED = 3
}

const generateRandomSequence = () => Array.from({ length: totalItemsInSequence }, () => Math.floor(Math.random() * 4));

function Game() {
    const [sequence, setSequence] = useState<Array<number>>(generateRandomSequence());
    const [gameItemChoosed, setGameItemChoosed] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isShowSequence, setIsShowSequence] = useState<boolean>(false);
    const [lastIndexSequence, setLastIndexSequence] = useState<number>(-1);
    const [points, setPoints] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sequenceStatus, setSequenceStatus] = useState<SequenceStatus>(SequenceStatus.DID_NOT_START);

    //Demonstra a sequência para o usuário, após a demonstração o usuário pode iniciar o jogo
    useEffect(() => {
        if (isShowSequence) {
            startSequence();
        }
        else if (isPlaying) {
            setGameItemChoosed(-1);
            setLastIndexSequence(-1);
        }
    }, [isShowSequence])

    //Timeout para reproduzir a sequência para o usuário
    useEffect(() => {
        if (isShowSequence) {
            const timeoutStartSequence = setTimeout(() => {
                startSequence();
                clearTimeout(timeoutStartSequence);
            }, 1000);
        }
    }, [lastIndexSequence])

    //Duração que o item do jogo fica ativado para o usuário
    useEffect(() => {
        if (gameItemChoosed > -1) {
            const timeoutStartSequence = setTimeout(() => {
                const newIndexSequence = lastIndexSequence + 1;

                setGameItemChoosed(-1);
                setLastIndexSequence(newIndexSequence);

                clearTimeout(timeoutStartSequence);
            }, 500)
        }
    }, [gameItemChoosed])

    const startSequence = () => {
        const newIndexSequence = lastIndexSequence + 1;

        if (newIndexSequence < sequence.length) {
            const gameItemToShowInSequence = sequence[newIndexSequence];

            setGameItemChoosed(gameItemToShowInSequence);
        }
        else {
            setIsShowSequence(false);
        }
    }

    const gameHandler = () => {

        if (!isPlaying) {
            setIsPlaying(true);
            setIsShowSequence(true);
            setSequenceStatus(SequenceStatus.REALIZING);

        }
        else {
            setSequenceStatus(SequenceStatus.DID_NOT_START);
        }
    }

    const gameItemClick = (itemClicked: Sides) => {
        if (!isShowSequence && isPlaying) {
            const actualIndex = lastIndexSequence + 1;

            const itemOfSequence = sequence[actualIndex];

            if (itemOfSequence === itemClicked) {
                setPoints(points + 1)

                if (actualIndex === (sequence.length - 1)) {
                    setShowModal(true);
                    setSequenceStatus(SequenceStatus.SUCCESS);
                    resetGame(false, false);
                    return;
                }

                setLastIndexSequence(actualIndex);
            }
            else {
                setShowModal(true);
                setSequenceStatus(SequenceStatus.FAILED);
                //resetGame(true, true);
            }
        }
    }

    const resetGame = (resetPoints: boolean, endGame: boolean) => {
        setGameItemChoosed(-1);

        if (endGame) {
            setIsPlaying(false);
        }

        setIsShowSequence(false);
        setLastIndexSequence(-1);
        setSequence(generateRandomSequence());

        if (resetPoints) {
            setPoints(0)
        }
    }

    const gameStatus = () => {
        if (isPlaying) {
            if (isShowSequence) {
                return "Se liga na sequência...";
            } else if (points === 0) {
                return "Sua vez...";
            } else {
                return `Pontos: ${points}`;
            }
        } else {
            return "Pressione o botão Play";
        }
    }


    return (
        <>
            <GameContainer>
                <GameWrapper isTheTopItem={true}>
                    <GameItem
                        onGameItemClick={gameItemClick}
                        gameState={{
                            isShowSequence,
                            isPlaying,
                            gameItemChoose: gameItemChoosed
                        }}
                        side={Sides.TOP_LEFT} />
                    <GameItem
                        onGameItemClick={gameItemClick}
                        gameState={{
                            isShowSequence,
                            isPlaying,
                            gameItemChoose: gameItemChoosed
                        }}
                        side={Sides.TOP_RIGHT} />
                </GameWrapper>
                <GameWrapper isTheTopItem={false}>
                    <GameItem
                        onGameItemClick={gameItemClick}
                        gameState={{
                            isShowSequence,
                            isPlaying,
                            gameItemChoose: gameItemChoosed
                        }}
                        side={Sides.BOTTOM_LEFT} />
                    <GameItem
                        onGameItemClick={gameItemClick}
                        gameState={{
                            isShowSequence,
                            isPlaying,
                            gameItemChoose: gameItemChoosed
                        }}
                        side={Sides.BOTTOM_RIGHT} />
                </GameWrapper>

            </GameContainer>
            <GameStatusContainer>
                <h2>
                    {gameStatus()}
                </h2>
            </GameStatusContainer>
            <GameOptions
                isPlaying={isPlaying}
                onGameStateClick={() => {
                    resetGame(true, true);
                    gameHandler();
                }} />

            <Modal
                show={showModal}
                color="168,216,234,.8"
                title={sequenceStatus === SequenceStatus.SUCCESS ? 'Parabéns!' : 'Ops...'}
                headerStyle={{
                    backgroundColor:
                        sequenceStatus === SequenceStatus.SUCCESS ? '#17b978' : '#BA3116'
                    ,
                    textColor: 'white'
                }}>
                <ModalBody>
                    <p>
                        {sequenceStatus === SequenceStatus.SUCCESS ? 'Você finalizou uma sequência' : 'Você errou... Reinicie o jogo e tente novamente'}
                    </p>
                    <ModalButtons
                        onClick={() => {
                            setShowModal(false);
                            if (sequenceStatus === SequenceStatus.SUCCESS) {
                                resetGame(false, false);
                            }
                            else {
                                resetGame(true, false);
                            }

                            gameHandler();
                            setIsShowSequence(true)
                        }}
                        color="#e84a5f">
                        {sequenceStatus === SequenceStatus.SUCCESS ? "Próxima Sequência" : "Reiniciar"}
                    </ModalButtons>
                    <ModalButtons
                        color="#ff847b"
                        onClick={() => {
                            resetGame(true, true);
                            setShowModal(false);
                            setSequenceStatus(SequenceStatus.DID_NOT_START);
                        }}>
                        Fechar
                    </ModalButtons>
                </ModalBody>
            </Modal>
        </>
    )
}

export default Game;