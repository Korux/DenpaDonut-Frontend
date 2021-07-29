import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.form``;

const SearchInput = styled.input``;

const SearchIcon = styled(FontAwesomeIcon)``;

function SearchFilter(){

    const [query, setQuery] = React.useState("");

    function handleSubmit(event){
        event.preventDefault();
        console.log(query);
    }

    return(
        <SearchContainer onSubmit={handleSubmit}>
            <SearchIcon size={"lg"}icon={faSearch}/>
            <SearchInput placeholder="Search Songs" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </SearchContainer>

    );
}

export default SearchFilter;
