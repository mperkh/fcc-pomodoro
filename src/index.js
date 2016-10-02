import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

import './index.css';

class TimeSelector extends Component {
  /*constructor(props) {
    super(props);
  }
  */

  handleClick(key) {
    switch (key) {
      case '-':
        this.props.onTimeSubmit(this.props.seconds - 1);
      break;
      case '+':
        this.props.onTimeSubmit(this.props.seconds + 1);
      break;
      default:
      break;
    }
  }

  render() {
    return (
      <InputGroup>
        <InputGroup.Button>
          <Button onClick={this.handleClick.bind(this, '-')} bsStyle="primary">
            <Glyphicon glyph="minus" />
          </Button>
        </InputGroup.Button>
        <FormControl
          type="text"
          value={this.props.seconds}
        />
        <InputGroup.Button>
          <Button onClick={this.handleClick.bind(this, '+')} bsStyle="primary">
            <Glyphicon glyph="plus" />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }
};

class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.timerID = undefined;

    this.state = {
      rest_time: 300,
      work_time: 1500,
      running: false,
      current_time: 1500
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleNewWorkTime = this.handleNewWorkTime.bind(this);
    this.handleNewRestTime = this.handleNewRestTime.bind(this);
  }

  componentWillMount() {
//
  }

  componentDidMount() {

  }

  handleStart() {
    if (!this.state.running) {
      this.setState({
        running: true
      })
      this.timerID = setInterval(() => {
        this.setState({
          current_time: this.state.current_time - 1
        })
      }, 1000);
    }
  }

  handleStop() {
    if (this.state.running) {
      clearInterval(this.timerID);
      this.setState({
        running: false
      })
    }
  }

  handleNewWorkTime(time) {
    this.setState({
      work_time: time
    });
  }

  handleNewRestTime(time) {
    this.setState({
      rest_time: time
    });
  }

  render() {
    let minutes = Math.floor(this.state.current_time / 60);
    var seconds = this.state.current_time - minutes * 60;
    return (
      <div>
        <TimeSelector seconds={this.state.rest_time} onTimeSubmit={this.handleNewRestTime}/>
        <TimeSelector seconds={this.state.work_time} onTimeSubmit={this.handleNewWorkTime}/>
        {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
        <Button onClick={this.handleStart} bsStyle="primary" disabled={this.state.running}>
          Start
        </Button>
        <Button onClick={this.handleStop} bsStyle="danger" disabled={!this.state.running}>
          Stop
        </Button>
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
