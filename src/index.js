import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import { Howl } from 'howler';

import './index.css';

class TimeSelector extends Component {
  handleClick(key) {
    switch (key) {
      case '-':
        if (this.props.seconds > 5) {
          this.props.onTimeSubmit(this.props.seconds - 5);
        }
      break;
      case '+':
        if (this.props.seconds < 60) {
          this.props.onTimeSubmit(this.props.seconds + 5);
        }
      break;
      default:
      break;
    }
  }

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <InputGroup>
            <InputGroup.Button>
              <Button onClick={this.handleClick.bind(this, '-')} disabled={this.props.status}>
                <Glyphicon glyph="minus" />
              </Button>
            </InputGroup.Button>
            <FormControl
              readOnly
              type="text"
              value={this.props.seconds + ' Minutes'}
            />
            <InputGroup.Button>
              <Button onClick={this.handleClick.bind(this, '+')} disabled={this.props.status}>
                <Glyphicon glyph="plus" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </Col>
      </Row>
    )
  }
};

class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.timerID = undefined;
    this.BellSound = new Howl({
      src: ['https://s3.amazonaws.com/f623f793d321325d3de5c7f6ff91528-default/fcc/bell.mp3']
    });

    this.state = {
      rest_time: 5,
      work_time: 25,
      running: false,
      working: true,
      current_time: 1500
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleNewWorkTime = this.handleNewWorkTime.bind(this);
    this.handleNewRestTime = this.handleNewRestTime.bind(this);
  }

  handleStart() {
    if (!this.state.running) {
      this.setState({
        running: true
      })
      this.timerID = setInterval(() => {
        if (this.state.current_time > 0) {
          this.setState({
            current_time: this.state.current_time - 1
          })
        } else {
            this.BellSound.play();
            this.handleStop();
            if (this.state.working) {
              this.setState({
                working: false,
                current_time: this.state.rest_time * 60
              })
            } else {
              this.setState({
                working: true,
                current_time: this.state.work_time * 60
              })
          }
        }
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
    if (this.state.working) {
      this.setState({
        current_time: time * 60
      });
    }
  }

  handleNewRestTime(time) {
    this.setState({
      rest_time: time
    });
    if (!this.state.working) {
      this.setState({
        current_time: time * 60
      });
    }
  }

  render() {
    let minutes = Math.floor(this.state.current_time / 60);
    let seconds = this.state.current_time - minutes * 60;
    let progress;
    if (this.state.working) {
      progress = this.state.current_time / (this.state.work_time * 60) * 100;
    } else {
      progress = this.state.current_time / (this.state.rest_time * 60) * 100;
    }

    return (
      <Panel header="Pomodoro Watch" bsStyle="primary">
        <div className="text-center">
          <h4>Session time</h4>
          <TimeSelector
            seconds={this.state.work_time}
            onTimeSubmit={this.handleNewWorkTime}
            status={this.state.running}
          />
          <h4>Break time</h4>
          <TimeSelector
            seconds={this.state.rest_time}
            onTimeSubmit={this.handleNewRestTime}
            status={this.state.running}
          />
          <div id="status">
            {this.state.working ? 'Session - Be productive!' : 'Take a break!'}
          </div>
          <div id="counter">
            {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
          </div>
          <ProgressBar
            bsStyle={this.state.working ? 'success' : 'warning'}
            now={progress}
            label={this.state.working ? 'Session' : 'Break!'}
          />
          <ButtonGroup>
            <Button
              onClick={this.handleStart}
              disabled={this.state.running}
              bsSize="large"
              >
              Start
            </Button>
            <Button
              onClick={this.handleStop}
              disabled={!this.state.running}
              bsSize="large"
              >
                Stop
            </Button>
          </ButtonGroup>
        </div>
      </Panel>

    );
  }
}

Pomodoro.propTypes = {

};

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <Pomodoro />
          </Col>
        </Row>
      </Grid>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
