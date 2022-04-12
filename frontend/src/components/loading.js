import React, {Fragment} from 'react';
import styled from 'styled-components';

import ReactLoading from 'react-loading';

const StyledLoading = styled(ReactLoading)`
    position : absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledLoadingAlt = styled(ReactLoading)`
`;

function Loading({type,color,width,height}){
    return(
        <Fragment>
            {type==="spin" && <StyledLoading type={type} color={color} height={height} width={width} />}
            {type==="bubbles" && <StyledLoadingAlt type={type} color={color} height={height} width={width} />}
        </Fragment>
    
    );
}

export default Loading;