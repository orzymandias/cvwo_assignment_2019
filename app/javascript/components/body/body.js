import React, { Component } from 'react'
import Tasklist from './tasklist'

class Body extends Component {
  state = {
    task: [
      {
        id: 1,
        title: 'take out trash',
        status: false
      },
      {
        id: 2,
        title: 'make out with trash',
        status: false
      },
      {
        id: 3,
        title: 'make trash',
        status: false
      },
      {
        id: 4,
        title: 'take out babe',
        status: false
      }
    ]
  }
  markComplete = (id) => {
    this.setState({task: this.state.task.map(task => {
        if (task.id === id) {
        task.status = !task.status;
        }
        return task;
      })});

  } 
  render() {
    return (
      <div>

        <Tasklist tasks={this.state.task} markComplete = {this.markComplete} />
      </div>
    )
  }
}


export default Body;