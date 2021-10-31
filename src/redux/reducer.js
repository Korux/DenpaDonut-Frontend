import { combineReducers } from 'redux';

import {
    SET_SONG,
    SET_QUEUE,
    CLEAR_SONG,
    CLEAR_QUEUE,
    SET_TOAST,
    CLEAR_TOAST,
    SET_SHUFFLE,
    SET_QUEUE_IDX,
    SET_MODAL_SHOW,
    SET_MODAL_STATE,
    SET_MODAL_EDITED_SONG,
    SET_SONG_PLAYING,
    SET_FORCE_UPDATE,
    SET_DRAGGING,
    SET_SCROLLABLE,
    SET_QUEUE_SHOW,
    REMOVE_FROM_QUEUE
} from './actions.js';

const baseSong = {
    album : null,
    artist : null,
    tags : null,
    title : null,
    year : null,
    pic : null,
    mp3 : null,
    nosong : true,
    playing : false
};


function songReducer(state=baseSong, action){
    switch(action.type){
        case SET_SONG:
            return{
                album : action.song.album,
                artist : action.song.artist,
                tags : action.song.tags,
                title : action.song.title,
                year : action.song.year,
                pic : action.song.picid,
                mp3 : action.song.songid,
                nosong : false,
                playing : true
            }
        case CLEAR_SONG:
            return baseSong;
        case SET_SONG_PLAYING:
            return{
                ...state,
                playing : action.play
            }
        default:
            return state;
    }
}

const baseQueue = {
    queue: null,
    noqueue : true,
    idx : -1,
    show : false,
}

function queueReducer(state=baseQueue, action){
    switch(action.type){
        case SET_QUEUE:
            return{
                ...state,
                queue : action.queue,
                noqueue : false,
            }
        case CLEAR_QUEUE:
            return baseQueue;
        case SET_QUEUE_IDX:
            return{
                ...state,
                idx : action.idx,
            }
        case SET_QUEUE_SHOW:
            return{
                ...state,
                show : action.show
            }
        case REMOVE_FROM_QUEUE:
            let newQueue = state.queue.slice();
            newQueue.splice(action.idx,1);
            let newIdx = state.idx;
            if(action.idx < newIdx) newIdx -= 1;
            return{
                ...state,
                queue : newQueue,
                idx : newIdx,
            }

        default:
            return state;
    }
}

const baseToast = {
    type : "none",
    msg : ""
}

function toastReducer(state=baseToast, action){
    switch(action.type){
        case SET_TOAST:
            return{
                msg : action.toast.msg,
                type : action.toast.type
            }
        case CLEAR_TOAST:
            return baseToast;
        default:
            return state;

    }
}

const baseShuffle = {
    shuffle : "ready"
}

function shuffleReducer(state=baseShuffle, action){
    switch(action.type){
        case SET_SHUFFLE:
            return{
                shuffle : action.shuffle
            }
        default:
            return state;
    }
}

const baseModal = {
    show : false,
    type : "none",
    song : null
};

function modalReducer(state=baseModal, action){
    switch(action.type){
        case SET_MODAL_SHOW:
            return{
                ...state,
                show : action.show
            }
        case SET_MODAL_STATE:
            return{
                ...state,
                type : action.mState
            }
        case SET_MODAL_EDITED_SONG:
            return{
                ...state,
                song : action.song
            }
        default:
            return state;
    }
}

function updateReducer(state={update:true}, action){
    switch(action.type){
        case SET_FORCE_UPDATE:
            return{
                update : action.val
            }
        default:
            return state;
    }
}

function draggingReducer(state={dragging:false}, action){
    switch(action.type){
        case SET_DRAGGING:
            return{
                dragging : action.val
            }
        default:
            return state;
    }
}

function scrollReducer(state={scroll : true}, action){
    switch(action.type){
        case SET_SCROLLABLE:
            return{
                scroll : action.val
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    song : songReducer,
    queue : queueReducer,
    toast : toastReducer,
    shuffle : shuffleReducer,
    modal : modalReducer,
    update : updateReducer,
    drag : draggingReducer,
    scroll : scrollReducer
});

export default rootReducer;
