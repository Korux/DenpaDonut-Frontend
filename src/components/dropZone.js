import React, {useCallback} from 'react';
import styled from 'styled-components';

import {useDropzone} from 'react-dropzone'
import globalVars from '../global';

import {useDispatch, useSelector} from 'react-redux';
import {setToast, setForceUpdate} from '../redux/actions';
import {getModal} from '../redux/selectors';


function DropZone(){

    const dispatch = useDispatch();
    var modalEditedSong = useSelector(getModal).song;

    const onDrop = useCallback(acceptedFiles => {

        let file = acceptedFiles[0];
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
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default DropZone;
