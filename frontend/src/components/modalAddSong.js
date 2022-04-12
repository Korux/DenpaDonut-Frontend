import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setToast, setModalLoadingSong, setForceUpdate, setModalLoadingURL } from '../redux/actions';
import { getModal, getUser } from '../redux/selectors';

import globalVars from '../global';

import Loading from './loading';

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
    border-bottom : 1px solid ${({ theme }) => theme.modalUnderlineDark};
    margin : 15px 0;
    color : ${({ theme }) => theme.modalTextColorDark};

    transition : border 0.3s ease-in-out;

    &:focus {
        outline : none;
        color : ${({ theme }) => theme.modalTextColor};
        border-bottom : 1px solid  ${({ theme }) => theme.modalUnderline};
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
    background-color : ${({theme}) => theme.buttonConfirmColor};
    border : none;
    border-radius : 4px;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;
    padding : 5px 15px;
    margin : 0 5px;
`;

const ModalMessage = styled.div`
    width : 100%;
`;

const ModalSongURL = styled.a`
    width : 100%;
    font-weight : 500;
    font-size : 1rem;
    margin-top : 5px;
`;

function ModalAddSong(){

    const [url, setURL] = React.useState("");
    const dispatch = useDispatch();
    
    var loading = useSelector(getModal).loadingsong;
    var userinfo = useSelector(getUser);
    var loadingurl = useSelector(getModal).loadingurl;

    function postSong(event){

        let validurl = false;
        if(url.includes('youtube')){
            if(url.includes("&"))setURL(url.split('&')[0]);
            dispatch(setModalLoadingURL(url.split('&')[0]));
            validurl = true;
        }else if(url.includes('spotify.com/track')){
            if(url.includes('?'))setURL(url.split('?')[0]);
            dispatch(setModalLoadingURL(url.split('?')[0]));
            validurl = true;
        }

        if(!validurl){
            dispatch(setToast({msg : "URL is not a youtube or spotify track.", type:"error"}));
            return;
        }

        dispatch(setModalLoadingSong(true));

        event.preventDefault();
        let reqData = {
            url : url
        };
        let reqOpts = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + userinfo.token.id_token
        },
        body : JSON.stringify(reqData),
        };

        fetch(globalVars.server + "/songs", reqOpts)
        .then(response => response.json())
        .then(data => {
            if(data.Error){
                dispatch(setToast({msg : data.Error, type:"error"}));
                dispatch(setModalLoadingSong(false));
            }
            else{
                dispatch(setForceUpdate(true));
                dispatch(setToast({msg : "Successfully added song.", type:"success"}));
                dispatch(setModalLoadingSong(false));
            }
        })
        .catch(err => {
            // do something with error from POST
            console.log(err);
            dispatch(setToast({msg : "Unknown error adding song. Please try again.", type:"error"}));
            dispatch(setModalLoadingSong(false));
        });
    }

    return(
        <ModalContainer>
            {!loading && 
            <Fragment>
                <ModalMessage>Input <b>Youtube</b> or <b>Spotify</b> link.</ModalMessage>
                <ModalForm onSubmit={postSong}>
                    <ModalInput value={url} onChange={(e) => setURL(e.target.value)} placeholder="Song Link"/>
                    <ModalAddButton>Add Song</ModalAddButton>
                </ModalForm>
            </Fragment>
            }

            {loading &&
                <Fragment>
                    <ModalMessage><b>Currently Loading Song From:</b></ModalMessage>
                    <ModalSongURL href={loadingurl}>{loadingurl}</ModalSongURL>
                    <Loading type={'bubbles'} color={'#CCCCCC'} height={60} width={60}/>

                </Fragment>
            }
        </ModalContainer>
    );

}

export default ModalAddSong;
