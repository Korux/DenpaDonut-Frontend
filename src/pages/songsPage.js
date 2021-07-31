import React, {useEffect} from 'react';
import styled from 'styled-components';

import {useDispatch} from 'react-redux';
import {setToast} from '../redux/actions';

import SongItem from '../components/songItem';


import globalVars from '../global';


const SongsContainer = styled.div`

`;

function SongsPage(){

    const [songs, setSongs] = React.useState(null);
    const dispatch = useDispatch();

    //componentdidmount
    useEffect(() => {
        if(songs === null){
            fetch(globalVars.server + '/songs')
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
    },[songs, dispatch]);

    return(
        <SongsContainer>
            {songs === null && 'loading'}
            {songs !== null && songs.length === 0 && 'empty'}
            {songs !== null && songs.length > 0 && songs}
        </SongsContainer>
    );
}

export default SongsPage;
