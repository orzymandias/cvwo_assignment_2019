import React, { Component, Fragment } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  FormControl,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

class CreateDialog extends Component {
  state = {
    open: false,
    task: {
      title: ""
    },
    tag: {
      tagObj: []
    }
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = name => e => {
    if (name === "task") {
      this.setState({
        task: {
          [e.target.id]: e.target.value
        }
      });
    } else {
      this.setState({
        tag: {
          tagObj: e.target.value
        }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createTask(this.state.task.title, this.state.tag.tagObj);
    this.setState({
      task: {
        ...this.state.task,
        title: ""
      },
      tag: {
        ...this.state.tag,
        tagObj: []
      }
    });
    this.handleToggle();
  };

  render() {
    const tags = this.props.tags;
    return (
      <Fragment>
        <Button
          variant="contained"
          color="primary"
          endIcon={<CreateIcon />}
          onClick={this.handleToggle}
        >
          Create New Task
        </Button>

        <Dialog open={this.state.open} onClose={this.handleToggle}>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                label="Create Task"
                id="title"
                value={this.state.task.title}
                onChange={this.handleChange("task")}
              />
              <br />
              <FormControl>
                <InputLabel>Tags</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="name"
                  multiple
                  value={this.state.tag.tagObj}
                  onChange={this.handleChange("tag")}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div>
                      {selected.map(value => (
                        <Chip key={value.id} label={value.attributes.name} />
                      ))}
                    </div>
                  )}
                >
                  {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag}>
                      <Checkbox
                        checked={this.state.tag.tagObj.indexOf(tag) > -1}
                      />
                      <ListItemText primary={tag.attributes.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit}>Create</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default CreateDialog;
