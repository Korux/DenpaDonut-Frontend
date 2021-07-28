import React, {Fragment} from 'react';

import AddSongButton from '../components/addSongButton';
import ShuffleButton from '../components/shuffleButton';

function HomePage(){

    return (
      <Fragment>
        <AddSongButton type="youtube"/>
        <AddSongButton type="spotify"/>
        <ShuffleButton/>
      </Fragment>
    );
}

export default HomePage;
