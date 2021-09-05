import React, {Fragment} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import { MdLibraryMusic, MdLibraryAdd, MdQueueMusic } from 'react-icons/md';

import Logo from '../images/logo.png';

import SearchFilter from './searchFilter';
import SongModal from './songModal';

import { useDispatch} from 'react-redux';
import { setModalState, setModalShow } from '../redux/actions';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledNavbar = styled(Navbar)`
    display:flex;
    background-color:${({ theme }) => theme.navbar};
    z-index : 990;
    height : 60px;
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
    flex : 1;
    text-align : left;
`;

const NavColumnSearch = styled.div`
    flex : 1;
`;

const StyledLink = styled(Link)`
margin : 0 10px;
    &:hover{
        cursor:pointer;
    }
`;

const PlaylistIcon = styled(MdQueueMusic)`
    color : ${({theme}) => theme.navbarIconColor};

`;

const MusicLibIcon = styled(MdLibraryMusic)`

    color : ${({theme}) => theme.navbarIconColor};
`;

const AddSongIcon = styled(MdLibraryAdd)`
    color : ${({theme}) => theme.navbarIconColor};
`;

const StyledTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: 'rgba(90,90,90,0.9)',
      color: 'rgba(255, 255, 255, 0.87)',
      fontSize: 15,
      marginTop : 25,
      borderRadius : 0,
    },
  }))(Tooltip);

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

                    <StyledLink to="/home" replace>
                        <StyledBrand title="DenpaDonut Home"><img src={Logo} alt="logo"/></StyledBrand>
                    </StyledLink>

                    <StyledTooltip title="Queue">
                        <StyledLink to="/queue" replace>
                            <PlaylistIcon size="2rem"/>
                        </StyledLink>
                    </StyledTooltip>

                    <StyledTooltip title="Songs">
                        <StyledLink to="/songs" replace>
                            <MusicLibIcon size="1.5rem"/>        
                        </StyledLink>
                    </StyledTooltip>

                    <StyledTooltip title="Add Song">
                        <StyledLink to="/" onClick={ (event) => event.preventDefault() }>
                            <AddSongIcon size="1.5rem" onClick={showModal}/>
                        </StyledLink>
                    </StyledTooltip>
                </NavColumn>

                <NavColumnSearch>
                    <SearchFilter/>
                </NavColumnSearch>

                <NavColumn>
                </NavColumn>

            </StyledNavbar>
        </Fragment>
    );

};

export default NavBar;
