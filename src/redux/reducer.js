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
    SET_SEARCH_FILTER,
    SET_SONG_PLAYING
} from './actions.js';

const baseSong = {
    album : null,
    artist : null,
    artists : null,
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
                artists : action.song.artists,
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

function searchReducer(state={query : ""}, action){
    switch(action.type){
        case SET_SEARCH_FILTER:
            return{
                query : action.query
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
    search : searchReducer
});

export default rootReducer;
