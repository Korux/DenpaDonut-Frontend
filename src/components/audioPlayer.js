import React, { useEffect } from 'react';

import Player from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { getSong, getPlaylist } from '../redux/selectors';
import { setPlaylistIdx, setShuffleState, setSong, setToast } from "../redux/actions";

import globalVars from '../global';

function AudioPlayer(){

    const dispatch = useDispatch();

    var id = useSelector(getSong).mp3;
    var playlist = useSelector(getPlaylist).playlist;
    var playlistIdx = useSelector(getPlaylist).idx;
    const [url, setURL] = React.useState(null);

    function nextSong(){
        if(playlistIdx === -1) return;
        else if(playlistIdx + 1 === playlist.length){
            // jump to end of song
        }
        else{
            dispatch(setPlaylistIdx(playlistIdx + 1));
        }
    }

    function previousSong(){
        if(playlistIdx === -1) return;
        else if(playlistIdx === 0){
            // seek to beginning of song
        }else{
            dispatch(setPlaylistIdx(playlistIdx - 1));
        }
    }
    
    useEffect(() => {
        if(id !== null){
            let url = globalVars.server + "/mp3/" + id;
            fetch(url)
            .then(response => response.body)
            .then(body => {
                const reader = body.getReader();
                return new ReadableStream({
                    start(controller) {
                      return pump();
                      function pump() {
                        return reader.read().then(({ done, value }) => {
                          // When no more data needs to be consumed, close the stream
                            if (done) {
                              controller.close();
                              return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                            });
                        }
                    }
                })
            })
            .then(stream => new Response(stream))
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(url => setURL(url))
            .catch(err => {
                console.log(err);
                dispatch(setToast({type : "error", msg : "Error loading audio. Please try again."}));
            });
        }
    },[id, dispatch]);
    
    useEffect(() => {
        if(playlist && playlistIdx !== -1){
            dispatch(setSong(playlist[playlistIdx]));
        }
    }, [playlistIdx, playlist, dispatch]);

    return(
        <Player
            src={url}
            showFilledVolume
            showSkipControls
            // showJumpControls={false}
            onCanPlayThrough={() => dispatch(setShuffleState("ready"))}
            onClickNext={nextSong}
            onClickPrevious={previousSong}
        />
    );

}
//"http://localhost:3000/test/60efa1df19860709e06f2170"
export default AudioPlayer;