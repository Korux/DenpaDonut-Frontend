import React, {Fragment} from 'react';
import styled from 'styled-components';

const MainText = styled.div`
    width : 90%;
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 1.5rem;
    margin : 15px 0;
    color : ${({ theme }) => theme.modalTextColor};

`;

const MainEditable = styled.input`
    width : 90%;
    background-color:${({ theme }) => theme.modalColor};
    color : ${({ theme }) => theme.modalTextColor};
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 1.5rem;
    text-align : left;
    border : 0;
    border-bottom : 1px solid ${({ theme }) => theme.modalUnderlineDark};
    margin : 15px 0;
    transition : border 0.3s ease-in-out;
    &:focus {
        outline : none;
        color : ${({ theme }) => theme.modalUnderline};
        border-bottom : 1px solid rgb(200,200,200);
        ::placeholder,
        ::-webkit-input-placeholder {
          color : ${({ theme }) => theme.modalTextColor};
        }
        :-ms-input-placeholder {
           color : ${({ theme }) => theme.modalTextColor};
    }
`;

const SubText = styled.div`
    width : 80%;
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    float:right;
`;

const SubEditable = styled.input`
    width : 80%;
    float:right;
    text-align : left;
`;

const SubLabel = styled.span`
    width : 20%;
    text-align : left;
    float:left;
`;

const EditableText = ({type, value, tmp, mode, onEdit}) => {


    if(mode === "edit"){
        switch(type){
            case "title":
                return(
                    <MainEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                );
            case "album":
                return(
                    <Fragment>
                        <SubLabel>
                            Album: 
                        </SubLabel>
                        <SubEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                    </Fragment>
                );
            case "artist":
                return(
                    <Fragment>
                        <SubLabel>
                            Artist: 
                        </SubLabel>
                        <SubEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                    </Fragment>
                );
            case "year":
                return(
                    <Fragment>
                        <SubLabel>
                            Year: 
                        </SubLabel>
                        <SubEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                    </Fragment>
                );
            case "duration":
                return(
                    <Fragment>
                        <SubLabel>
                            Duration:
                        </SubLabel>
                        <SubText>
                            {Math.floor(value / 60)}:{value%60 < 10 ? '0' : ''}{Math.floor(value%60)}
                        </SubText>
                    </Fragment>
                );
            default:
                //something went wrong
                return null;
        }
    }else if(mode === "text"){
        switch(type){
            case "title":
                return(
                    <MainText>
                        {value}
                    </MainText>
                );
            case "album":
                return(
                    <Fragment>
                        <SubLabel>
                            Album: 
                        </SubLabel>
                        <SubText>
                            {value}
                        </SubText>
                    </Fragment>
                );
            case "artist":
                return(
                    <Fragment>
                        <SubLabel>
                            Artist: 
                        </SubLabel>
                        <SubText>
                            {value}
                        </SubText>
                    </Fragment>
                );
            case "year":
                return(
                    <Fragment>
                        <SubLabel>
                            Year: 
                        </SubLabel>
                        <SubText>
                            {value}
                        </SubText>
                    </Fragment>
                );
            case "duration":
                return(
                    <Fragment>
                        <SubLabel>
                            Duration:
                        </SubLabel>
                        <SubText>
                            {Math.floor(value / 60)}:{value%60 < 10 ? '0' : ''}{Math.floor(value%60)}
                        </SubText>
                    </Fragment>
                );
            default:
                //something went wrong
                return null;
        }
    }else{
        //something went wrong
        return null;
    }

};

export default EditableText;
