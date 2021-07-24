export const SET_SONG = "SET_SONG";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const CLEAR_SONG = "CLEAR_SONG";
export const CLEAR_PLAYLIST = "CLEAR_PLAYLIST";
export const SET_TOAST = "SET_TOAST";
export const CLEAR_TOAST = "CLEAR_TOAST";
export const SET_SHUFFLE = "SET_SHUFFLE";
export const SET_PLAYLIST_IDX = "SET_PLAYLIST_IDX";

export function setSong(song){
    return { type : SET_SONG, song };
}

export function clearSong(){
    return { type : CLEAR_SONG };
}

export function setPlaylistIdx(idx){
    return { type : SET_PLAYLIST_IDX, idx };
}

export function setPlaylist(playlist){
    return {type : SET_PLAYLIST, playlist };
}

export function clearPlaylist(){
    return { type : CLEAR_PLAYLIST };
}

export function setToast(toast){
    return { type : SET_TOAST, toast };
}

export function clearToast(){
    return { type : CLEAR_TOAST };
}

export function setShuffleState(shuffle){
    return {type : SET_SHUFFLE, shuffle };
}