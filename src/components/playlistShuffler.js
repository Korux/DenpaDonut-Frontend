import globalVars from '../global';

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const PlaylistShuffler = () => {

    return new Promise((resolve, reject) => {
        fetch(globalVars.server + "/songs")
        .then(response => response.json())
        .then(data => {
            shuffle(data);
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
};

export default PlaylistShuffler;