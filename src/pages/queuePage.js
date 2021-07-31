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

    // load queue, componentdidmount
    useEffect(() => {
        if(queueItems === null && !queue.noqueue){
            let items = [];
            queue.queue.forEach((item, i) => {
                items.push(<QueueItem data={item} key={i}/>);
            });
            setQueueItems(items);
        }else if(queueItems === null && queue.noqueue){
            setQueueItems([]);
        }
    },[queue, queueItems]);

    return(
        <QueueContainer>
            {queueItems === null && 'loading'}
            {queueItems !== null && queueItems.length === 0 && 'empty'}
            {queueItems !== null && queueItems.length > 0 && queueItems}
        </QueueContainer>
    );
}

export default QueuePage;
