import React, { Component } from "react";
import PropTypes from "prop-types";
import Taskitem from "./taskitem";
import { List } from "@material-ui/core";

class Tasklist extends Component {
  render() {
    return (
      <List>
        {this.props.tasks.map(task => {
          const { attributes } = task;
          if (!attributes.status) {
            return (
              <Taskitem
                updateTask={this.props.updateTask}
                tags={this.props.tags}
                key={task.id}
                tasks={task}
                markComplete={this.props.markComplete}
                tasktags={this.props.tasktag}
                deleteTask={this.props.deleteTask}
              />
            );
          }
        })}
        {this.props.tasks.map(task => {
          const { attributes } = task;
          if (attributes.status) {
            return (
              <Taskitem
                updateTask={this.props.updateTask}
                tags={this.props.tags}
                key={task.id}
                tasks={task}
                tasktags={this.props.tasktag}
                markComplete={this.props.markComplete}
                deleteTask={this.props.deleteTask}
              />
            );
          }
        })}
      </List>
    );
  }
}

export default Tasklist;