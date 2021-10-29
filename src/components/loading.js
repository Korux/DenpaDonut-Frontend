import React from 'react';
import styled from 'styled-components';

import ReactLoading from 'react-loading';

const StyledLoading = styled(ReactLoading)`
    position : absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

function Loading({type,color,width,height}){
    return(<StyledLoading type={type} color={color} height={height} width={width} />);
}

export default Loading;