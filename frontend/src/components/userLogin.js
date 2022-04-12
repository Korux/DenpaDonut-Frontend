import React from 'react';
import Cookies from 'universal-cookie';
import {useGoogleLogin} from 'react-google-login';
import globalVars from '../global';
import styled from 'styled-components';

import { BiLogIn } from 'react-icons/bi';

import { setUser,setToast} from '../redux/actions';
import { useDispatch } from 'react-redux';

const LoginIcon = styled(BiLogIn)`
    color : ${({theme}) => theme.navbarIconColor};
    margin : 0 5px 0 0;
`;

const cookies = new Cookies();

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
        cookies.set('usertoken', res.tokenObj.id_token, {path : '/'});
        dispatch(setUser({loggedin : true, userinfo : res.profileObj, tokeninfo : res.tokenObj}));
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
        <LoginIcon onClick={signIn} size="1.8rem"/>
    );

}

export default UserLogin;