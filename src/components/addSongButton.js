import React from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from '../redux/actions';

function AddSongButton(props){

    const [url, setURL] = React.useState("");
    const dispatch = useDispatch();

    function postSong(event){
        event.preventDefault();
        setToast({msg : "Adding song in background...", type:"regular"});
        if(props.type === "spotify" || props.type === "youtube"){
            let reqData = {
                url : url
            };
            let reqOpts = {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(reqData),
            };
        
            fetch("http://localhost:3000/songs?source=" + props.type, reqOpts)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // do something with data
                if(data.Error)dispatch(setToast({msg : data.Error, type:"error"}));
                else dispatch(setToast({msg : "Successfully added song.", type:"success"}));
            })
            .catch(err => {
                console.log(err);
                // do something with error
                dispatch(setToast({msg : "Unknown error adding song. Please try again.", type:"error"}));
            });
        }else{
            console.log("Song URL type not specified");
        }
    }

    return(
        <form onSubmit={postSong}>
        <input value={url} onChange={(e) => setURL(e.target.value)}/>
        <button>{props.type}</button>
      </form>
    );

}

export default AddSongButton;