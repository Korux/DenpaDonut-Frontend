import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

import {useDispatch, useSelector} from 'react-redux';
import {setToast} from '../redux/actions';

import SongItem from '../components/songItem';
import globalVars from '../global';

import { useLocation } from 'react-router-dom';
import { getUpdate } from '../redux/selectors';

import EmptyImg from '../images/empty.png';
const EmptySongsDisplay = () => {
    return(
        <div>
            <img style={{width : '200px'}} src={EmptyImg} alt={"error image"}/>
            <div style={{fontSize : '16px'}}>
                No Songs to Display
            </div>
        </div>
    );

}

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
                if(newSongs.length !== 0){
                    newSongs.sort(function(a,b) {
                        var keyA = a.props.data.album,
                        keyB = b.props.data.album;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    while(newSongs[0].props.data.album === '-') newSongs.push(newSongs.shift());
                }
                if(songsMounted) setSongs(newSongs);
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error fetching song data. Please try again."}));
            setSongs([]);
        });
    },[search]);

    //componentdidmount, cancel async tasks on unmount
    useEffect(() => {
        songsMounted.current = true;
        return () => {songsMounted.current = false;};
    },[]);

    //update songs
    useEffect(() => {
        fetchSongs();
    },[search, update]);

    return(
        <SongsContainer>
            {songs === null &&  <Loading type={'spin'} color={'#555555'} height={100} width={100}/>}
            {songs !== null && songs.length === 0 && <EmptySongsDisplay/>}
            {songs !== null && songs.length > 0 && songs}
        </SongsContainer>
    );
}

export default SongsPage;
