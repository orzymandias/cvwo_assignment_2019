import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TaskTags from './tasktagsmenu'
import { ListItem, Checkbox, ListItemIcon, ListItemText, ListItemSecondaryAction,IconButton, Menu, Dialog} from '@material-ui/core';
import { Delete, Edit, LocalOffer } from '@material-ui/icons';
import axios from 'axios'
import GeneralDialog from './dialog'

class Taskitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            dialogState: false,
            tasktitle: this.props.tasks.attributes.title,
            tasktag: [],
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
    };

    getTaskTags = (id) =>  {
        axios.get(`/api/tasks/${id}/tags`)
        .then(res => {
        if (res.status === 200) {
            this.setState({tasktag: res.data.data})
            }
        })
    }



    updateTaskTitleState = (tasktitle) => {
        this.setState({
            tasktitle
        }, () => console.log(this.state.tasktitle));  // adding callback so state will be updated immediately
    }
    

    toggleDialog = () => {
        this.setState({
            dialogState: !this.state.dialogState
        })
    }
    
   


    render() {
        const {id, attributes} = this.props.tasks
        let editDialog;
        if (!this.state.dialogState) {
            // console.log('not opened')
            editDialog = null;
        } else {
            // console.log('openning dialog')
            editDialog = <GeneralDialog 
                id={id}
                tasktitle={this.state.tasktitle}
                status={status}
                updateTaskTitleState={this.updateTaskTitleState}
                updateTask={this.props.updateTask}
                dialogState={this.state.dialogState} 
                toggleDialog={this.toggleDialog} 
                tags={this.props.tags}
                tasktag={this.state.tasktag}
                action={'edit'}/>
                
        }

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

                        <IconButton edge="end" onClick={e => {this.toggleDialog(e); this.getTaskTags(id)}}>
                            < Edit/>
                        </IconButton>
                        {editDialog}

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