import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getSong } from '../redux/selectors';

import AudioPlayer from './audioPlayer';

const BottomBarContainer = styled.div`
    width : 100%;
    height : 20%;
    position : fixed;
    bottom : 0;
    right : 0;
    background-color:black;
`;


function BottomBar(){

    var currSong = useSelector(getSong);

    return(
        <BottomBarContainer>
            {currSong.artist}
            <AudioPlayer/>
        </BottomBarContainer>

    );
}

export default BottomBar;
