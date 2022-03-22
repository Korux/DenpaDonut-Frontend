import React, {Fragment, useRef} from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { getModal } from '../redux/selectors';

import {setForceUpdate, setToast} from '../redux/actions';

import globalVars from '../global';

import EditableText from './editableText';
import ModalTags from './modalTags';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div`
    display : flex;
    flex-flow : row wrap;
    width : 850px;
    border-radius : 15px;
`;

const InfoContainer = styled.div`
    width : 52%;
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
    width : 44%;
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

const CancelButton = styled.button`
    border : none;
    border-radius : 4px;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;
    color :  ${({theme}) => theme.modalTextCancelColor};
    padding : 5px 15px;
    background-color : ${({theme}) => theme.buttonCancelColor};
    margin : 0 5px;
`;

const SaveButton = styled.button`
    border : none;
    border-radius : 4px;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;
    color :  ${({theme}) => theme.modalTextColor};
    padding : 5px 15px;
    background-color : ${({theme}) => theme.buttonConfirmColor};
    margin : 0 5px;
`;

const EditButton = styled.button`
border : none;
    border-radius : 4px;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;
    color :  ${({theme}) => theme.modalTextColor};
    padding : 5px 15px;
    background-color : ${({theme}) => theme.buttonConfirmColor};
    margin : 0 5px;
`;

const ButtonContainer = styled.div`
    width : 95%;
    margin-top : 20px;
    display : flex;
    justify-content : flex-end;
    align-items : center;
`;

function ModalEditSong(){

    const [song, setSong] = React.useState(useSelector(getModal).song);
    const [tmpSong, setTmpSong] = React.useState(useSelector(getModal).song);
    const [mode, setMode] = React.useState("text");

    const fileRef = useRef(null);
    const dispatch = useDispatch();
    var modalEditedSong = useSelector(getModal).song;

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

    const editTag = (tag, type) => {
        let newTags = song.tags.slice();
        if(type === "add"){
            if(newTags.includes(tag)){
                dispatch(setToast({type : "error", msg : "This tag already exists"}));
                return;
            }
            else
                newTags.push(tag);
        }
        else if(type === "remove")
            newTags = newTags.filter(a => a!== tag);
        let data = {
            album : tmpSong.album,
            artist : tmpSong.artist,
            tags : newTags.sort(),
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
            }else{
                dispatch(setForceUpdate(true));
                setSong({...tmpSong, tags : newTags});
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(setToast({type : "error", msg : "Error with saving changes, please try again"}));
        });
    };

    if(song === null) {
        return null;
    }else{
        return(
            <Fragment>
                <ModalContainer>
                    <ImageContainer>
                        <ImageEditDim>
                            <input type="file" ref={fileRef} onChange={handleFiles} hidden={true} accept="image/*"/>
                            <ImageEditIcon size="3x" icon={faFileUpload} onClick={() => fileRef.current.click()}/>
                        </ImageEditDim>
                        <ImageEditable src={globalVars.server + '/pic/' + song.picid}/>
                    </ImageContainer>

                    <InfoContainer>
                        <EditableText type="Title" value={song.title} tmp={tmpSong.title} mode={mode} onEdit={(e) => setTmpSong({...tmpSong, title : e})}/>
                        <EditableText type="Artist" value={song.artist} tmp={tmpSong.artist}  mode={mode} onEdit={(e) => setTmpSong({...tmpSong, artist : e})}/>
                        <EditableText type="Album" value = {song.album} tmp={tmpSong.album}  mode={mode} onEdit={(e) => setTmpSong({...tmpSong, album : e})}/>

                        <EditableText type="Year" value={song.year} tmp={tmpSong.year} mode={mode} onEdit={(e) => setTmpSong({...tmpSong, year : e})}/>
                        <EditableText type="Duration" value={song.duration} mode={mode} />

                        <ModalTags tags={song.tags} onEdit={editTag}/>

                        <ButtonContainer>
                            {mode === "text" && <EditButton onClick={() => setMode("edit")}>Edit</EditButton>}
                            {mode === "edit" &&<CancelButton onClick={cancelEdit}>Cancel</CancelButton>}
                            {mode === "edit" &&<SaveButton onClick={saveEdit}>Save</SaveButton>}
                        </ButtonContainer>

                    </InfoContainer>
                </ModalContainer>
            </Fragment>
        );
    }
}

export default ModalEditSong;
