import React from 'react';
import {useGoogleLogin} from 'react-google-login';
import globalVars from '../global';
import styled from 'styled-components';

import { MdLogin } from 'react-icons/md';

import { ErrorToast } from './toast';
import { setUser,setToast } from '../redux/actions';
import { useDispatch } from 'react-redux';

const LoginButton = styled.a`
    margin : 0 10px;
    &:hover{
        cursor:pointer;
    }
`;

const LoginIcon = styled(MdLogin)`
    color : ${({theme}) => theme.navbarIconColor};
`;

const clientId = globalVars.clientid;

const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        localStorage.setItem('authToken', newAuthRes.id_token);

        // Setup the other timer after the first one
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
};

function UserLogin(){

    const dispatch = useDispatch();

    const onSuccess = (res) => {
        console.log(res);
        dispatch(setUser({loggedin : true, user : res.profileObj, token : res.tokenObj}));
        refreshTokenSetup(res);
    };
    
    const onFailure = (res) => {
        console.log(res);
        dispatch(setToast({type : 'error', msg : 'Error occurred while logging in. Please try again.'}));
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        prompt:'select_account',
        isSignedIn: true,
        accessType: 'offline'
    });

    return (
        <LoginButton>
            <LoginIcon size="2rem" onClick={signIn}/>
        </LoginButton>
    );

}

export default UserLogin;