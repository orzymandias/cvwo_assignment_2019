import React, { Component } from 'react'
import Tasklist from './tasklist'
import CreateDialog from './createdialog'
import axios from 'axios'
import { Paper } from '@material-ui/core';

class Body extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
    this.state = {
      task: this.props.tasks
    }

  }
   
  markComplete = (id) => {
     console.log(id)
    this.setState({task: this.state.task.map(task => {
        if (task.id === id) {
        task.status = !task.status;
        }
        return task;
      })});
  }
  
  // deleteTask = (id) => {
  //   this.setState({task: [...this.state.task.filter((task) => task.id !== id)]});
  // }
  
  deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(res => {
        if (res.status == 204) {
          this.props.getTasks()
        }
      })
  }

  createTask = (title) => {
    const myData = {
      type: 'tasks',
      attributes: {
        title,
        status: false
      }
    }
    const csrfToken = document.querySelector("meta[name=csrf-token]").content;
    const postTask = async () => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: myData })
      });
      if (res.status === 201) {
        console.log(res)
        this.props.getTasks()
      }
    };
    const addTags = async () => {
      const res = await fetch("/api/tasks/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: myData })
      });
      if (res.status === 201) {
        this.props.getTasks()
      }
    };
    postTask();
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
          <Tasklist tasks={this.props.tasks} markComplete = {this.markComplete} deleteTask={this.deleteTask}/>
        </div>
      </div>
    )
  }
}


export default Body;