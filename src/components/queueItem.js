import React, {useState, useCallback, useMemo, useEffect} from 'react';
import styled from 'styled-components';

import globalVars from '../global';

import {FaBars} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setDragging } from '../redux/actions';

const QueueItemContainer = styled.div`
    width : 95%;
    height : 75px;
    border-radius : 10px;
    background-color : ${({ theme }) => theme.queueItemBackground};
    display : flex;
    align-items : center;
    margin : 10px;
`;

const QueueDrag = styled.div`
    width : 5%;
    height : 100%;
    display : flex;
    align-items : center;
    justify-content:center;
`;

const QueueDragIcon = styled(FaBars)`
    cursor: ${({dragging}) => dragging ? '-webkit-grabbing' : '-webkit-grab'};
`;


const QueueImage = styled.img`
    width : auto;
    height : 90%;
    background-color:${({ theme }) => theme.queueImageBackground};
    border-radius : 10px;
    margin-left : 5px;
`;

const QueueTitleContainer = styled.div`
    width : 32%;
    height : fit-content;
    margin-left : 10px;

`;

const QueueTitle = styled.div`
    text-align : left;
    width : 100%;
`;

const QueueArtist = styled.div`
    text-align : left;
    width : 100%;
`;

const QueueAlbum = styled.div`
    width : 32%;
    text-align : left;
`;

const QueueYear = styled.div`
    width : 32%;
    text-align : left;
`;


const QueueDuration = styled.span`
    width : 4%;
    text-align : right;
    margin-right : 10px;
`;

const POSITION = {x: 0, y: 0};

function QueueItem({data, id, onDrag, onDragEnd}){

    const dispatch = useDispatch();

    const [state, setState] = useState({
        isDragging: false,
        origin: POSITION,
        translation: POSITION
      });
        
      const handleMouseDown = useCallback(({clientX, clientY}) => {
        setState(state => ({
          ...state,
          isDragging: true,
          origin: {x: clientX, y: clientY}
        }));
        dispatch(setDragging(true));

      }, []);
        
      const handleMouseMove = useCallback(({clientX, clientY}) => {
        const translation = {x: clientX - state.origin.x, y: clientY - state.origin.y};
            
        setState(state => ({
          ...state,
          translation
        }));
            
        onDrag({translation, id});
      }, [state.origin, onDrag, id]);
        
      const handleMouseUp = useCallback(() => {
        setState(state => ({
          ...state,
          isDragging: false
        }));
        dispatch(setDragging(false));
        onDragEnd();
      }, [onDragEnd]);
        
      useEffect(() => {
        if (state.isDragging) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        } else {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
    
          setState(state => ({...state, translation: {x: 0, y: 0}}));
        }
      }, [state.isDragging, handleMouseMove, handleMouseUp]);
        
      const styles = useMemo(() => ({
        transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
        zIndex: state.isDragging ? 2 : 1,
      }), [state.isDragging, state.translation]);

 
    return(
        <QueueItemContainer style={styles}>
            <QueueDrag>
                <QueueDragIcon onMouseDown={handleMouseDown} dragging={state.isDragging}/>
            </QueueDrag>
            <QueueImage src={globalVars.server + '/pic/' + data.picid}/>
            <QueueTitleContainer>
                <QueueTitle>
                    {data.title}
                </QueueTitle>
                <QueueArtist>
                    {data.artist}
                </QueueArtist>
            </QueueTitleContainer>
            <QueueAlbum>
                {data.album}
            </QueueAlbum>
            <QueueYear>
                {data.year}
            </QueueYear>
            <QueueDuration>{Math.floor(data.duration / 60)}:{data.duration%60 < 10 ? '0' : ''}{Math.floor(data.duration%60)}</QueueDuration>
        </QueueItemContainer>
    );
}

export default QueueItem;
