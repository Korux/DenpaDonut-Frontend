import React, { useEffect } from 'react';
import styled from 'styled-components';

import {BsSearch} from 'react-icons/bs';

import { useHistory, useLocation } from 'react-router-dom'

import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const SearchContainer = styled.div`
    width : 100%;
    height : 100%;

    display : flex;
    justify-content : center;
    align-items : center;
`;

const SearchInput = styled.input`
    width : calc(100% - 60px);
    height : 30px;
    border : 1px solid ${({theme}) => theme.navbarSearchBorderColor};
    background-color : ${({theme}) => theme.navbarSearchColor};
    color : rgb(220,220,220);
    padding-left : 5px;
    padding-bottom : 3px;
    transition : all 0.1s ease-in-out;
    &:focus{
        outline : none;
        border : 1px solid #ffc0cb;
    }
`;

const IconContainer = styled.button`
    width : 60px;
    height : 30px;
    background-color : ${({theme}) => theme.navbarSearchBorderColor};
    display : flex;
    justify-content : center;
    align-items : center;
    border : 1px solid ${({theme}) => theme.navbarSearchBorderColor};
    color : rgb(200,200,200);
        
    &:hover {
        color : rgb(255,255,255);
    }

`;

const SearchIcon = styled(BsSearch)`
`;

const StyledTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: 'rgba(90,90,90,0.9)',
      color: 'rgba(255, 255, 255, 0.87)',
      fontSize: 15,
      marginTop : 20,
      borderRadius : 0,
    },
  }))(Tooltip);

function SearchFilter(){

    const [query, setQuery] = React.useState("");
    const history = useHistory();
    const location = useLocation();

    function handleSubmit(event){
        event.preventDefault();

        // check if string empty or white spaces
        if(query === null || query.match(/^ *$/) !== null) return;
        else history.replace('/songs?search=' + query.trim());
    }

    // update search when query changes and on song page
    useEffect(() => {
        if(location.pathname === '/songs'){
            // check if string empty or white spaces
            if(query === null || query.match(/^ *$/) !== null) history.replace('/songs');
            else history.replace('/songs?search=' + query.trim());
        }
    },[query]);

    return(
        <form onSubmit={handleSubmit}>
            <SearchContainer>
                <SearchInput type="text" placeholder="Search Songs" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <StyledTooltip title="Search">
                    <IconContainer type={"submit"}>
                        <SearchIcon size="1.1rem"/>
                    </IconContainer>
                </StyledTooltip>
            </SearchContainer>
        </form>

    );
}

export default SearchFilter;
