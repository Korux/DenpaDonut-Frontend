import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import globalVars from '../global';
import styled from 'styled-components';

import { MdLogout } from 'react-icons/md';

import { setUser, clearSong, clearQueue } from '../redux/actions';
import { useDispatch } from 'react-redux';

const LogoutButton = styled.div`
    margin : 10px 10px 10px 8%;
    width : fit-content;
    text-align : left;
    font-weight : 400;
    color : rgb(200,200,200);
    &:hover{
        cursor:pointer;
        color : rgb(230,230,230);
    }
`;

const LogoutIcon = styled(MdLogout)`
    color : ${({theme}) => theme.navbarIconColor};
`;

const clientId = globalVars.clientid;

function UserLogout() {

  const dispatch = useDispatch();

  const onLogoutSuccess = (res) => {
    dispatch(setUser({loggedin : false, userinfo : null, tokeninfo : null}));
    dispatch(clearSong());
    dispatch(clearQueue());
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <LogoutButton  onClick={signOut}>
        <LogoutIcon size="1.5rem"/> Log Out
    </LogoutButton>
  );

}

export default UserLogout;