import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Scheduler</h1>
        </header>

        <p className="App-intro">
          <h1>Name: {this.state.name} <br/>Phone: {this.state.phone}</h1>
        </p>

        <div className="time-slot" style={this.state.name && this.state.phone ? {"background-color": "lightblue"} : {"":""}} >
          Time Slot <br/>
          <label>Name:</label> <input onChange={(e)=>this.setState({name: e.target.value})} placeholder="name..."/> <br/>
          <label>Phone number:</label> <input onChange={(e)=>this.setState({phone: e.target.value})} placeholder="phone number..."/>
        </div>
      </div>
    );
  }
}

export default App;
