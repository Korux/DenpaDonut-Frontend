import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {clearQueue, clearSong, setQueue, setQueueIdx, setShuffleState, setToast} from '../redux/actions';
import QueueShuffler from '../components/queueShuffler';
import { getShuffle } from '../redux/selectors';

function ShuffleButton(){

    const dispatch = useDispatch();

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

    return(
        <button onClick={setShuffledQueue} disabled={useSelector(getShuffle).shuffle === "loading"}>
            Shuffle
        </button>
    );

}

export default ShuffleButton;
