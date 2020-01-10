import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Taskitem from './taskitem';
import {List, ListItem, ListItemText} from '@material-ui/core';


class Tasklist extends Component {

    render() {
        return (
            <List>
                {this.props.tasks.map(task => {
                return(
                    <Taskitem key={task.id} tasks={task} markComplete={this.props.markComplete}/>

                        
                );
                
                b})}
            </List>
        );

    }
}

// Assert proptype
Tasklist.propTypes = {
    task: PropTypes.array.isRequired
}

export default Tasklist;

