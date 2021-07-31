import React from 'react';
import styled from 'styled-components';

function SongItem({data}){
    return(
        <div>
            {data.title}
        </div>
    );
}

export default SongItem;
