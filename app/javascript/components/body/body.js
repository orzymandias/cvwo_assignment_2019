import React, { Component } from "react";
import Tasklist from "./tasklist";
import CreateDialog from "./createdialog";
import axios from "axios";

class Body extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  csrfToken = document.querySelector("meta[name=csrf-token]").content;

  markComplete = (id, status) => {
    const myData = {
      type: "tasks",
      id,
      attributes: {
        status: !status
      }
    };
    const completeTask = async () => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": this.csrfToken
        },
        body: JSON.stringify({ data: myData })
      });
      if (res.status === 200) {
        this.props.getTasks();
      }
    };
    completeTask();
  };

  deleteTask = id => {
    axios.delete(`/api/tasks/${id}`).then(res => {
      if (res.status == 204) {
        this.props.getTasks();
      }
    });
  };

  createTask = (title, tagObjArr) => {
    const taskData = {
      type: "tasks",
      attributes: {
        title,
        status: false
      }
    };
    const tagData = tagObjArr.map(tag => {
      return {
        type: "tags",
        id: tag.id
      };
    });

    const assocTag = async id => {
      const tagRes = await fetch(`/api/tasks/${id}/relationships/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": this.csrfToken
        },
        body: JSON.stringify({ data: tagData })
      });
      if (tagRes.status === 201) {
      } else {
        console.log(tagRes.status);
      }
    };
    const postTask = async () => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": this.csrfToken
        },
        body: JSON.stringify({ data: taskData })
      });
      if (res.status === 201) {
        const content = await res.json();
        const taskID = content.data.id;
        assocTag(taskID);
        this.props.getTasks();
      }
    };
    postTask();
  };

  updateTask = (id, title, status, tasktags) => {
    const taskData = {
      type: "tasks",
      id,
      attributes: {
        title,
        status: status
      }
    };
    const tagData = tasktags.map(tag => {
      return {
        type: "tags",
        id: tag.id
      };
    });
    const patchTag = async id => {
      const tagRes = await fetch(`/api/tasks/${id}/relationships/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": this.csrfToken
        },
        body: JSON.stringify({ data: tagData })
      });
      if (tagRes.status === 201) {
        this.props.getTasks();
      } else {
        const content = await tagRes.json();
      }
    };
    const patchTask = async () => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": this.csrfToken
        },
        body: JSON.stringify({ data: taskData })
      });
      if (res.status === 200) {
        patchTag(id);
        this.props.getTasks();
      } else {
        console.log(res.status);
      }
    };
    patchTask();
  };

  getStyles = () => ({

    createRow: {
      padding: 10
    },

    createDialog: {
      top: "50%"
    }
  });

  render() {
    const classes = this.getStyles();
    return (
      <>
        {/* <div className="title" style={classes.bodyTitle}>
          Tasks
          </div> */}
        <div id="createRow" style={classes.createRow}>
          <CreateDialog
            style={classes.createDialog}
            createTask={this.createTask}
            tags={this.props.tags}
          />
        </div>
        <div className={classes.taskList}>
          <Tasklist
            updateTask={this.updateTask}
            tasks={this.props.tasks}
            tags={this.props.tags}
            markComplete={this.markComplete}
            deleteTask={this.deleteTask}
          />
        </div>
      </>

    );
  }
}

export default Body;
