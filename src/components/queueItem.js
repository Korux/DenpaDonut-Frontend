import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import globalVars from '../global';
import { removeFromQueue, setQueueIdx, setSongPlaying } from '../redux/actions';
import { getQueue, getSong } from '../redux/selectors';

import { MdCancel,MdPlayCircle,MdPauseCircle } from 'react-icons/md';

const QueueImage = styled.img`
    width : auto;
    height : 90%;
    background-color:${({ theme }) => theme.queueImageBackground};
    border-radius : 10px;
`;

const QueueTitleContainer = styled.div`
    width : 70%;
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

//-----------

const QueueDuration = styled.span`
    width : 50%;
    font-size : 18px;
    letter-spacing : 0.3px;
    color : ${({ theme }) => theme.queueTextLight};
`;

const QueueRemoveButton = styled(MdCancel)`
width : 2rem;
height : 2rem;
margin : 10px auto;
color : rgb(120,120,120);
&:hover{
    cursor : pointer;
    color : rgb(210,210,210);
}

`;

//------------


const QueueNumber = styled.div`
    width : 50%;
    height : auto;
    font-size : 1.5rem;
    text-align : center;
    color : ${({ theme }) => theme.queueTextDark};
`;

const QueuePlay = styled(MdPlayCircle)`
    width : 2rem;
    height : 2rem;
`;

const QueuePause = styled(MdPauseCircle)`
    width : 2rem;
    height : 2rem;
`;

const QueuePlayNewSong = styled(MdPlayCircle)`
    width : 2rem;
    height : 2rem;
`;

const QueueItemColDuration = styled.div`
    width  :10%;
    height : 100%;
    display : flex;
    align-items : center;
`;

const QueueItemColNumbers = styled(QueueItemColDuration)`
    justify-content : center;
`;



const QueueItemContainer = styled.div`
    width : 80%;
    height : 20%;
    display : flex;
    align-items : center;
    justify-content : space-between;
    margin : 25px auto;

    &:hover{
        background-color : ${({theme}) => theme.queueItemBackground};
        border-radius : 5px;
    }

    ${QueueRemoveButton}{
        display : none;
    }

    &:hover ${QueueRemoveButton}{
        display : block;
    }
`;

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

            <QueueItemColNumbers
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>

                    {currIdx === id && songPlaying && <QueuePause onClick={() => dispatch(setSongPlaying(false))}/>}
                    {currIdx === id && !songPlaying && <QueuePlay onClick={() => dispatch(setSongPlaying(true))}/>}
                    {currIdx !== id && !isHovering &&<QueueNumber>{id+1}</QueueNumber>}
                    {currIdx !== id && isHovering &&<QueuePlayNewSong onClick={() => dispatch(setQueueIdx(id))}/>}

            </QueueItemColNumbers>

            <QueueImage src={globalVars.server + '/pic/' + data.picid}/>
                <QueueTitleContainer>
                    <QueueTitle>
                        {data.title}
                    </QueueTitle>
                    <QueueArtist>
                        {data.artist}
                    </QueueArtist>
                </QueueTitleContainer>

            <QueueItemColDuration>
                <QueueDuration>{Math.floor(data.duration / 60)}:{data.duration%60 < 10 ? '0' : ''}{Math.floor(data.duration%60)}</QueueDuration>
                <QueueRemoveButton hidden={currIdx === id}onClick={() => dispatch(removeFromQueue(id))}/>
            </QueueItemColDuration>
        </QueueItemContainer>
    );
}

export default QueueItem;
