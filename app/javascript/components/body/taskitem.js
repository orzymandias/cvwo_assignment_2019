import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TaskTags from './tasktagsmenu'
import { ListItem, Checkbox, ListItemIcon, ListItemText, ListItemSecondaryAction,IconButton, Menu} from '@material-ui/core';
import { Delete, Edit, LocalOffer } from '@material-ui/icons';
import axios from 'axios'

class Taskitem extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            tasktag: []
        }
      }
    
    
    handleOpen = (e) => {
        this.setState({
          anchorEl: e.currentTarget,
          open: !this.state.open});
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: !this.state.open,
            tasktag: []
        });
        console.log('wiping state')
    };

    getTaskTags = (id) =>  {
        axios.get(`/api/tasks/${id}/tags`)
        .then(res => {
        if (res.status === 200) {
            this.setState({tasktag: res.data.data})
            }
        })
    }
    
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
                        <IconButton edge="end" 
                        onClick={(e) => {this.handleOpen(e); this.getTaskTags(id)}}>
                            < LocalOffer/>
                        </IconButton>
                        <Menu
                            open={this.state.open}
                            onClose={this.handleClose}
                            anchorEl={this.state.anchorEl}
                            keepMounted
                        >
                            <TaskTags 
                            tasktags={this.state.tasktag}
                            handleClose={this.handleClose}
                            />
                        </Menu>

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