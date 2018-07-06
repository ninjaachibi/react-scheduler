import React, { Component } from 'react';
import logo from './logo.svg';
import ReactModal from 'react-modal'
import './App.css';

ReactModal.setAppElement('#root');

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      timeSlots: Array(8).fill({name: null, phone: null}),

    }
  }

  handleUpdate(i, name, phone) {
    let copy = this.state.timeSlots.slice();
    copy[i] = {name: name, phone: phone};
    this.setState({
      timeSlots: copy
    })
  }

  count() {
    let count = 0;
    this.state.timeSlots.forEach((item, index) => {
      if(item.name && item.phone) {
        count++;
      }
    })
    return count;
  }

  longestBlock() {
    console.log('calculating longest block');
    let start = 0;
    let longest = 0;
    for (let i = 0; i < this.state.timeSlots.length; i++) {
      let anchor = this.state.timeSlots[i];
      if(!anchor.name && !anchor.phone) {

        for (let j = i+1; j < this.state.timeSlots.length; j++){
          let current = this.state.timeSlots[j];

          if(current.name && current.phone) break;
          if(!current.name && !current.phone && j-i > longest) {
            start = i;
            longest = j-i;
          }
        }

      }
    }
    return `${(start+9)%12} ${(start+9)/11 > 1 ? 'pm ': 'am'} - ${(start+longest+9)%12} ${(start+longest+9)/11 > 1 ? 'pm' : 'am'}`
  }

  render() {
    return (
      <div className="day">
        <p>{this.count()} blocks filled</p>

        {this.state.timeSlots.map((item,index) =>
          <TimeSlot
            key={index}
            name={item.name}
            phone={item.phone}
            handleChange={(modalName,modalPhone)=>this.handleUpdate(index, modalName, modalPhone)}
            time={index + 9}
          />)
        }
        <p>longest: {this.longestBlock()}</p>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: new Date()
    };
  }

  getDay(i) {
    let day;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Scheduler</h1>
        </header>

        <p className="App-intro">
        </p>
        {[0,0,0,0,0].map((item,index) => <Day />)}
      </div>
    );
  }
}

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      modalName: '',
      modalPhone: '',
      showModal: false
    }
    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
    console.log('closed');
    console.log(this.state.showModal);
  }

  handleUpdate(){
    this.props.handleChange(this.state.modalName, this.state.modalPhone);
    this.handleCloseModal();
  }

  render() {
    return (
      <div>
        <div className="time-slot" onClick={()=>this.handleOpenModal()} style={this.props.name && this.props.phone ? {"backgroundColor": "lightblue"} : {"":""}} >
          {this.props.time/12 > 1 ? this.props.time%12 : this.props.time} {this.props.time/11 > 1 ? "pm" : "am"}<br/>
          {
            this.props.name && this.props.phone ?
            <div>
              <p>Name: {this.props.name}</p>
              <p>Phone: {this.props.phone}</p>
            </div>
            :
            <p><i>unscheduled...</i></p>
          }
        </div>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           onRequestClose={()=>this.handleCloseModal()}
        >
          <div>{this.props.time/12 > 1 ? this.props.time%12 : this.props.time} {this.props.time/11 > 1 ? "pm" : "am"}<br/></div>
          <form>
            <label>Name:</label> <input onChange={(e)=>this.setState({modalName: e.target.value})} placeholder="name..." value={this.state.modalName}/> <br/>
            <label>Phone number:</label> <input onChange={(e)=>this.setState({modalPhone: e.target.value})} placeholder="phone number..." value={this.state.modalPhone}/>
          </form>
          <button onClick={()=>this.handleCloseModal()}>Close Modal</button>
          <button onClick={()=>this.handleUpdate()}>Update</button>
        </ReactModal>
      </div>
    )
  }
}

export default App;
