import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {clearPlaylist, clearSong, setPlaylist, setPlaylistIdx, setShuffleState, setToast} from '../redux/actions';
import PlaylistShuffler from '../components/playlistShuffler';
import { getShuffle } from '../redux/selectors';

function ShuffleButton(){

    const dispatch = useDispatch();

    const setShuffledPlaylist = () => {
        dispatch(setShuffleState("loading"));
        dispatch(clearPlaylist());
        dispatch(clearSong());
        PlaylistShuffler().then(shuffledPlaylist => {
            let playlistAction = setPlaylist(shuffledPlaylist);
            dispatch(playlistAction);
            dispatch(setPlaylistIdx(0));
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error shuffling playlist. Please try again."}));
        });
    };

    return(
        <button onClick={setShuffledPlaylist} disabled={useSelector(getShuffle).shuffle === "loading"}>
            aa
        </button>
    );

}

export default ShuffleButton;