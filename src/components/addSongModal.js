import React, {Fragment} from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    opacity :  ${({show}) => show ? '1' : '0'};
    pointer-events :  ${({show}) => show ? 'auto' : 'none'};
    width : 200px;
    height : 500px;
    background-color : ${({ theme }) => theme.modalColor};
    z-index : 999;
    position : fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalDim = styled.a`
    display: inline-block;
    opacity :  ${({show}) => show ? '0.5' : '0'};
    pointer-events :  ${({show}) => show ? 'auto' : 'none'};
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 997;
    top: 0;
    left: 0;
`;

function AddSongModal({show, setShow}){

    return(
        <Fragment>
            <ModalDim show={show} onClick={() => setShow(false)}/>
            <ModalContainer show={show}>

            </ModalContainer>
        </Fragment>
    );
}

export default AddSongModal;
