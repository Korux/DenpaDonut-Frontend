import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setToast } from '../redux/actions';

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

        fetch("http://localhost:3000/songs, reqOpts)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // do something with data
            if(data.Error)dispatch(setToast({msg : data.Error, type:"error"}));
            else dispatch(setToast({msg : "Successfully added song.", type:"success"}));
        })
        .catch(err => {
            console.log(err);
            // do something with error
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
