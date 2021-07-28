import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../images/logo.png';

const StyledNavbar = styled(Navbar)`
    display:flex;
    background-color:${({ theme }) => theme.navbar};
`;

const StyledBrand = styled(Navbar.Brand)`
    text-align : center;
    margin : 0 auto;
    align : center;

    img{
        
        height:45px;
    }
`;

const NavColumn = styled.div`
    flex:1;
`;

const StyledLink = styled(Link)`
    &:hover{
        cursor:pointer;
    }
`;

const FaIcon = styled(FontAwesomeIcon)`
    color:gray;
    margin:0px 10px;

    &:hover{
        color:rgb(180,180,180)
    }

`;



function NavBar(){

    return(
        <StyledNavbar variant="dark" fixed="top">
            <NavColumn>
                <StyledLink to="/home">
                    <StyledBrand><img src={Logo} alt="logo"/></StyledBrand>
                </StyledLink>
            </NavColumn>

            <NavColumn>
            </NavColumn>

            <NavColumn>
            </NavColumn>

        </StyledNavbar>
    );

};

export default NavBar;
