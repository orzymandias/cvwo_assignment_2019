import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Taskitem from './taskitem';
import {Paper} from '@material-ui/core';


class Tasklist extends Component {

    render() {
        return (
            <Paper>
                            {this.props.tasks.map(task => (
            <Taskitem key={task.id} tasks={task} markComplete={this.props.markComplete}/>
            ))}
                
            </Paper>

        );
    }
}

// Assert proptype
Tasklist.propTypes = {
    task: PropTypes.array.isRequired
}

export default Tasklist;

