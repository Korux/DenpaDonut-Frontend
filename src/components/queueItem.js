import React from 'react';
import styled from 'styled-components';

function QueueItem({data}){
    return(
        <div>
            {data.title}
        </div>
    );
}

export default QueueItem;
