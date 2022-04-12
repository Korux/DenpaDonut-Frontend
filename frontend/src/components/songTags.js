import React, {Fragment, useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setToast} from '../redux/actions';

const AddTagInput = styled.input`
    width : 95%;
    background-color:${({ theme }) => theme.modalTagContainerColor};
    border : 0;
    color : ${({ theme }) => theme.modalTextColorDark};
    float : left;
    font-size : 14px;
    padding-bottom : 3px;

    transition : border 0.2s ease-in-out;
    &:focus{
        outline : none;
        color : ${({ theme }) => theme.modalTextColor};
    }
`;

const AddTagContainer = styled.div`
`;

const AddTagButton = styled.div`
    background-color : ${({ theme }) => theme.modalTagContainerColor};
    border-radius : 10px;
    width : fit-content;
    height : 22px;
    padding : 0 3px;

    font-size : 13px;
    color : ${({ theme }) => theme.modalTagTextColor};
    cursor : pointer;

    &:hover{
        color : white;
    };

`;

const AddTagForm = ({onSubmit}) => {

    const [Tag, setTag] = React.useState("");
    const [mode, setMode] = React.useState("button");
    const dispatch = useDispatch();

    function handleCancel(){
        setMode("button");
        setTag("");
    }

    function handleAdd(e){
        if(e.key === 'Enter'){
            if(Tag !== ""){
                onSubmit(Tag, 'add');
                handleCancel();
            }
            else
                dispatch(setToast({type : "error", msg : "Tag cannot be empty"}));
        }
    }

    return(
        <AddTagContainer>
            {mode === "button" && <AddTagButton onClick={() => {setMode("input")}}>+ Add Tag</AddTagButton>}
            {mode === "input" && <AddTagInput value={Tag} autoFocus onBlur ={handleCancel} onChange={e => setTag(e.target.value)} onKeyDown={handleAdd}/>}
        </AddTagContainer>
    );
};


const StyledTag = styled.div`
    background-color : ${({ theme }) => theme.modalTagColor};
    border-radius : 4px 0 0 4px;
    width : fit-content;
    height : 22px;
    padding : 0 3px 0 5px;
    margin : 0 0 0 3px;
    font-size : 13px;
    color : ${({ theme }) => theme.modalTagTextColor};
`;

const RemoveTagButton = styled.div`
    background-color : ${({ theme }) => theme.modalTagColor};
    border-radius : 0 8px 8px 0;
    width : fit-content;
    height : 22px;
    padding : 0 7px 0 3px;
    margin : 0 3px 0 0;
    font-size : 13px;
    cursor : pointer;
    color : ${({ theme }) => theme.modalTagTextColor};
`;

const Tag = ({text, onRemove}) => {

    function handleRemove(){
        onRemove(text, 'remove');
    }

    return(
        <Fragment>
            <StyledTag>{text}</StyledTag>
            <RemoveTagButton onClick={handleRemove}>x</RemoveTagButton>
        </Fragment>
    );

};

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
    color : ${({ theme }) => theme.modalTextColor};
`;

const TagsDisplay = styled.div`
    display : flex;
    flex-flow : row wrap;
    border-radius : 10px;
    width : 97%;
    flex : 1 1 auto;
    margin-top : 7px;
    padding : 10px 8px;
    background-color : ${({ theme }) => theme.modalTagContainerColor};
`;

function SongTags({tags, onEdit}){

    const [Tags, setTags] = React.useState(null);

    useEffect(() => {
        let newTags = [];
        tags.forEach((tag,i) => {
            if(tag !== '-' && tag !== "")
                newTags.push(<Tag key={i} text={tag} onRemove={(tag,type)=>onEdit(tag,type)}/>);
        });
        setTags(newTags);
    },[tags]);

    return(
        <TagsContainer>
            <TagsHeader>Tags:</TagsHeader>
            <TagsDisplay>
                {Tags}
                <AddTagForm onSubmit={(tag, type) => onEdit(tag, type)}/>
            </TagsDisplay>
        </TagsContainer>
    );

}

export default SongTags;