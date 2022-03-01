import React from 'react';
import styled from 'styled-components';

import {FaClock, FaHashtag} from 'react-icons/fa';

const TitleNumber = styled(FaHashtag)`
    width : 10%;
`;

const TitleSong = styled.div`
    width : 75%;
    text-align : left;
    letter-spacing : 2px;
    font-size : 1.2rem;
    padding-left : 2rem;
`;

const TitleDuration = styled(FaClock)`
    width : 15%;
`;

const QueueTitleContainer = styled.div`
    width : 80%;
    height : 100%;
    margin : 0px auto;
    display : flex;
    align-items : center;
    justify-content : center;
    border-bottom : 1px solid rgb(180,180,180);
`;

const QueueHeaderContainer = styled.div`
    width : 100%;
    height : 50px;
    position : fixed;
    transition : all 0.3s ease-in-out;
    bottom : ${({open}) => open ? '45%' : '-50px'};
    background-color :${({theme}) => theme.queueBackground};
    z-index : 999;

`;

function QueueHeader({open}){

    return(
        <>
            <QueueHeaderContainer open={open}>
                <QueueTitleContainer>
                    <TitleNumber/>
                    <TitleSong>SONG</TitleSong>
                    <TitleDuration/>
                </QueueTitleContainer>
            </QueueHeaderContainer>
        </>
    );

}

export default QueueHeader;