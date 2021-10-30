import React from 'react';
import styled from 'styled-components';
import EmptyImg from '../images/empty.png';
import {Link} from 'react-router-dom';

const ErrorMsg = styled.div`
    font-size : 30px;
    font-weight : 700;
`;

const ReturnMsg = styled(Link)`
    font-size : 15px;
`;


function ErrorPage(){

    return(
        <div>
            <img style={{width : '200px'}} src={EmptyImg} alt={"error image"}/>
            <ErrorMsg>
                Page not Found
            </ErrorMsg>
            <ReturnMsg to={"/"} replace>
                go to home
            </ReturnMsg>
        </div>
    );

}

export default ErrorPage;
