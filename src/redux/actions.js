export const SET_SONG = "SET_SONG";
export const SET_QUEUE = "SET_QUEUE";
export const CLEAR_SONG = "CLEAR_SONG";
export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const SET_TOAST = "SET_TOAST";
export const CLEAR_TOAST = "CLEAR_TOAST";
export const SET_SHUFFLE = "SET_SHUFFLE";
export const SET_QUEUE_IDX = "SET_QUEUE_IDX";
export const SET_MODAL_SHOW = "SET_MODAL_SHOW";
export const SET_MODAL_STATE = "SET_MODAL_STATE";
export const SET_MODAL_EDITED_SONG = "SET_MODAL_EDITED_SONG";

export function setSong(song){
    return { type : SET_SONG, song };
}

export function clearSong(){
    return { type : CLEAR_SONG };
}

export function setQueueIdx(idx){
    return { type : SET_QUEUE_IDX, idx };
}

export function setQueue(queue){
    return {type : SET_QUEUE, queue };
}

export function clearQueue(){
    return { type : CLEAR_QUEUE };
}

export function setToast(toast){
    return { type : SET_TOAST, toast };
}

export function clearToast(){
    return { type : CLEAR_TOAST };
}

export function setShuffleState(shuffle){
    return { type : SET_SHUFFLE, shuffle };
}

export function setModalState(mState){
    return { type : SET_MODAL_STATE, mState };
}

export function setModalShow(show){
    return { type : SET_MODAL_SHOW, show };
}

export function setModalEditedSong(song){
    return { type : SET_MODAL_EDITED_SONG, song };
}
