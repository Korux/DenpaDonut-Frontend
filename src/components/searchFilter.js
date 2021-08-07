import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useHistory, useLocation } from 'react-router-dom'

const SearchContainer = styled.form``;

const SearchInput = styled.input``;

const SearchIcon = styled(FontAwesomeIcon)``;

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

    useEffect(() => {
        if(location.pathname === '/songs'){
            // check if string empty or white spaces
            if(query === null || query.match(/^ *$/) !== null) history.replace('/songs');
            else history.replace('/songs?search=' + query.trim());
        }
    },[query, history, location.pathname]);

    return(
        <SearchContainer onSubmit={handleSubmit}>
            <SearchIcon size={"lg"}icon={faSearch}/>
            <SearchInput placeholder="Search Songs" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </SearchContainer>

    );
}

export default SearchFilter;
