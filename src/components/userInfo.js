import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getUser } from '../redux/selectors';
import UserLogout from './userLogout';

const UserImage = styled.img`
    width : 2.25rem;
    height :2.25rem;
    border-radius : 50%;
    cursor : pointer;
    margin : 0 10px;
`;

const UserPopup = styled.div`
    display : ${({show}) => show ? "block" : "none"};
    background-color : rgb(70,70,70);
    border-radius : 1rem;
    position : fixed;
    top : 65px;
    right : 20px;
`;

const InfoContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    border-bottom : 1px solid rgb(200,200,200);
    width : 85%;
    margin : 5px auto;
    
`;

const InfoSubContainer = styled(InfoContainer)`
    flex-flow : column wrap;
    border : none;
`;
const UserNameInfo = styled.div`
    text-align : left;
    width : 80%;
    margin : 0 15px;
    font-weight : 500;
    font-size : 16px;
    letter-spacing : 0.5px;
    color : rgb(230,230,230);
`;

const UserEmailInfo = styled.div`
    text-align : left;
    width : 80%;
    margin : 0 15px;
    font-weight : 400;
    font-size : 15px;
    letter-spacing : .5px;
    color : rgb(200,200,200);
`;

const UserInfoImage = styled(UserImage)`
    width : 20%;
    height : 20%;
    margin : 15px 5px;
    &:hover{
        cursor:auto;
    }
`;

function UserInfo(){
    
    const [show, setShow] = React.useState(false);
    var userinfo = useSelector(getUser).user;

    const ClickOutsidePopupListener = (ref, imgRef) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target) ) {
                  if(!imgRef.current.contains(event.target)) {
                      setShow(false);
                }
              }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, [ref]);
    };

    const popoutRef = React.useRef(null);
    const imageRef = React.useRef(null);
    ClickOutsidePopupListener(popoutRef, imageRef);

    return(
        <Fragment>
            <UserImage ref={imageRef} src={userinfo.imageUrl} onClick={() => setShow(!show)}/>
            <UserPopup ref={popoutRef} show={show}>
                <InfoContainer>
                <UserInfoImage src={userinfo.imageUrl} />
                <InfoSubContainer>
                    <UserNameInfo>
                        {userinfo.name}
                    </UserNameInfo>
                    <UserEmailInfo>
                        {userinfo.email}
                    </UserEmailInfo>
                </InfoSubContainer>
                </InfoContainer>
                <UserLogout/>
            </UserPopup> 
        </Fragment>
    );
}

export default UserInfo;