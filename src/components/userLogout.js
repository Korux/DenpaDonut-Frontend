import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import globalVars from '../global';
import styled from 'styled-components';

import { MdLogout } from 'react-icons/md';

import { setUser} from '../redux/actions';
import { useDispatch } from 'react-redux';

const LogoutButton = styled.a`
    margin : 0 10px;
    &:hover{
        cursor:pointer;
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
    <LogoutButton>
        <LogoutIcon size="2rem" onClick={signOut}/>
    </LogoutButton>
  );

}

export default UserLogout;