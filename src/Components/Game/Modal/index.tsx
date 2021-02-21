import React from 'react';
import styled from 'styled-components';
import ModalContainer from './Components/ModalContainer';
import ModalContent from './Components/ModalContent';
import ModalHeader from './Components/ModalHeader';

const ModalBody = styled.div`
`

type Props = {
    color: string,
    headerStyle: {
        backgroundColor: string,
        textColor: string
    }
    title: string,
    children: React.ReactNode,
    show: boolean
}

function Modal({ color, headerStyle, title, children, show }: Props) {
    return (
        <ModalContainer
            show={show}
            backgroundColor={color}>
            <ModalContent>
                <ModalHeader
                    textColor={headerStyle.textColor}
                    backgroundColor={headerStyle.backgroundColor}>
                    <h1>
                        {title}
                    </h1>
                </ModalHeader>
                <ModalBody>
                    {
                        children
                    }
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal;