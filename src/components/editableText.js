import React from 'react';
import styled from 'styled-components';

const MainText = styled.div`
    width : 90%;
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 1.5rem;
    font-weight : 400;
    margin : 15px 0;
    color : ${({ theme }) => theme.modalTextColor};
`;

const MainEditable = styled.input`
    width : 90%;
    background-color:${({ theme }) => theme.modalColor};
    color : ${({ theme }) => theme.modalTextColor};
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 1.5rem;
    font-weight : 400;
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
    width : calc(100% - 80px);
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    float:right;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 0.9rem;
    font-weight : 100;
    letter-spacing : 0.4px;
`;

const SubEditable = styled.input`
    width : calc(100% - 80px);
    float:right;
    text-align : left;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 0.9rem;
    font-weight : 100;
    letter-spacing : 0.4px;
`;

const SubLabel = styled.span`
    width : 80px;
    text-align : left;
    float:left;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 0.9rem;
    font-weight : 300;
    letter-spacing : 0.4px;
`;

const SubContainer = styled.div`
    width : 100%;
    overflow : auto;
    margin : 5px 0;
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
                    <SubContainer>
                        <SubLabel>
                            Album: 
                        </SubLabel>
                        <SubEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                    </SubContainer>
                );
            case "artist":
                return(
                    <SubContainer>
                        <SubLabel>
                            Artist: 
                        </SubLabel>
                        <SubEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                    </SubContainer>
                );
            case "year":
                return(
                    <SubContainer>
                        <SubLabel>
                            Year: 
                        </SubLabel>
                        <SubEditable value={tmp} onChange={(e) => onEdit(e.target.value)}/>
                    </SubContainer>
                );
            case "duration":
                return(
                    <SubContainer>
                        <SubLabel>
                            Duration:
                        </SubLabel>
                        <SubText>
                            {Math.floor(value / 60)}:{value%60 < 10 ? '0' : ''}{Math.floor(value%60)}
                        </SubText>
                    </SubContainer>
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
                    <SubContainer>
                        <SubLabel>
                            Album: 
                        </SubLabel>
                        <SubText>
                            {value}
                        </SubText>
                    </SubContainer>
                );
            case "artist":
                return(
                    <SubContainer>
                        <SubLabel>
                            Artist: 
                        </SubLabel>
                        <SubText>
                            {value}
                        </SubText>
                    </SubContainer>
                );
            case "year":
                return(
                    <SubContainer>
                        <SubLabel>
                            Year: 
                        </SubLabel>
                        <SubText>
                            {value}
                        </SubText>
                    </SubContainer>
                );
            case "duration":
                return(
                    <SubContainer>
                        <SubLabel>
                            Duration:
                        </SubLabel>
                        <SubText>
                            {Math.floor(value / 60)}:{value%60 < 10 ? '0' : ''}{Math.floor(value%60)}
                        </SubText>
                    </SubContainer>
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
