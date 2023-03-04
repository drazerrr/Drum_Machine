import React from 'react';
import './App.css';
import {bankOne, bankTwo} from './source.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: bankOne,
      display: '',
      volume: 0.5,
      switch: false
    }
    this.playSound = this.playSound.bind(this);
    this.volumer = this.volumer.bind(this);
    this.bankChange = this.bankChange.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      this.playSound(event.key.toUpperCase())
    })
  }
  componentWillUnmount() {

    document.removeEventListener('keydown', (event) => {
      this.playSound(event.key.toUpperCase())
    })
  }
  volumer(e) {
    this.setState({
      volume: e.target.value

    })
  }
  playSound(e) {
    let audio = document.getElementById(e);
    audio.currentTime = 0;
    audio.volume = this.state.volume;
    audio.play();
    this.setState({
      display: e.replace("-", " ")
    })
  }
  bankChange() {
   if(this.state.switch){
    this.setState({
      data: bankTwo,
      switch: false,
      display: "Smooth Piano Kit"
    })
   }else {
    this.setState({
      data: bankOne,
      switch: true,
      display: "Heater Kit"
    })
   }
  }
    render(){
      return (
        <div id="drum-machine">
         {this.state.data.map((item, index, array) => <button onClick={() => this.playSound(array[index].id)} key={array[index].keyCode} className="drum-pad" id={array[index].keyString}><audio className="clip" id={array[index].id} src={array[index].url}></audio>{array[index].keyString}</button>)
         }
         
         <input type="range" min="0" max="1" step="0.01" value={this.state.volume} onChange={this.volumer} id="volume"></input>
         <label>Volume: {Math.floor(this.state.volume * 100)}</label>
         <div id="display">{this.state.display}</div>
         <button value={this.state.switch} onClick={this.bankChange}>Bank</button>
        </div>
      )
    }
  }
export default App;
