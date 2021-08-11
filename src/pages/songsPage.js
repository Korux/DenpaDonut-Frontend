import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

import {useDispatch, useSelector} from 'react-redux';
import {setForceUpdate, setToast} from '../redux/actions';

import SongItem from '../components/songItem';
import globalVars from '../global';

import { useLocation } from 'react-router-dom';
import { getUpdate } from '../redux/selectors';

const SongsContainer = styled.div`
    display : flex;
    flex-wrap : wrap;
    justify-content : center;
`;

function SongsPage(){

    const songsMounted = useRef(false);

    const [songs, setSongs] = React.useState(null);
    const dispatch = useDispatch();
    const search = useLocation().search;

    var update = useSelector(getUpdate);

    const fetchSongs = React.useCallback(() => {
        let fetchStr = search ? globalVars.server + '/songs' + search : globalVars.server + '/songs';
        fetch(fetchStr)
        .then(response => response.json())
        .then(data => {
            if(data.Error)dispatch(setToast({type : "error", msg : data.Error}));
            else{
                let newSongs = [];
                data.forEach((item, i) => {
                    newSongs.push(<SongItem data={item} key={i}/>);
                });
                if(songsMounted) setSongs(newSongs);
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error fetching song data. Please try again."}));
        });
    },[search, dispatch]);

    //componentdidmount, cancel async tasks on unmount
    useEffect(() => {
        songsMounted.current = true;
        return () => {songsMounted.current = false;};
    },[]);

    //update songs
    useEffect(() => {
        fetchSongs();
    },[fetchSongs, search, update]);

    return(
        <SongsContainer>
            {songs === null && 'loading'}
            {songs !== null && songs.length === 0 && 'empty'}
            {songs !== null && songs.length > 0 && songs}
        </SongsContainer>
    );
}

export default SongsPage;
