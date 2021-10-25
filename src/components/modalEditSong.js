import React, {Fragment, useEffect, useRef} from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { getModal } from '../redux/selectors';

import {setForceUpdate, setToast} from '../redux/actions';

import globalVars from '../global';

import EditableText from './editableText';
import ModalTags from './modalTags';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

import FastAverageColor from 'fast-average-color';
const fac = new FastAverageColor();

const ModalContainer = styled.div`
    display : flex;
    flex-flow : row wrap;
    width : 850px;

    //background: linear-gradient( ${({gcolor}) => gcolor === null ? 'rgb(200,200,200)' : gcolor} 0%, rgba(0,0,0,0) 35%);
    border-radius : 15px;
`;

const InfoContainer = styled.div`
    width : 55%;
`;

const ButtonContainer = styled.div`
    width : 100%;
    margin : 15px 0;
`;

const ImageEditable = styled.img`
    width : 100%;
    height : auto;
`;


const ImageEditIcon = styled(FontAwesomeIcon)`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    &:hover{
        cursor : pointer;
        color : rgb(240,240,240);
        transform : scale(1.1);
    }
    transition : all 0.1s ease-in-out;
   color : rgb(220,220,220);
`;

const ImageEditDim = styled.div`
    width : 100%;
    height : 100%;
    position : absolute;
    top : 0;
    left : 0;
    background : radial-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7));
`;

const ImageContainer = styled.div`
    width : 41%;
    height : auto;
    margin : 2%;
    position : relative;
    background-color:${({theme}) => theme.songImageBackground};

    ${ImageEditDim}{
        opacity : 0;
    }

    &:hover ${ImageEditDim}{
        opacity : 1;
    }
`;

const EditButton = styled.button`
    display : ${({mode}) => mode === "text" ? 'inline-block' : 'none'};
    border : 0;
    margin : 0 10px;
    background-color : ${({theme}) => theme.modalButtonColor};
    border-radius : 5px;
    padding : 2px 10px;
    color : ${({ theme }) => theme.modalTextColor};
`;

const CSButton = styled.button`
    display : ${({mode}) => mode === "edit" ? 'inline-block' : 'none'};
    border : 0;
    margin : 0 10px;
    background-color : ${({theme}) => theme.modalButtonColor};
    border-radius : 5px;
    padding : 2px 10px;
    color : ${({ theme }) => theme.modalTextColor};
`;

function ModalEditSong(){

    const [song, setSong] = React.useState(useSelector(getModal).song);
    const [tmpSong, setTmpSong] = React.useState(useSelector(getModal).song);
    const [mode, setMode] = React.useState("text");
    const [avgColor, setColor] = React.useState(null);

    const fileRef = useRef(null);
    const dispatch = useDispatch();
    var modalEditedSong = useSelector(getModal).song;

    useEffect(() => {
        fac.getColorAsync(globalVars.server + '/pic/' + song.picid)
        .then(color => {
            setColor(color.hex);
        });
    }, []);

    const handleFiles = (e) => {
        let file = e.target.files[0];
        if(file['type'].split('/')[0] !== 'image'){
            // file is not image
            dispatch(setToast({msg : "This file is not an image.", type:"error"}));
        }else{
            let data = new FormData();
            data.append('file', file);
            data.append('id',modalEditedSong._id);
            let reqOpts = {
                method : 'PATCH',
                body : data
            };

            fetch(globalVars.server + '/songs/' + modalEditedSong._id + '/pic', reqOpts)
            .then(response => response.json())
            .then(data => {
                if(data.Error)dispatch(setToast({msg : data.Error, type:"error"}));
                else{
                    setSong({...song, picid : data.picid});
                    setTmpSong({...tmpSong, picid : data.picid});
                    dispatch(setForceUpdate(true));
                    dispatch(setToast({msg : "Successfully updated image.", type:"success"}));
                }
            })
            .catch(err => {
                console.log(err);
                // do something with error from PATCH
                dispatch(setToast({msg : "Unknown error uploading image. Please try again.", type:"error"}));
            });
        }
    };

    const cancelEdit = () => {
        setTmpSong({...song});
        setMode("text");
    };

    const saveEdit = () => {
        let data = {
            album : tmpSong.album,
            artist : tmpSong.artist,
            tags : tmpSong.tags,
            title : tmpSong.title,
            year : tmpSong.year
        };

        let reqOpts = {
            method : "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        };

        fetch(globalVars.server + '/songs/' + song._id, reqOpts)
        .then(response => response.json())
        .then(data => {
            if(data.Error){
                dispatch(setToast({type : "error", msg : "Error with saving changes, please try again"}));
                cancelEdit();
            }else{
                dispatch(setForceUpdate(true));
                setSong({...tmpSong});
                setMode("text");
                dispatch(setToast({type : "success", msg : "Song info saved"}));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error with saving changes, please try again"}));
            cancelEdit();
        });
    };

    const saveTag = (tag) => {
        let newTags = song.tags.slice();
        newTags.push(tag);
        let data = {
            album : tmpSong.album,
            artist : tmpSong.artist,
            tags : newTags,
            title : tmpSong.title,
            year : tmpSong.year
        };

        let reqOpts = {
            method : "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        };

        fetch(globalVars.server + '/songs/' + song._id, reqOpts)
        .then(response => response.json())
        .then(data => {
            if(data.Error){
                dispatch(setToast({type : "error", msg : "Error with saving tag, please try again"}));
                cancelEdit();
            }else{
                dispatch(setForceUpdate(true));
                setSong({...tmpSong, tags : newTags});
                setMode("text");
                dispatch(setToast({type : "success", msg : "Tag added"}));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error with saving changes, please try again"}));
            cancelEdit();
        });
    };

    if(song === null) {
        return null;
    }else{
        return(
            <Fragment>
                <ModalContainer gcolor={avgColor}>
                    <ImageContainer>
                        <ImageEditDim>
                            <input type="file" ref={fileRef} onChange={handleFiles} hidden={true} accept="image/*"/>
                            <ImageEditIcon size="3x" icon={faFileUpload} onClick={() => fileRef.current.click()}/>
                        </ImageEditDim>
                        <ImageEditable src={globalVars.server + '/pic/' + song.picid}/>
                    </ImageContainer>

                    <InfoContainer>
                        <EditableText type="title" value={song.title} tmp={tmpSong.title} mode={mode} onEdit={(e) => setTmpSong({...tmpSong, title : e})}/>
                        <EditableText type="artist" value={song.artist} tmp={tmpSong.artist}  mode={mode} onEdit={(e) => setTmpSong({...tmpSong, artist : e})}/>
                        <EditableText type="album" value = {song.album} tmp={tmpSong.album}  mode={mode} onEdit={(e) => setTmpSong({...tmpSong, album : e})}/>

                        <EditableText type="year" value={song.year} tmp={tmpSong.year} mode={mode} onEdit={(e) => setTmpSong({...tmpSong, year : e})}/>
                        <EditableText type="duration" value={song.duration} mode={mode} />

                        <ModalTags tags={song.tags} onAdd={saveTag}/>

                        {/* <ButtonContainer>
                            <EditButton mode={mode} onClick={() => setMode("edit")}>
                                Edit
                            </EditButton>
                            <CSButton mode={mode} onClick={cancelEdit}>
                                Cancel
                            </CSButton>
                            <CSButton mode={mode} onClick={saveEdit}>
                                Save
                            </CSButton>
                        </ButtonContainer> */}
                    </InfoContainer>


                </ModalContainer>
            </Fragment>
        );
    }
}

export default ModalEditSong;
