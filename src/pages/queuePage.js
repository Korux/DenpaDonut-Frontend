import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { getQueue } from '../redux/selectors';


function QueuePage(){

    var queue = useSelector(getQueue);
    console.log(queue);

    return(
        <div>

        </div>
    );
}

export default QueuePage;
