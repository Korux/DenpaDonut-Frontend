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

const LineBreak = styled.span`
    width : 100%;
    height : 2px;
    background-color:white;
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
            <QueueHeader/>
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
