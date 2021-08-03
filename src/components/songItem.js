import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { setModalState, setModalEditedSong, setModalShow, setQueue, setQueueIdx } from '../redux/actions';
import { getQueue } from '../redux/selectors';


import globalVars from '../global';

const SongPopup = styled.div`
    width : 100%;
    height : 30%;
`;

const PopupAdd = styled.div`
    width : 50%;
    height : 100%;
`;

const SongContainer = styled.div`
    width : 20%;
    margin : 20px;
    position : relative;
    background-color:blue;
    ${SongPopup} {
        display:none;
    }

    &:hover ${SongPopup} {
        display : inline-block;
        background-color : black;
        position : absolute;
        bottom:0px;
        left:0px;
    }
`;

const SongImage = styled.img`
    width : 100%;
    height : 100%;
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
    background-color:black;
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
    background-color:rgba(0,0,0,0.2);
    transition : opacity 0.2s ease-in-out;
    pointer-events:none;
`;

const ImageContainer = styled.div`
    width : 100%;
    position : relative;
    height : auto;
    &:before{
        content : "";
        float : left;
        padding-top : 100%;
    }

    ${EditIcon}{
        display : none;
    }

    ${QueueIcon}{
        display : none;
    }

    ${PlayIcon}{
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

    &:hover ${PlayIcon}{
        display : inline-block;
    }

    &:hover ${SongHoverDim}{
        opacity : 1;
    }
`;

const InfoContainer = styled.div`
    width : 100%;
    position : relative;
    background-color : ${({ theme }) => theme.songInfoBackground};
    &:before{
        content : "";
        float : left;
        padding-top : 100%;
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

    const editClick = () => {
        dispatch(setModalEditedSong(data));
        dispatch(setModalState("edit"));
        dispatch(setModalShow(true));
    };

    const playClick = () => {
        // play the song
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
                <EditIcon size={"lg"}icon={faSearch} onClick={editClick}/>
                <PlayIcon size={"lg"}icon={faSearch} onClick={playClick}/>
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
