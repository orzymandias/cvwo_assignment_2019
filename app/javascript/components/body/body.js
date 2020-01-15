import React, { Component } from 'react'
import Tasklist from './tasklist'
import CreateDialog from './createdialog'
import axios from 'axios'

class Body extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
    this.state = {
    }

  }
   
  markComplete = (id, status) => {
    console.log(id)
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
    console.log(tagObjArr)
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
        console.log('task createdd')
        const content = await res.json()
        const taskID = content.data.id
        assocTag(taskID)
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
          <CreateDialog createTask={this.createTask} tags={this.props.tags} getTags={this.props.getTags}/>
        </div>
        <div className={classes.taskList}>
          <Tasklist tasks={this.props.tasks} markComplete = {this.markComplete} deleteTask={this.deleteTask}/>
        </div>
      </div>
    )
  }
}


export default Body;