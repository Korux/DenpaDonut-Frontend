import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSong } from '../redux/selectors';

import globalVars from '../global';

const SongInfoContainer = styled.div`
    width : 20%;
    height : 100px;
    float : left;
    display : flex;
    justify-content : center;
    align-items : center;
    position : relative;
`;

const SongInfoImage = styled.img`
    width : auto;
    height : 70%;
    position : absolute;
    left : 14px;
    background-color:${({theme}) => theme.songImageBackground};
`;

const SongInfo = styled.div`
    position : absolute;
    left : 86px;
    width : calc(100% - 86px);
`;

const SongInfoTitle = styled.div`
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    margin-left : 10px;
    font-size : 0.9rem;
    color : rgb(240,240,240);
`;

const SongInfoArtist = styled.div`
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    margin-left : 10px;
    font-size : 0.8rem;
    color : rgb(180,180,180);
`;

function BottomSongInfo(){

    var currSong = useSelector(getSong);

    return(
        <SongInfoContainer>
            {currSong.pic === null ? null : <SongInfoImage src={globalVars.server + '/pic/' + currSong.pic} alt="album art"/>}
            <SongInfo>
                <SongInfoTitle>
                    {currSong.title}
                </SongInfoTitle>
                <SongInfoArtist>
                    {currSong.artist}
                </SongInfoArtist>
            </SongInfo>
        </SongInfoContainer>

    );
}

export default BottomSongInfo;