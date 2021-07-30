import { combineReducers } from 'redux';

import {
    SET_SONG,
    SET_PLAYLIST,
    CLEAR_SONG,
    CLEAR_PLAYLIST,
    SET_TOAST,
    CLEAR_TOAST,
    SET_SHUFFLE,
    SET_PLAYLIST_IDX,
    SET_MODAL_SHOW,
    SET_MODAL_STATE
} from './actions.js';

const baseSong = {
    album : null,
    artist : null,
    artists : null,
    title : null,
    year : null,
    pic : null,
    mp3 : null,
    nosong : true
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
                nosong : false
            }
        case CLEAR_SONG:
            return baseSong;
        default:
            return state;
    }
}

const basePlaylist = {
    playlist : null,
    noplaylist : true,
    idx : -1,
}

function playlistReducer(state=basePlaylist, action){
    switch(action.type){
        case SET_PLAYLIST:
            return{
                ...state,
                playlist : action.playlist,
                noplaylist : false,
            }
        case CLEAR_PLAYLIST:
            return basePlaylist;
        case SET_PLAYLIST_IDX:
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

const rootReducer = combineReducers({
    song : songReducer,
    playlist : playlistReducer,
    toast : toastReducer,
    shuffle : shuffleReducer,
    modal : modalReducer
});

export default rootReducer;
