import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { setModalState, setModalEditedSong, setModalShow, setQueue, setQueueIdx, setSongPlaying, setToast } from '../redux/actions';
import { getQueue, getSong } from '../redux/selectors';

import {CgPlayListAdd} from 'react-icons/cg';
import {FaTrashAlt} from 'react-icons/fa';

import globalVars from '../global';


const SongHoverDim = styled.div`
    width : 100%;
    height : 100%;
    border-radius : 10px;
    position : absolute;
    top : 0;
    left : 0;
    background-color:rgba(200,200,200,0.05);
    transition : opacity 0.2s ease-in-out;
    pointer-events:none;
`;

const ImageHoverDim = styled.div`
    width : 100%;
    height : 35%;
    position : absolute;
    bottom : 0;
    left : 0;
    background-image : linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0));
    transition : opacity 0.2s ease-in-out;
    pointer-events:none;
`;

const SongContainer = styled.div`
    width : 20%;
    min-width : 225px;
    max-width : 250px;
    border-radius : 10px;
    height : auto;
    margin : 2%;
    position : relative;
    background-color:${({ theme }) => theme.songContainerBackground};
    
    ${SongHoverDim}{
        opacity : 0;
    }

    &:hover ${SongHoverDim}{
        opacity : 1;
    }

`;

const SongImage = styled.img`
    width : 100%;
    height : 100%;
`;

const QueueIcon = styled(CgPlayListAdd)`
    position : absolute;
    top : 86%;
    right : 5%;
    &:hover{
        cursor : pointer;
    }
    transition : all 0.2s ease-in-out;
    
`;

const DeleteIcon = styled(FaTrashAlt)`
    position : absolute;
    top : 87.5%;
    right : 38%;
    &:hover{
        cursor : pointer;
    }
    transition : all 0.2s ease-in-out;
    
`;

const QueueNextIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color:rgba(0,0,0,0);
    &:hover{
        cursor : pointer;
    }
`;

const EditIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 87.5%;
    right : 22%;
    &:hover{
        cursor : pointer;
    }
    transition : all 0.2s ease-in-out;
`;

const PlayIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color:rgba(0,0,0,0);
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
    background-color:rgba(0,0,0,0);
    &:hover{
        cursor : pointer;
    }
`;

const CenterButtonContainer = styled.div`
    width : 30%;
    height : 30%;
    border-radius : 50%;
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color : ${({ theme }) => theme.songPlayPauseColor};
    &:hover{
        cursor : pointer;
    }
    transition : opacity 0.2s ease-in-out;
`;

const CurrentCenterButtonContainer = styled(CenterButtonContainer)``;


const ImageContainer = styled.div`
    width : 100%;
    height : 0;
    position : relative;
    padding-top : 100%;
`;

const ImageSubContainer = styled.div`
    width : 85%;
    height : 85%;
    position : absolute;
    top : 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size : 0.5rem;

    background-color : ${({ theme }) => theme.songImageBackground};

    ${ImageHoverDim}{
        opacity : 0;
    }

    &:hover ${ImageHoverDim}{
        opacity : 1;
    }
    ${EditIcon}{
        opacity : 0;
        bottom : 5px;
    }

    ${QueueIcon}{
        opacity : 0;
        bottom : 5px;
    }

    ${DeleteIcon}{
        opacity : 0;
        bottom : 5px;
    }

    ${CenterButtonContainer}{
        opacity : 0;
    }

    ${CurrentCenterButtonContainer}{
        opacity : 1;
    }

    &:hover ${EditIcon}{
        opacity : 1;
        bottom : 10px;
    }

    &:hover ${QueueIcon}{
        opacity : 1;
        bottom : 9px;
    }

    &:hover ${DeleteIcon}{
        opacity : 1;
        bottom : 9px;
    }

    &:hover ${CenterButtonContainer}{
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
        padding-top : 35%;
    }
`;

const InfoMainText = styled.div`
    width : 95%;
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    margin : 0px 0 5px 5px;
    font-size : 1.15rem;
    color : rgb(240,240,240);
`;

const InfoSubText = styled.div`
    width : 100%;
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    margin : 0 5px;
    font-size : 0.9rem;
    color : rgb(180,180,180);
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
        dispatch(setToast({type:"success",msg:"Added to Queue"}));
        if(queueIdx === -1) dispatch(setQueueIdx(0));
    };

    const deleteClick = () => {
        dispatch(setModalEditedSong(data));
        dispatch(setModalState("delete"));
        dispatch(setModalShow(true));
    };

    return(
        <SongContainer>
            <SongHoverDim/>
            <ImageContainer>
                <ImageSubContainer>
                    <ImageHoverDim/>
                    <SongImage src={globalVars.server + "/pic/" + data.picid} alt={"album art"}/>
                    {
                        data.songid === currSongId && !currSongPlaying &&
                        <CenterButtonContainer onClick={playClick}>
                            <PlayIcon size={"3x"}icon={faPlay}/>
                        </CenterButtonContainer>

                    }
                    {
                        data.songid === currSongId && currSongPlaying &&
                        <CurrentCenterButtonContainer onClick={pauseClick}>
                        <PauseIcon size={"3x"}icon={faPause}/>
                        </CurrentCenterButtonContainer>
                    }
                    {
                        data.songid !== currSongId &&
                        <CenterButtonContainer onClick={queueNextClick}>
                        <QueueNextIcon size={"3x"}icon={faPlay}/>
                        
                        </CenterButtonContainer>
                    }
                    <QueueIcon size={"1.5rem"} onClick={queueClick} title="Add to Queue"/>
                    <EditIcon size={"2x"}icon={faEdit} onClick={editClick}  title="Edit Song"/>
                    <DeleteIcon size={"1.05rem"} onClick={deleteClick} title="Delete Song"/>
                </ImageSubContainer>

            </ImageContainer>
            <InfoContainer>
                <InfoMainText>
                    {data.title}
                </InfoMainText>
                <InfoSubText>
                    {data.artist}
                </InfoSubText>
                <InfoSubText>
                    {data.album === '-' ? "" : data.album}
                </InfoSubText>
            </InfoContainer>
        </SongContainer>
    );
}

export default SongItem;
