import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Taskitem from './taskitem';
import {List} from '@material-ui/core';


class Tasklist extends Component {

    render() {
        return (
            <List>
                {this.props.tasks.map(task => {
                return(
                    <Taskitem key={task.id} tasks={task} markComplete={this.props.markComplete} deleteTask={this.props.deleteTask}/>);
                
                })}
            </List>
        );

    }
}

// Assert proptype
Tasklist.propTypes = {
    tasks: PropTypes.array.isRequired
}

export default Tasklist;

