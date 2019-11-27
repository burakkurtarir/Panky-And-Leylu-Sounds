import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        soundSrc: 'https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3',
        sounds: [],
        currentSound: {Name: '', Source: ''}
      };
    }

    componentDidMount(){
      this.getSounds();
    }

    getSounds = () => {
      var that = this;
      // Get a non-default Storage bucket
      var storage = firebase.app().storage("gs://panky-and-leylu-sounds.appspot.com");
      var pankyRef = storage.ref("panky");

      pankyRef.listAll().then(function(res){
        res.prefixes.forEach(function(folderRef){
          console.log("FolderRef" + folderRef);
        });
        res.items.forEach(function(itemRef){
          console.log(itemRef.name);
          let sound = {Name: itemRef.name, Source: '', isLoading: false, isLoaded: false};
          let sounds = that.state.sounds;
          sounds.push(sound);
          that.setState({sounds});
        });
      }).catch(function(error){
        console.log("Error" + error);
      });
    }

    addNewSound = () => {
      let sounds = this.state.sounds;
      let sound = {Name: 'Panky Sound' + (sounds.length + 1), Source: 'https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3'};
      sounds.push(sound);
      this.setState({sounds});
    }

    downloadSound(soundName){
      var that = this;

      var storage = firebase.storage();
      var soundRef = storage.ref('panky/' + soundName);

      let sounds = that.state.sounds;
      let index = sounds.findIndex(s => s.Name == soundName);
      //sounds[index].isLoading = true;
      that.setState({sounds});

      soundRef.getDownloadURL().then(function(url){
        console.log(url);

        sounds[index].Source = url;
        //sounds[index].isLoading = false;
        let currentSound = that.state.currentSound;
        currentSound.Name = sounds[index].Name;
        currentSound.Source = sounds[index].Source;

        that.setState({sounds, currentSound});
        var myAudio = document.getElementById("myAudio");
        var myAudioSource = document.getElementById("myAudioSource");
        //myAudioSource.src = sounds[index].Source;
        myAudio.load();
        myAudio.play();
        //console.log(that.state.sounds);
        //sound.Source = url;
      });
    }

  render(){

    let sounds = this.state.sounds;
    let soundList = sounds.map((sound, index) =>
      <li key={index} onClick={() => {this.downloadSound(sound.Name)}}>
          <a href="#">{sound.Name}</a>
      </li>
    );

    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.currentSound.Name}</p>
          <audio id="myAudio" controls="controls">
            <source id="myAudioSource" src={this.state.currentSound.Source}></source>
          </audio>
          <div className="list-type1">
            <ol>
              {soundList}
            </ol>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/
