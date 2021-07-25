import React from 'react';

import AddSongButton from '../components/addSongButton';
import ShuffleButton from '../components/shuffleButton';

function HomePage(){
  
    return (
      <div className="App">
        <AddSongButton type="youtube"/>
        <AddSongButton type="spotify"/>
        <ShuffleButton/>
      </div>
    );
}

export default HomePage;