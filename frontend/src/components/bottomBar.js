import React, { Fragment, useEffect} from 'react';
import styled from 'styled-components';

import AudioPlayer from './audioPlayer';
import BottomSongInfo from './bottomSongInfo';
import QueueTab from './queueTab';
import QueuePullout from './queuePullout';
import { useDispatch, useSelector } from 'react-redux';
import { setQueueShow, setScrollable } from '../redux/actions';
import { getQueue } from '../redux/selectors';

const BottomBarContainer = styled.div`
    width : 100%;
    height : 100px;
    position : fixed;
    bottom : ${({open}) => open ? 'calc(45% + 50px)' : 0};
    right : 0;
    background-color:${({theme}) => theme.bottomBarBackground};
    border-top : 1px solid rgb(80,80,80);
    border-bottom : 1px solid rgb(80,80,80);
    transition : all 0.3s ease-in-out;
    z-index : 999;
`;

const PulloutDim = styled.a`
    display: inline-block;
    opacity :  ${({show}) => show ? '0.6' : '0'};
    pointer-events :  ${({show}) => show ? 'auto' : 'none'};
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 997;
    top: 0;
    left: 0;
    transition : all 0.3s ease-in-out; 
`;


function BottomBar(){

    var queueOpen = useSelector(getQueue).show;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScrollable(!queueOpen));
    },[queueOpen]);

    return(
        <Fragment>
            <PulloutDim show={queueOpen} onClick={() => dispatch(setQueueShow(false))}/>
            <QueueTab onClick={() => dispatch(setQueueShow(true))} show={!queueOpen}/>
            <BottomBarContainer open={queueOpen}>
                <BottomSongInfo/>
                <AudioPlayer/>
            </BottomBarContainer>
            <QueuePullout open={queueOpen}/>
        </Fragment>
    );
}

export default BottomBar;
