import React from 'react';
import styled from 'styled-components';

const ModalContentBase = styled.div`
    background-color:white;
    width: 50%;
    border-radius: 10px;
`

type Props = {
    children: React.ReactNode
}

function ModalContent({ children }: Props) {
    return (
        <ModalContentBase>
            {
                children
            }
        </ModalContentBase>
    )
}

export default ModalContent;