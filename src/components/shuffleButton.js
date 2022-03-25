import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import globalVars from '../global';

import {clearQueue, clearSong, setQueue, setQueueIdx, setShuffleState, setToast} from '../redux/actions';
import { getShuffle, getUser } from '../redux/selectors';

import {IoMdShuffle} from 'react-icons/io';


const ShuffleButtonIcon = styled.button`
    background-color : rgba(0,0,0,0);
    border : none;
`;

const ShuffleIcon = styled(IoMdShuffle)`
    color : #868686;
    margin-top : 2px;
`;

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

const QueueShuffler = (userinfo) => {

    return new Promise((resolve, reject) => {
        let reqOpts = {
            method : "GET",
            headers: {
                'Authorization' : 'Bearer ' + userinfo.token.id_token
            },
        };
        fetch(globalVars.server + "/songs", reqOpts)
        .then(response => response.json())
        .then(data => {
            if(data.Error)reject(data.Error);
            shuffle(data);
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
};

function ShuffleButton(){

    const dispatch = useDispatch();
    var shuffling = useSelector(getShuffle).shuffle === "loading";
    var userinfo = useSelector(getUser);

    const setShuffledQueue = () => {
        dispatch(setShuffleState("loading"));
        dispatch(clearQueue());
        dispatch(clearSong());
        QueueShuffler(userinfo).then(shuffledQueue => {
            dispatch(setQueue(shuffledQueue));
            dispatch(setQueueIdx(0));
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error shuffling queue. Please try again."}));
        });
    };

    return(
        <ShuffleButtonIcon onClick={setShuffledQueue} disabled={shuffling}>
            <ShuffleIcon size={"1.6rem"}/>
        </ShuffleButtonIcon>
    );

}

export default ShuffleButton;
