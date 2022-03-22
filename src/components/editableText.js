import React from 'react';
import styled from 'styled-components';

// const MainText = styled.div`
//     width : 90%;
//     text-align : left;
//     text-overflow: ellipsis;
//     overflow:hidden; 
//     white-space:nowrap;
//     font-family: 'Noto Sans JP', sans-serif;
//     font-size : 1.5rem;
//     font-weight : 400;
//     float : left;
//     margin : 15px 0;
//     padding : 1px;
//     border : 1px solid ${({ theme }) => theme.modalColor};
//     border-bottom : 1px solid ${({ theme }) => theme.modalUnderlineDark};
//     color : ${({ theme }) => theme.modalTextColor};

// `;

const MainEditable = styled.input`
    width : 90%;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 1.5rem;
    font-weight : 400;
    text-align : left;
    float : left;
    color : ${({ theme }) => theme.modalTextColor};
    border : 1px solid ${({ theme }) => theme.modalColor};
    border-bottom : 1px solid ${({ theme, mode }) => mode !== 'edit' ? theme.modalColor : theme.modalUnderlineDark};
    background-color:${({ theme }) => theme.modalColor};
    padding : 1px;
    margin : 15px 0;
    &:focus {
        outline : none;
        outline-offset : 0;
        color : ${({ theme, mode }) => mode === 'edit' ? theme.modalUnderline : theme.modalTextColor};
        border : 1px solid ${({ theme }) => theme.modalColor};
        border-bottom : ${({theme, mode}) => mode === 'edit' ? '1px solid rgb(200,200,200)' : '1px solid ' +theme.modalColor};
        ::placeholder,
        ::-webkit-input-placeholder {
          color : ${({ theme }) => theme.modalTextColor};
        }
        :-ms-input-placeholder {
           color : ${({ theme }) => theme.modalTextColor};
    }
`;

const TitleContainer = styled.div`
    width : 100%;
    display  :flex;
    align-items : center;
`;


const SubEditable = styled.input`
    width : calc(85% - 80px);
    text-align : left;
    text-overflow: ellipsis;
    overflow:hidden; 
    white-space:nowrap; 
    float:left;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 0.9rem;
    font-weight : 100;
    letter-spacing : 0.4px;
    color : ${({ theme }) => theme.modalTextColor};
    border : 1px solid ${({ theme }) => theme.modalColor};
    border-bottom : 1px solid ${({ theme, mode }) => mode !== 'edit' ? theme.modalColor : theme.modalUnderlineDark};
    background-color:${({ theme }) => theme.modalColor};
    &:focus {
        outline : none;
        outline-offset : 0;
        color : ${({ theme, mode }) => mode === 'edit' ? theme.modalUnderline : theme.modalTextColor};
        border : 1px solid ${({ theme }) => theme.modalColor};
        border-bottom : ${({theme, mode}) => mode === 'edit' ? '1px solid rgb(200,200,200)' : '1px solid ' +theme.modalColor};
        ::placeholder,
        ::-webkit-input-placeholder {
          color : ${({ theme }) => theme.modalTextColor};
        }
        :-ms-input-placeholder {
           color : ${({ theme }) => theme.modalTextColor};
    }
`;

const SubLabel = styled.span`
    width : 80px;
    text-align : left;
    float:left;
    font-family: 'Noto Sans JP', sans-serif;
    font-size : 0.9rem;
    font-weight : 300;
    letter-spacing : 0.4px;
    color : ${({ theme }) => theme.modalTextColor};
`;

const SubContainer = styled.div`
    width : 100%;
    overflow : auto;
    margin : 5px 0;
`;

const EditableText = ({type, value, tmp, mode, onEdit}) => {

    if(type === "Title"){
    
        return(
            <TitleContainer>
                <MainEditable value={tmp} mode={mode} readOnly={mode !== 'edit'} onChange={(e) => onEdit(e.target.value)}/>
            </TitleContainer>
        );
    }else{
        let minutes = Math.floor(value / 60);
        let seconds = value%60 < 10 ? '0' : '' + Math.floor(value%60);

        return(
            <SubContainer>
                <SubLabel>
                    {type}:
                </SubLabel>
                {type !== 'Duration' && <SubEditable value={tmp} mode={mode} readOnly={mode !== 'edit'} onChange={(e) => onEdit(e.target.value)}/>}
                {type === 'Duration' && <SubEditable value={minutes + ":" + seconds} readOnly={true}/>}
            </SubContainer>
        );
    }
};

export default EditableText;
