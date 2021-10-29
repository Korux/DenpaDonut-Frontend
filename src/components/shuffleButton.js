import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {clearQueue, clearSong, setQueue, setQueueIdx, setShuffleState, setToast} from '../redux/actions';
import QueueShuffler from '../components/queueShuffler';
import { getShuffle } from '../redux/selectors';

import {IoMdShuffle} from 'react-icons/io';

const ShuffleButtonIcon = styled.button`
    background-color : rgba(0,0,0,0);
    border : none;
`;

const ShuffleIcon = styled(IoMdShuffle)`
    color : #868686;
    margin-top : 2px;
`;

function ShuffleButton({type}){

    const dispatch = useDispatch();
    var shuffling = useSelector(getShuffle).shuffle === "loading";

    const setShuffledQueue = () => {
        dispatch(setShuffleState("loading"));
        dispatch(clearQueue());
        dispatch(clearSong());
        QueueShuffler().then(shuffledQueue => {
            dispatch(setQueue(shuffledQueue));
            dispatch(setQueueIdx(0));
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error shuffling queue. Please try again."}));
        });
    };

    switch(type){
        case "shuffle-icon":
            return(
                <ShuffleButtonIcon onClick={setShuffledQueue} disabled={shuffling}>
                    <ShuffleIcon size={"1.6rem"}/>
                </ShuffleButtonIcon>
            );
        case "shuffle-standard":
            return(
                <button onClick={setShuffledQueue} disabled={shuffling} />
            );
        default:
            return(
                <button onClick={setShuffledQueue} disabled={shuffling} />
            );

    }

}

export default ShuffleButton;
