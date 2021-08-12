import React, {useEffect} from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getQueue } from '../redux/selectors';

import QueueItem from '../components/queueItem';

const QueueContainer = styled.div`
`;

function QueuePage(){

    var queue = useSelector(getQueue);
    const [queueItems, setQueueItems] = React.useState(null);

    // update queue on change
    useEffect(() => {
        if(queue.noqueue){
            setQueueItems([]);
        }else{
            let items = [];
            queue.queue.forEach((item, i) => {
                items.push(<QueueItem data={item} key={i}/>);
            });
            if(queue.idx > 0) items = items.slice(queue.idx);
            setQueueItems(items);
        }
    },[queue]);

    return(
        <QueueContainer>
            {queueItems === null && 'loading'}
            {queueItems !== null && queueItems.length === 0 && 'empty'}
            {queueItems !== null && queueItems.length > 0 && queueItems}
        </QueueContainer>
    );
}

export default QueuePage;
