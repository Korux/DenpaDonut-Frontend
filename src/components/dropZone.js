import React, {useCallback, Fragment} from 'react';
import styled from 'styled-components';

import {useDropzone} from 'react-dropzone'
import globalVars from '../global';

import {useDispatch, useSelector} from 'react-redux';
import {setToast, setForceUpdate} from '../redux/actions';
import {getModal} from '../redux/selectors';


const DropZoneContainer = styled.div`
    opacity :  ${({show}) => show ? '1' : '0'};
    pointer-events :  ${({show}) => show ? 'auto' : 'none'};
    width : auto;
    height : auto;
    background-color : ${({ theme }) => theme.modalColor};
    z-index : 1000;
    position : fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius : 15px;
`;

const DropZoneDim = styled.a`
    display: inline-block;
    opacity :  ${({show}) => show ? '0.5' : '0'};
    pointer-events :  ${({show}) => show ? 'auto' : 'none'};
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 999;
    top: 0;
    left: 0;
`;

function DropZone({show}){

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
        <Fragment>
            <DropZoneDim/>
            <DropZoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </DropZoneContainer>
        </Fragment>
    )
}

export default DropZone;
