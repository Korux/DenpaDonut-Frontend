import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setModalShow, setModalState, setToast, setForceUpdate } from '../redux/actions';
import { getUser, getModal } from '../redux/selectors';

import globalVars from '../global';

const ModalContainer = styled.div`
width : 30vw;
min-width : 320px;
max-width : 400px;
padding : 30px 5px;
display : flex;
flex-flow : column wrap;
justify-content : center;
align-items : center;
`;

const ModalMessage = styled.div`
    width : 100%;
    padding : 10px 0 20px 0;
`;

const ModalCancelButton = styled.button`
    border : none;
    border-radius : 4px;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;
    color :  ${({theme}) => theme.modalTextCancelColor};
    padding : 5px 15px;
    background-color : ${({theme}) => theme.buttonCancelColor};
    margin : 0 20%;
`;

const ModalDeleteButton = styled.button`
    border : none;
    border-radius : 4px;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;
    color :  ${({theme}) => theme.modalTextColor};
    padding : 5px 15px;
    background-color : ${({theme}) => theme.buttonDeleteColor};
    margin : 0 20%;
`;

const ModalButtonContainer = styled.div`
display : flex;
justify-content : center;
align-items : center;
`;

function ModalDeleteSong(){

    const dispatch = useDispatch();
    var userinfo = useSelector(getUser);
    var song = useSelector(getModal).song;

    const cancelClick = () => {
        dispatch(setModalShow(false));
        dispatch(setModalState("none"));
    };

    const deleteClick = () => {
        let reqOpts = {
            method : "DELETE",
            headers: {
              'Authorization' : 'Bearer ' + userinfo.token.id_token
            },
        };

        fetch(globalVars.server + '/songs/' + song._id, reqOpts)
        .then(data => {
            if(data){
                dispatch(setToast({type : "error", msg : "Error with deleting song, please try again"}));
            }else{
                dispatch(setForceUpdate(true));
                dispatch(setToast({type : "success", msg : "Song successfully deleted"}));
                dispatch(setModalShow(false));
                dispatch(setModalState("none"));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error with deleting song, please try again"}));
        });
        
    };

    return(
        <ModalContainer>
            <ModalMessage>
                Are you sure you want to delete this song?
            </ModalMessage>
            <ModalButtonContainer>
                <ModalCancelButton onClick={cancelClick}>Cancel</ModalCancelButton>
                <ModalDeleteButton onClick={deleteClick}>Delete</ModalDeleteButton>
            </ModalButtonContainer>
        </ModalContainer>
    );
}

export default ModalDeleteSong;
