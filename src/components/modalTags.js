import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const AddTagBottomText = styled.button`
    width : 20%;
    float : right;
    margin-right : 5%;
    margin-top : 10px;
    border : 0;
`;
const AddTagInput = styled.input`
    width : 95%;
    background-color:${({ theme }) => theme.modalColor};
    border : 0;
    border-bottom : 1px solid ${({ theme }) => theme.modalUnderlineDark};
    color : ${({ theme }) => theme.modalTextColorDark};
    float : left;

    transition : border 0.2s ease-in-out;
    &:focus{
        outline : none;
        color : ${({ theme }) => theme.modalTextColor};
        border-bottom : 1px solid  ${({ theme }) => theme.modalUnderline};
        ::placeholder,
        ::-webkit-input-placeholder {
          color : ${({ theme }) => theme.modalTextColor};
        }
        :-ms-input-placeholder {
           color : ${({ theme }) => theme.modalTextColor};
        }
    }
`;

const AddTagContainer = styled.div`
`;


const AddTagForm = ({onSubmit}) => {

    const [Tag, setTag] = React.useState("");
    const inputRef = useRef(null);

    function handleCancel(){
        setTag("");
    }

    function handleAdd(){
        setTag("");
        onSubmit(Tag);
    }

    return(
        <AddTagContainer>
            <AddTagInput ref={inputRef} value={Tag} onChange={e => setTag(e.target.value)} placeholder="Add Tag"/>
            <AddTagBottomText onClick={handleAdd}>Add</AddTagBottomText>
            <AddTagBottomText onClick={handleCancel}>Cancel</AddTagBottomText>
        </AddTagContainer>
    );
};


const StyledTag = styled.div`
    background-color : #D8368D;
    border-radius : 10px;
    width : fit-content;
    height : 22px;
    padding : 0 5px;
    margin : 0 3px;
    font-size : 13px;
`;

const TagsContainer = styled.div`

    width : 100%;
    height : 36%;
    display : flex;
    flex-flow : column wrap;
`;

const TagsHeader = styled.div`
    width : 100%;
    text-align : left;
    flex : 0 1 auto;
`;

const TagsDisplay = styled.div`
    display : flex;
    flex-flow : row wrap;
    border-radius : 10px;
    width : 100%;
    flex : 1 1 auto;
    margin-top : 7px;
`;

function ModalTags({tags, onAdd}){

    const [Tags, setTags] = React.useState(null);

    useEffect(() => {
        let newTags = [];
        tags.forEach((tag,i) => {
            if(tag !== '-' && tag !== "")
                newTags.push(<StyledTag key={i}>{tag}</StyledTag>);
        });
        setTags(newTags);
    },[tags]);

    return(
        <TagsContainer>
            <TagsHeader>Tags:</TagsHeader>
            <TagsDisplay>
                {Tags}
            </TagsDisplay>
            <AddTagForm onSubmit={(tag) => onAdd(tag)}/>
        </TagsContainer>
    );

}

export default ModalTags;