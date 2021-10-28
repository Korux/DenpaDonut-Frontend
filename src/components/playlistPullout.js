import React, { Fragment } from 'react';
import styled from 'styled-components';

import {BiChevronsUp} from 'react-icons/bi';

const Pullout = styled.div`
    width : 40px;
    height : 20px;
    background-color : white;
    position : fixed;

    left : 50%;
    transform : translateX(-20px);
    border-top-left-radius : 40px;
    border-top-right-radius : 40px;
    border : 1px solid rgb(80,80,80);
    border-bottom : 1px solid ${({theme}) => theme.bottomBarBackground};
    z-index : 100;
    background-color:${({theme}) => theme.bottomBarBackground};

    display : flex;
    justify-content : center;
    align-items : center;
`;

const HoverZone = styled.div`
    width : 100px;
    height : 100px;
    position : fixed;
    bottom : 100px;
    left : 50%;
    transform : translateX(-50px);
    z-index : 999;

    &:hover{
        background-color:white;
    }

`;

const PulloutIcon = styled(BiChevronsUp)`
    color : ${({theme}) => theme.navbarIconColor};
    margin-top : 2px;
`;

function PlaylistPullout(){

    return(
        <HoverZone>
            <Pullout>
                <PulloutIcon size={"1.4rem"}/>
            </Pullout>
        </HoverZone>
    );

}

export default PlaylistPullout;