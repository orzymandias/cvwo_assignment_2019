import React, { Component } from 'react'
import Tasklist from './tasklist'
import CreateDialog from './createdialog'
import uuid from 'uuid';

class Body extends Component {
  state = {
    task: this.props.tasks
  }
  markComplete = (id) => {
    this.setState({task: this.state.task.map(task => {
        if (task.id === id) {
        task.status = !task.status;
        }
        return task;
      })});
  }
  
  deleteTask = (id) => {
    this.setState({task: [...this.state.task.filter((task) => task.id !== id)]});
  }

  createTask = (title) => {
    const newTask = {
      id: uuid.v4(),
      title, 
      status: false
    }
    this.setState({task: [...this.state.task, newTask]});
  }
  
  getStyles = () => ({
    createRow: {
      padding: 20,
    },
  });

  render() {

    const classes = this.getStyles()
    
    return (
      <div id='body' style={classes.root}>
        <div id='createRow' style={classes.createRow} >
          <CreateDialog createTask={this.createTask}/>
        </div>
        <div className={classes.taskList}>
          <Tasklist tasks={this.state.task} markComplete = {this.markComplete} deleteTask={this.deleteTask}/>
        </div>
      </div>
    )
  }
}


export default Body;