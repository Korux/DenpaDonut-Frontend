import React, { Fragment } from 'react';
import styled from 'styled-components';

import AudioPlayer from './audioPlayer';
import BottomSongInfo from './bottomSongInfo';
import PlaylistPullout from './playlistPullout';

const BottomBarContainer = styled.div`
    width : 100%;
    height : 100px;
    position : fixed;
    bottom : 0;
    right : 0;
    background-color:${({theme}) => theme.bottomBarBackground};
    border-top : 1px solid rgb(80,80,80);
    z-index : 3;
`;

function BottomBar(){

    return(
        <Fragment>
            <PlaylistPullout/>
            <BottomBarContainer>
                <BottomSongInfo/>
                <AudioPlayer/>
            </BottomBarContainer>
        </Fragment>

    );
}

export default BottomBar;
