import React, {Fragment} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Logo from '../images/logo.png';

import SearchFilter from './searchFilter';
import SongModal from './songModal';

import { useDispatch} from 'react-redux';
import { setModalState, setModalShow } from '../redux/actions';

const StyledNavbar = styled(Navbar)`
    display:flex;
    background-color:${({ theme }) => theme.navbar};
    z-index : 990;
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

const StyledButton = styled.button``;

const FaIcon = styled(FontAwesomeIcon)`
    color:gray;
    margin:0px 10px;

    &:hover{
        color:rgb(180,180,180)
    }

`;

function NavBar(){

    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(setModalState("add"));
        dispatch(setModalShow(true));
    };

    return(
        <Fragment>
            <SongModal/>
            <StyledNavbar variant="dark" fixed="top">
                <NavColumn>
                    <StyledLink to="/home">
                        <StyledBrand><img src={Logo} alt="logo"/></StyledBrand>
                    </StyledLink>
                    <StyledLink to="/playlist">
                        <FaIcon size={"lg"}icon={faSearch}/>
                    </StyledLink>
                    <StyledLink to="/songs">
                        <FaIcon size={"lg"}icon={faSearch}/>
                    </StyledLink>
                </NavColumn>

                <NavColumn>
                    <SearchFilter/>
                </NavColumn>

                <NavColumn>
                    <StyledButton onClick={showModal}>
                        <FaIcon size={"lg"}icon={faSearch}/>
                    </StyledButton>
                </NavColumn>

            </StyledNavbar>
        </Fragment>
    );

};

export default NavBar;
