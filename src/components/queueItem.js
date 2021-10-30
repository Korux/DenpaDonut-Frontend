import React from 'react';
import styled from 'styled-components';

import globalVars from '../global';

const QueueItemContainer = styled.div`
    width : 95%;
    height : 75px;
    border-radius : 10px;
    background-color : ${({ theme }) => theme.queueItemBackground};
    display : flex;
    align-items : center;
    margin : 10px;
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

function QueueItem({data, id}){

    return(
        <QueueItemContainer>
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
