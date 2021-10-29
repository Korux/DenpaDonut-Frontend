import React, { Fragment } from 'react';
import styled from 'styled-components';

import {BiChevronsUp} from 'react-icons/bi';

const Pullout = styled.div`
    width : 40px;
    height : 18px;
    background-color : white;
    position : fixed;
    bottom : 0;
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
    transition : all 0.1s ease-in-out;
    cursor : pointer;
    
`;

const HoverZone = styled.div`
    width : 200px;
    height : 120px;
    position : fixed;
    bottom : 80px;
    left : 50%;
    transform : translateX(-100px);
    z-index : 1;
    display : ${({show}) => show ? 'block' : 'none'};
    &:hover ${Pullout}{
        bottom : 20px;
    }

`;

const PulloutIcon = styled(BiChevronsUp)`
    color : ${({theme}) => theme.navbarIconColor};
    margin-top : 3px;
`;

function QueueTab({onClick, show}){
    return(
        <HoverZone show={show}>
            <Pullout onClick={onClick}>
                <PulloutIcon size={"1.4rem"}/>
            </Pullout>
        </HoverZone>
    );

}

export default QueueTab;