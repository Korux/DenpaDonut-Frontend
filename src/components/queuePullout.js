import React, {useEffect, Fragment} from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getQueue } from '../redux/selectors';

import ShuffleButton from '../components/shuffleButton';

import QueueItem from '../components/queueItem';
import Loading from '../components/loading';

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

const QueueListHeader = styled.div`
`;

const QueueListHeaderContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    width : 100%;
    height : 50px;
    position : fixed;
    transition : all 0.3s ease-in-out;
    bottom : ${({open}) => open ? '45%' : '-50px'};
    background-color :${({theme}) => theme.queueBackground};
    z-index : 999;
`;

const LineBreak = styled.span`
    width : 100%;
    height : 2px;
    background-color : rgb(100,100,100);
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
            if(queue.idx > 0) items = items.slice(queue.idx * 2) ;
            setQueueItems(items);
        }
    },[queue]);


    return(
        <Fragment>
            <QueueListHeaderContainer open={open}>
                <QueueListHeader style={{width : "calc(32% + 67.5px)"}}>
                    TITLE
                </QueueListHeader>
                <QueueListHeader style={{width : "32%"}}>
                    ALBUM
                </QueueListHeader>
                <QueueListHeader style={{width : "32%"}}>
                    YEAR
                </QueueListHeader>
                <QueueListHeader style={{width : "4%"}}>
                    DURATION
                </QueueListHeader>
            </QueueListHeaderContainer>
            <LineBreak/>
            <QueueContainer open={open}>
                {queueItems === null && <Loading type={'spin'} color={'#555555'} height={75} width={75}/>}

                {queueItems !== null && queueItems.length === 0 &&
                <Fragment>
                    <EmptyQueueDisplay/>
                    <ShuffleButton/>
                </Fragment>
                }

                {queueItems !== null && queueItems.length > 0 && queueItems}
            </QueueContainer>
        </Fragment>
    );
}

export default QueuePullout;