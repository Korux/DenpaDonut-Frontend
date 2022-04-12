import React, {useEffect, Fragment} from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getQueue } from '../redux/selectors';


import QueueItem from './queueItem';
import QueueHeader from './queueHeader';
import Loading from './loading';

import EmptyImg from '../images/empty.png';
const EmptyQueueDisplay = () => {
    return(
        <div>
            <img style={{width : '200px'}} src={EmptyImg} alt={"error image"}/>
            <div style={{fontSize : '16px'}}>
                No Songs in Queue
            </div>
        </div>
    );

}

const QueueContainer = styled.div`
    height : 45%;
    width : 100%;
    background-color : ${({theme}) => theme.queueBackground};
    transition : all 0.3s ease-in-out;
    position : fixed;
    bottom : ${({open}) => open ? '0' : '-45%'};
    z-index : 998;
    overflow-y : scroll;
`;



function QueuePullout({open}){

    var queue = useSelector(getQueue);
    const [queueItems, setQueueItems] = React.useState(null);

    // update queue on change
    useEffect(() => {
        if(queue.noqueue){
            setQueueItems([]);
        }else{
            let items = [];
            queue.queue.forEach((item, i) => {
                items.push(<QueueItem data={item} key={i+1} id={i} />);
            });
            setQueueItems(items);
        }
    },[queue]);


    return(
        <Fragment>
            <QueueHeader open={open}/>
            
            <QueueContainer open={open}>
                {queueItems === null && <Loading type={'spin'} color={'#555555'} height={75} width={75}/>}

                {queueItems !== null && queueItems.length === 0 &&
                <Fragment>
                    <EmptyQueueDisplay/>
                </Fragment>
                }

                {queueItems !== null && queueItems.length > 0 && queueItems}
            </QueueContainer>
        </Fragment>
    );
}

export default QueuePullout;
