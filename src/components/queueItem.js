import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import globalVars from '../global';
import { removeFromQueue, setQueueIdx, setSongPlaying } from '../redux/actions';
import { getQueue, getSong } from '../redux/selectors';

const QueueItemContainer = styled.div`
    width : 90%;
    height : 75px;
    display : flex;
    align-items : center;
    justify-content : center;
    margin : 10px auto;

    &:hover{
        background-color : ${({theme}) => theme.queueItemBackground};
        border-radius : 5px;
    }
`;

const QueueImage = styled.img`
    width : auto;
    height : 70%;
    background-color:${({ theme }) => theme.queueImageBackground};
    border-radius : 10px;
`;

const QueueTitleContainer = styled.div`
    width : 60%;
    height : fit-content;
    margin-left : 15px;

`;

const QueueTitle = styled.div`
    text-align : left;
    width : 100%;
    font-size : 16px;
    letter-spacing : 0.3px;
    color : ${({ theme }) => theme.queueTextLight};
`;

const QueueArtist = styled.div`
    text-align : left;
    width : 100%;
    font-size : 13px;
    color : ${({ theme }) => theme.queueTextDark};
`;


const QueueDuration = styled.span`
    text-align : right;
`;

const QueueRemoveButton = styled.button`
`;

const QueueNumberingContainer = styled.div`
    height : 100%;
    width : auto;

`;

const QueueNumber = styled.div``;

const QueuePlay = styled.button``;

const QueuePause = styled.button``;

const QueuePlayNewSong = styled.button``;

function QueueItem({data, id}){

    const dispatch = useDispatch();
    var currIdx = useSelector(getQueue).idx;
    var songPlaying = useSelector(getSong).playing;

    const [isHovering, setHovering] = React.useState(false);

    const handleMouseOver = () => {
        setHovering(true);
      };
    
      const handleMouseOut = () => {
        setHovering(false);
      };

    return(
        <QueueItemContainer>
            <QueueNumberingContainer
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            >
                {currIdx === id && songPlaying && <QueuePause onClick={() => dispatch(setSongPlaying(false))}>Pause</QueuePause>}
                {currIdx === id && !songPlaying && <QueuePlay onClick={() => dispatch(setSongPlaying(true))}>Play</QueuePlay>}
                {currIdx !== id && !isHovering &&<QueueNumber>{id+1}</QueueNumber>}
                {currIdx !== id && isHovering &&<QueuePlayNewSong onClick={() => dispatch(setQueueIdx(id))}>Play</QueuePlayNewSong>}
            </QueueNumberingContainer>
            <QueueImage src={globalVars.server + '/pic/' + data.picid}/>
            <QueueTitleContainer>
                <QueueTitle>
                    {data.title}
                </QueueTitle>
                <QueueArtist>
                    {data.artist}
                </QueueArtist>
            </QueueTitleContainer>
            <QueueDuration>{Math.floor(data.duration / 60)}:{data.duration%60 < 10 ? '0' : ''}{Math.floor(data.duration%60)}</QueueDuration>
            <QueueRemoveButton disabled={currIdx === id} onClick={() => dispatch(removeFromQueue(id))}>Remove</QueueRemoveButton>
        </QueueItemContainer>
    );
}

export default QueueItem;
