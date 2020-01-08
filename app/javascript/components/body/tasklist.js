import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Taskitem from './taskitem';

class Tasklist extends Component {

    render() {
        return (
            this.props.tasks.map(task => (
            <Taskitem key={task.id} tasks={task} markComplete={this.props.markComplete}/>
            ))
        );
    }
}

// Assert proptype
Tasklist.propTypes = {
    task: PropTypes.array.isRequired
}

export default Tasklist;

