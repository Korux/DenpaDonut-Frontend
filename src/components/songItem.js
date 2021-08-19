import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { setModalState, setModalEditedSong, setModalShow, setQueue, setQueueIdx, setSongPlaying } from '../redux/actions';
import { getQueue, getSong } from '../redux/selectors';


import globalVars from '../global';



const SongContainer = styled.div`
    width : 18%;
    min-width : 225px;
    height : auto;
    margin : 2%;
    position : relative;
    background-color:${({ theme }) => theme.songContainerBackground};

`;

const SongImage = styled.img`
    width : 95%;
    height : auto;
    position : absolute;
    top : 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color : ${({ theme }) => theme.songImageBackground};
`;

const QueueIcon = styled(FontAwesomeIcon)`
    position : absolute;
    bottom : 0px;
    right : 0px;
    background-color:black;
    &:hover{
        cursor : pointer;
    }
`;

const QueueNextIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color:black;
    &:hover{
        cursor : pointer;
    }
`;

const EditIcon = styled(FontAwesomeIcon)`
    position : absolute;
    bottom : 0px;
    left : 0px;
    background-color:black;

    &:hover{
        cursor : pointer;
    }
`;

const PlayIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color:red;
    &:hover{
        cursor : pointer;
    }
`;

const PauseIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color:blue;
    &:hover{
        cursor : pointer;
    }
`;

const SongHoverDim = styled.div`
    width : 100%;
    height : 100%;
    position : absolute;
    top : 0;
    left : 0;
    background-color:rgba(0,0,0,0.35);
    transition : opacity 0.3s ease-in-out;
    pointer-events:none;
`;

const ImageContainer = styled.div`
    width : 100%;
    height : 0;
    position : relative;
    padding-top : 100%;


    ${EditIcon}{
        display : none;
    }

    ${QueueIcon}{
        display : none;
    }

    ${QueueNextIcon}{
        display : none;
    }

    ${PlayIcon}{
        display : none;
    }

    ${PauseIcon}{
        display : none;
    }

    ${SongHoverDim}{
        opacity : 0;
    }

    &:hover ${EditIcon}{
        display : inline-block;
    }

    &:hover ${QueueIcon}{
        display : inline-block;
    }

    &:hover ${QueueNextIcon}{
        display : inline-block;
    }

    &:hover ${PlayIcon}{
        display : inline-block;
    }

    &:hover ${PauseIcon}{
        display : inline-block;
    }

    &:hover ${SongHoverDim}{
        opacity : 1;
    }
`;

const InfoContainer = styled.div`
    width : 100%;
    height : auto;
    overflow : hidden;
    position : relative;
    background-color : ${({ theme }) => theme.songInfoBackground};
    &:before{
        content : "";
        float : left;
        padding-top : 40%;
    }
`;

const InfoMainText = styled.div`
    width : 100%;
    text-align : left;

`;

const InfoSubText = styled.div`
    width : 100%;
    text-align : left;
`;

function SongItem({data}){

    const dispatch = useDispatch();
    var queue = useSelector(getQueue).queue;
    var noQueue = useSelector(getQueue).noqueue;
    var queueIdx = useSelector(getQueue).idx;
    var currSongId = useSelector(getSong).mp3;
    var currSongPlaying = useSelector(getSong).playing;

    const editClick = () => {
        dispatch(setModalEditedSong(data));
        dispatch(setModalState("edit"));
        dispatch(setModalShow(true));
    };

    const queueNextClick = () => {
        let newQueue = noQueue ? [] : queue.slice();
        let newIdx = queueIdx === -1 ? 0 : queueIdx + 1;
        newQueue.splice(newIdx,0,data);
        dispatch(setQueue(newQueue));
        dispatch(setQueueIdx(newIdx));
    };

    const playClick = () => {
        dispatch(setSongPlaying(true));
    };

    const pauseClick = () => {
        dispatch(setSongPlaying(false));
    };

    const queueClick = () => {
        let newQueue = noQueue ? [] : queue.slice();
        newQueue.push(data);
        dispatch(setQueue(newQueue));
        if(queueIdx === -1) dispatch(setQueueIdx(0));
    };

    return(
        <SongContainer>
            <ImageContainer>
                <SongImage src={globalVars.server + "/pic/" + data.picid}/>
                <SongHoverDim/>
                <QueueIcon size={"lg"}icon={faSearch} onClick={queueClick}/>
                {
                    data.songid !== currSongId &&
                    <QueueNextIcon size={"lg"}icon={faSearch} onClick={queueNextClick}/>
                }
                <EditIcon size={"lg"}icon={faSearch} onClick={editClick}/>
                {
                    data.songid === currSongId && !currSongPlaying &&
                    <PlayIcon size={"lg"}icon={faSearch} onClick={playClick}/>
                }
                {
                    data.songid === currSongId && currSongPlaying &&
                    <PauseIcon size={"lg"}icon={faSearch} onClick={pauseClick}/>
                }

            </ImageContainer>
            <InfoContainer>
                <InfoMainText>
                    {data.title}
                </InfoMainText>
                <InfoSubText>
                    Album:{data.album}
                </InfoSubText>
                <InfoSubText>
                    Artist:{data.artist}
                </InfoSubText>
            </InfoContainer>
        </SongContainer>
    );
}

export default SongItem;
