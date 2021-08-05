import React, {useEffect} from 'react';
import styled from 'styled-components';

import {useDispatch} from 'react-redux';
import {setToast} from '../redux/actions';

import SongItem from '../components/songItem';
import globalVars from '../global';

import { useLocation } from 'react-router-dom';

const SongsContainer = styled.div`
    display : flex;
    flex-wrap : wrap;
    justify-content : center;
`;

function SongsPage(){

    const [songs, setSongs] = React.useState(null);
    const dispatch = useDispatch();
    const search = useLocation().search;
    //componentdidmount
    useEffect(() => {
        if(songs === null){
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
                    setSongs(newSongs);
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(setToast({type : "error", msg : "Error fetching song data. Please try again."}));
            });
        }
    },[songs, dispatch, search]);

    //update based on search query
    useEffect(() => {
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
                setSongs(newSongs);
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error fetching song data. Please try again."}));
        });
    },[search, dispatch]);

    return(
        <SongsContainer>
            {songs === null && 'loading'}
            {songs !== null && songs.length === 0 && 'empty'}
            {songs !== null && songs.length > 0 && songs}
        </SongsContainer>
    );
}

export default SongsPage;
