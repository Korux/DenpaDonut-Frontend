import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setToast, setModalEditedSong, setModalState } from '../redux/actions';

import globalVars from '../global';

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
            dispatch(setToast({msg : "Unknown error adding song. Please try again.", type:"error"}));
        });
    }

    return(
        <form onSubmit={postSong}>
        <input value={url} onChange={(e) => setURL(e.target.value)}/>
        <button>add song</button>
      </form>
    );

}

export default ModalAddSong;
