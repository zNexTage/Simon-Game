import React from 'react';
import styled from 'styled-components';

type Props = {
    backgroundColor: string
    textColor:string;
    children: React.ReactNode;
}

const ModalHeaderBase = styled.div<Props>`
    display:flex;
    justify-content:center;
    align-items:center;
    height: 80px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    background-color: ${({ backgroundColor }) => backgroundColor};
    > h1{
        margin: 0;
        color:${({ textColor }) => textColor};
    }
`;

function ModalHeader({backgroundColor, children, textColor}:Props){
    return (
        <ModalHeaderBase backgroundColor={backgroundColor} textColor={textColor}>
            {
                children
            }
        </ModalHeaderBase>
    )
}

export default ModalHeader;