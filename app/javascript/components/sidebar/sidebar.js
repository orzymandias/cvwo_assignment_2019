import React, { Component } from 'react'
import { Paper, TextField, IconButton, InputAdornment} from '@material-ui/core'
import axios from 'axios'
import Taglist from './taglist';
import AddBoxIcon from '@material-ui/icons/AddBox';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.createTag = this.createTag.bind(this)
      this.state = {
        name: ''
      }
    }

    handleChange = (e) => {
      this.setState({name: e.target.value})
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.createTag(this.state.name);
      this.setState({
        name: ''
      });
    };

    createTag = (name) => {
      const tagData = {
        type: 'tags',
        attributes: {
          name         
        },
      }
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
  
      const postTag = async () => {
        const res = await fetch("/api/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify({ data: tagData })
        });
        if (res.status === 201) {
          this.props.getTags()
        }
      };
      postTag();
    }

    deleteTag = (id) => {
      axios.delete(`/api/tags/${id}`)
        .then(res => {
          if (res.status == 204) {
            this.props.getTags()
          }
        })
    }

    getStyles = () => ({
      createRow: {
        padding: 20,
        textAlign: 'center',
        width: 'auto'
      },
      sideBarTitle: {
        padding: 10,
        color: '#111',
        fontFamily: ['Georgia', 'Times New Roman', 'serif'],
        fontSize: '5em',
        fontWeight: 'normal',
        width: 'auto',
        lineHeight: 1,
        textAlign: 'left' 
      },
      tagList: {
      }

    });
  
    render() {
      const classes = this.getStyles()
      return (
        <Paper>
          <div id='sideBar' style={classes.root}>
            <div id='sideBarTitle' style={classes.sideBarTitle}>
              Tags
            </div>
            <div id='createRow' style={classes.createRow} >
              <form style={classes.formInput}>
                <TextField 
                  id="create-tag-field" 
                  label="Add Tag" 
                  variant="outlined" 
                  fullWidth
                  value={this.state.name}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><IconButton
                    onClick={this.handleSubmit}
                    ><AddBoxIcon/></IconButton>
                    </InputAdornment>,
                  }}/>
              </form>
            </div>
          <div style={classes.tagList}>
            <Taglist 
              tags={this.props.tags}
              getTagTask={this.props.getTagTask}
              deleteTag={this.deleteTag}
            />
          </div>
        </div>
        </Paper>
        
      )
    }
}
  
  
  export default Sidebar;