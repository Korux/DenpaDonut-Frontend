import React, { useEffect, createRef } from 'react';

import Player from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { getSong, getQueue } from '../redux/selectors';
import { setQueueIdx, setShuffleState, setSong, setToast, setSongPlaying, clearQueue, clearSong } from "../redux/actions";

import globalVars from '../global';

function AudioPlayer(){

    const audio = createRef();
    const dispatch = useDispatch();

    var id = useSelector(getSong).mp3;
    var queue = useSelector(getQueue).queue;
    var queueIdx = useSelector(getQueue).idx;
    var audioPlaying = useSelector(getSong).playing;
    const [url, setURL] = React.useState(null);

    function nextSong(){
        if(queueIdx === -1) return;
        else if(queueIdx + 1 === queue.length){
            let audioHandle = audio.current.audio.current;
            audioHandle = null;
            setURL(null);
            dispatch(clearQueue());
            dispatch(clearSong());
        }
        else{
            dispatch(setQueueIdx(queueIdx + 1));
        }
    }

    function previousSong(){
        let audioHandle = audio.current.audio.current;
        if(queueIdx === -1) return;
        else if(queueIdx === 0){
            audioHandle.currentTime = 0;
        }else{
            if(audioHandle.currentTime > 3)
                audioHandle.currentTime = 0;
            else
                dispatch(setQueueIdx(queueIdx - 1));
        }
    }

    function audioOnPlay(){
        dispatch(setSongPlaying(true));
    }

    function audioOnPause(){
        dispatch(setSongPlaying(false));
    }

    useEffect(() => {
        if(id !== null && queueIdx >= 0){
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
    },[id, queueIdx, dispatch]);

    useEffect(() => {
        if(queue && queueIdx !== -1){
            dispatch(setSong(queue[queueIdx]));
        }
    }, [queueIdx, queue, dispatch]);

    useEffect(() => {
        let audioHandle = audio.current.audio.current;
        if(audioPlaying && audioHandle.paused)audioHandle.play();
        if(!audioPlaying && !audioHandle.paused) audioHandle.pause();
    },[audioPlaying, audio]);

    return(
        <Player
            src={url}
            ref={audio}
            showFilledVolume
            showSkipControls
            showJumpControls={false}
            onCanPlayThrough={() => dispatch(setShuffleState("ready"))}
            onClickNext={nextSong}
            onClickPrevious={previousSong}
            onEnded={nextSong}
            onPlay={audioOnPlay}
            onPause={audioOnPause}
        />
    );

}
//"http://localhost:3000/test/60efa1df19860709e06f2170"
export default AudioPlayer;
