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

function QueueItem({data}){
    console.log(data);
    return(
        <QueueItemContainer>
            <QueueImage src={globalVars.server + '/pic/' + data.picid}/>
            {data.title}
        </QueueItemContainer>
    );
}

export default QueueItem;
