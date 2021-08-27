import React, {Fragment} from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { getModal } from '../redux/selectors';

import {setForceUpdate, setToast} from '../redux/actions';

import globalVars from '../global';

import DropZone from './dropZone';

const ModalContainer = styled.div`
    display : flex;
    flex-flow : row wrap;
    min-width : 500px;
`;

const ImageContainer = styled.div`
    width : 31%;
    height : auto;
    margin : 2%;
    position : relative;
    background-color:black;
`;

const InfoContainer = styled.div`
    width : 65%;
`;

const ButtonContainer = styled.div`
    width : 100%;
`;

const ImageEditable = styled.img`
    width : 100%;
    height : auto;
`;

const ImageEditButton = styled.div`
    width : 30%;
    height : 30%;
    border-radius : 50%;
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin : auto;
    background-color : ${({ theme }) => theme.songPlayPauseColor};
    &:hover{
        cursor : pointer;
    }
    transition : opacity 0.2s ease-in-out;
`;

const EditButton = styled.button`
    display : ${({mode}) => mode === "text" ? 'inline-block' : 'none'};
`;

const SaveButton = styled.button`
    display : ${({mode}) => mode === "edit" ? 'inline-block' : 'none'};
`;

const CancelButton = styled.button`
    display : ${({mode}) => mode === "edit" ? 'inline-block' : 'none'};
`;

const EditableText = ({value, tmp, mode, onEdit}) => {

    if(mode === "edit"){
        return(
            <input value={tmp} onChange={(e) => onEdit(e.target.value)}/>
        );
    }else if(mode === "text"){
        return(
            <div>
                {value}
            </div>
        );
    }else{
        //something went wrong
        return null;
    }

};

const TitleEditable = styled(EditableText)`

`;

const ArtistEditable = styled(EditableText)`

`;

const AlbumEditable = styled(EditableText)`

`;

function ModalEditSong(){

    const [song, setSong] = React.useState(useSelector(getModal).song);
    const [tmpSong, setTmpSong] = React.useState(useSelector(getModal).song);
    const [mode, setMode] = React.useState("text");
    const [showDZ , setShowDZ] = React.useState(false);

    const dispatch = useDispatch();

    const cancelEdit = () => {
        setTmpSong({...song});
        setMode("text");
    };

    const saveEdit = () => {
        let data = {
            album : tmpSong.album,
            artist : tmpSong.artist,
            artists : tmpSong.artists,
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

    if(song === null) {
        return null;
    }else{
        return(
            <Fragment>
                <DropZone show={showDZ}/>
                <ModalContainer>
                    <ImageContainer>
                        <ImageEditButton>
                            
                        </ImageEditButton>
                        <ImageEditable src={globalVars.server + '/pic/' + song.picid}/>
                    </ImageContainer>

                    <InfoContainer>
                        <TitleEditable value={song.title} tmp={tmpSong.title} mode={mode} onEdit={(e) => setTmpSong({...tmpSong, title : e})}/>
                        <ArtistEditable value={song.artist} tmp={tmpSong.artist}  mode={mode} onEdit={(e) => setTmpSong({...tmpSong, artist : e})}/>
                        <AlbumEditable value = {song.album} tmp={tmpSong.album}  mode={mode} onEdit={(e) => setTmpSong({...tmpSong, album : e})}/>
                    </InfoContainer>

                    <ButtonContainer>
                        <EditButton mode={mode} onClick={() => setMode("edit")}>
                            Edit
                        </EditButton>
                        <SaveButton mode={mode} onClick={saveEdit}>
                            Save
                        </SaveButton>
                        <CancelButton mode={mode} onClick={cancelEdit}>
                            Cancel
                        </CancelButton>
                    </ButtonContainer>

                </ModalContainer>
            </Fragment>
        );
    }
}

export default ModalEditSong;
