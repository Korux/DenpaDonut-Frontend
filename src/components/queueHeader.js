import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    width : 100%;
    height : 200px;
    background-color:black;
`;

function QueueHeader(){
    return(
        <HeaderContainer>
            HEADER
        </HeaderContainer>
    );
}

export default QueueHeader;