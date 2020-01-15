import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ListItem, Checkbox, ListItemIcon, ListItemText, ListItemSecondaryAction,IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

class Taskitem extends Component {
    
    render() {
        const {id, attributes} = this.props.tasks
        return (
            <div className='taskItem'>
                <ListItem dense button onClick={this.props.markComplete.bind(this, id, attributes.status)}>
                        <ListItemIcon>
                            <Checkbox
                                edge='start'
                                checked={attributes.status}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText id={id} primary={attributes.title} />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={this.props.deleteTask.bind(this, id)}>
                            < Edit/>
                        </IconButton>

                        <IconButton edge="end" onClick={this.props.deleteTask.bind(this, id)}>
                            < Delete/>
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
            </div>    
        );
    }

}

// Assert proptype
Taskitem.propTypes = {
    tasks: PropTypes.object.isRequired
}
export default Taskitem;