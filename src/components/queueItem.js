import React from 'react';
import styled from 'styled-components';

import globalVars from '../global';

const QueueItemContainer = styled.div`
    width : 95%;
    height : 10vh;
    margin : 10px;
    border-radius : 10px;
    background-color : ${({ theme }) => theme.queueItemBackground};
    position : relative;
`;

const QueueImage = styled.img`
    width : auto;
    height : 90%;
    position : absolute;
    left : 10px;
    top : 50%;
    transform : translateY(-50%);
    background-color:${({ theme }) => theme.queueImageBackground};
`;

const QueueDuration = styled.span`
    position : absolute;
    right : 10px;
`;

function QueueItem({data}){
    console.log(data);
    return(
        <QueueItemContainer>
            <QueueImage src={globalVars.server + '/pic/' + data.picid}/>
            {data.title}
            <QueueDuration>{Math.floor(data.duration / 60)}:{data.duration%60 < 10 ? '0' : ''}{Math.floor(data.duration%60)}</QueueDuration>
        </QueueItemContainer>
    );
}

export default QueueItem;
