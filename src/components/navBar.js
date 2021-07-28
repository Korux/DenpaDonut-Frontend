import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const NavbarContainer = styled.div`
    width : 100%;
    height : 10%;
    position : fixed;
    top : 0px;
    left : 0px;
    background-color : black;
`;

const StyledLink = styled(Link)`
    &:hover{
        cursor:pointer;
    }
`;

const DDLogo = styled.img`
    width : 100px;
    hieght : 100px;
    background-color:white;
`;



function NavBar(){

    return(
        <NavbarContainer>

            <StyledLink to="/home">
                <DDLogo/>
            </StyledLink>

        </NavbarContainer>
    );

};

export default NavBar;
