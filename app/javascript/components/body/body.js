import React, { Component } from 'react'
import Tasklist from './tasklist'
import {Grid, Paper} from '@material-ui/core';

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
      <Grid container>
        <Grid item sm='3' xs='3'>
          <Paper style={{padding:20}}>
            Sidebar
          </Paper>
        </Grid>
        <Grid item sm='9' xs='9'>
          <Tasklist tasks={this.state.task} markComplete = {this.markComplete} />
        </Grid>
      </Grid>
    )
  }
}


export default Body;