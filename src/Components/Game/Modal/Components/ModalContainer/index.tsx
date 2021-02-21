import React from 'react';
import styled from 'styled-components';

type PropsModalContainer = {
    backgroundColor: string;
    show: boolean;
}

const ModalContainerBase = styled.div<PropsModalContainer>`
    background-color: rgba(${({ backgroundColor }) => backgroundColor});
    width: 100vw;
    height: 100vh;
    position:fixed;
    z-index: 999;
    top: 0;
    display:flex;
    visibility: ${({ show }) => show ? 'visible' : 'hidden'};
    opacity: ${({ show }) => show ? 1 : 0};
    transition:'opacity 1s ease-out';
    justify-content:center;
    align-items:center;
`;

type Props = {
    backgroundColor: string,
    children: React.ReactNode,
    show: boolean
}

function ModalContainer({ backgroundColor, children, show }: Props) {
    return (
        <ModalContainerBase
            show={show}
            backgroundColor={backgroundColor}>
            {
                children
            }
        </ModalContainerBase>
    )
}

export default ModalContainer;