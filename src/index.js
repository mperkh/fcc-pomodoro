import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.timerID = undefined;

    this.state = {
      rest_time: 300,
      work_time: 1500,
      status: 'stopped',
      current_time: 1500
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillMount() {
//
  }

  componentDidMount() {

  }

  handleStart() {
    this.timerID = setInterval(() => {
      this.setState({
        current_time: this.state.current_time - 1
      })
    }, 1000);
  }

  handleStop() {
    clearInterval(this.timerID);
  }

  render() {
    let minutes = Math.floor(this.state.current_time / 60);
    var seconds = this.state.current_time - minutes * 60;
    return (
      <div>
        {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleStop}>Stop</button>
      </div>

    );
  }
}

Pomodoro.propTypes = {

};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pomodoro />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
