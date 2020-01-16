import React, { Component } from 'react'
import Tasklist from './tasklist'
import CreateDialog from './createdialog'
import axios from 'axios'
import { Paper } from '@material-ui/core';

class Body extends Component {
  constructor() {
    super();
    this.createTask = this.createTask.bind(this);
  }
  
  

  markComplete = (id, status) => {
    const myData = {
      type: 'tasks',
      id,
      attributes: {
        status: !status
      }
    }
    const csrfToken = document.querySelector("meta[name=csrf-token]").content;
    const completeTask = async () => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: myData })
      });
      if (res.status === 200) {
        this.props.getTasks()
      }
    };
    completeTask();
  }
  
  deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(res => {
        if (res.status == 204) {
          this.props.getTasks()
        }
      })
  }

  createTask = (title, tagObjArr) => {
    const taskData = {
      type: 'tasks',
      attributes: {
        title,
        status: false
      },
    }
    const tagData = tagObjArr.map(tag => {
      return {
        type: 'tags',
        id: tag.id
      }
    })
    const csrfToken = document.querySelector("meta[name=csrf-token]").content;

    const assocTag = async (id) => {
      const tagRes = await fetch(`/api/tasks/${id}/relationships/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: tagData })
      });
      if (tagRes.status === 201) {
        console.log('tag linked!')
      } else {
        console.log(tagRes.status)
      }
    }
    const postTask = async () => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: taskData })
      });
      if (res.status === 201) {
        const content = await res.json()
        const taskID = content.data.id
        assocTag(taskID)
        this.props.getTasks()
      }
    };
    postTask();
  }
  
  
  getStyles = () => ({
    root: {
      padding: 20
    },
    createRow: {
      width: '100%',
      padding: 20,
    },
    bodyTitle: {
      padding: 10,
      color: '#111',
      fontFamily: ['Georgia', 'Times New Roman', 'serif'],
      fontSize: '5em',
      fontWeight: 'normal',
      width: 'auto',
      lineHeight: 1,
      textAlign: 'left' 
    },
    createDialog: {
      top: '50%'
    }
  });

  render() {
    const classes = this.getStyles()
    return (
      <Paper>
        <div id='body' style={classes.root}>
          <div id='bodyTitle' style={classes.bodyTitle}>
              Tasks
          </div>
        <div id='createRow' style={classes.createRow} >
          <CreateDialog style={classes.createDialog} createTask={this.createTask} tags={this.props.tags} getTags={this.props.getTags}/>
        </div>
        <div className={classes.taskList}>
          <Tasklist tasks={this.props.tasks}
          markComplete={this.markComplete} 
          deleteTask={this.deleteTask}/>
        </div>
      </div>

      </Paper>

    )
  }
}


export default Body;