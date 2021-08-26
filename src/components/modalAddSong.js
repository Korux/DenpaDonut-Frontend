import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setToast, setModalEditedSong, setModalState, setForceUpdate } from '../redux/actions';

import globalVars from '../global';

const ModalContainer = styled.div`
    width : 35vw;
    min-width : 250px;
    max-width : 450px;
    padding : 30px 15px;
    display : flex;
    flex-flow : column wrap;
    justify-content : center;
    align-items : center;
`;

const ModalForm = styled.form`
    width : 90%;
`;

const ModalInput = styled.input`
    width : 100%;
    background-color:${({ theme }) => theme.modalColor};
    border : 0;
    border-bottom : 1px solid black;
    margin : 15px 0;
    color : ${({ theme }) => theme.modalTextColorDark};

    transition : border 0.3s ease-in-out;

    &:focus {
        outline : none;
        color : ${({ theme }) => theme.modalTextColor};
        border-bottom : 1px solid rgb(200,200,200);
        ::placeholder,
        ::-webkit-input-placeholder {
          color : ${({ theme }) => theme.modalTextColor};
        }
        :-ms-input-placeholder {
           color : ${({ theme }) => theme.modalTextColor};
        }
    }
`;

const ModalAddButton = styled.button`
    color : ${({ theme }) => theme.modalTextColor};
    background-color : ${({ theme }) => theme.modalButtonColor};
    border : none;
    padding : 5px 15px;
    border-radius : 5px;
`;

const ModalMessage = styled.div`
    width : 100%;
`;

function ModalAddSong(){

    const [url, setURL] = React.useState("");
    const dispatch = useDispatch();

    function postSong(event){
        event.preventDefault();
        let reqData = {
            url : url
        };
        let reqOpts = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(reqData),
        };

        fetch(globalVars.server + "/songs", reqOpts)
        .then(response => response.json())
        .then(data => {
            if(data.Error)dispatch(setToast({msg : data.Error, type:"error"}));
            else{
                dispatch(setForceUpdate(true));
                fetch(globalVars.server + "/songs/" + data.id)
                .then(response => response.json())
                .then(data => {
                    if(data.Error)dispatch(setToast({msg : data.Error, type:"error"}));
                    else{
                        dispatch(setModalEditedSong(data));
                        dispatch(setModalState("edit"));
                        dispatch(setToast({msg : "Successfully added song.", type:"success"}));
                    }
                })
                .catch(err => {
                    // do something with error from GET
                    dispatch(setToast({msg : "Unknown error getting song data. Please try again.", type:"error"}));
                });
            }
        })
        .catch(err => {
            // do something with error from POST
            console.log(err);
            dispatch(setToast({msg : "Unknown error adding song. Please try again.", type:"error"}));
        });
    }

    return(
        <ModalContainer>
            <ModalMessage>Input Youtube or Spotify link to add the song.</ModalMessage>
            <ModalForm onSubmit={postSong}>
                <ModalInput value={url} onChange={(e) => setURL(e.target.value)} placeholder="Song Link"/>
                <ModalAddButton>Add Song</ModalAddButton>
            </ModalForm>
        </ModalContainer>
    );

}

export default ModalAddSong;
