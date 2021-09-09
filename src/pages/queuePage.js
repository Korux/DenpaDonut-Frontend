import React, {useEffect} from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getQueue } from '../redux/selectors';

import ShuffleButton from '../components/shuffleButton';


import QueueItem from '../components/queueItem';
import QueueHeader from '../components/queueHeader';

const QueueContainer = styled.div`
    display : flex;
    flex-flow: column wrap;
    justify-content : center;
    align-items : center;
`;

const QueueListHeader = styled.div`
`;

const QueueListHeaderContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    width : 95%;
`;

const LineBreak = styled.span`
    width : 100%;
    height : 2px;
    background-color : rgb(100,100,100);
`;

function QueuePage(){

    var queue = useSelector(getQueue);
    const [queueItems, setQueueItems] = React.useState(null);

    const handleDrag = () => {

    };

   const handleDragEnd = () => {

    };

    // update queue on change
    useEffect(() => {
        if(queue.noqueue){
            setQueueItems([]);
        }else{
            let items = [];
            queue.queue.forEach((item, i) => {
                items.push(<QueueItem data={item} key={i} id={i} onDrag={handleDrag} onDragEnd={handleDragEnd}/>);
            });
            if(queue.idx > 0) items = items.slice(queue.idx);
            setQueueItems(items);
        }
    },[queue]);

    return(
        <QueueContainer>
            <QueueHeader/>
            <QueueListHeaderContainer>
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
            {queueItems === null && 'loading'}

            {queueItems !== null && queueItems.length === 0 &&
                <div>
                    'empty'
                    <ShuffleButton/>
                </div>
            }

            {queueItems !== null && queueItems.length > 0 && queueItems}
        </QueueContainer>
    );
}

export default QueuePage;
