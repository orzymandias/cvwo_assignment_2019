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

class GeneralDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasktag: []
    };
  }

  handleToggle = () => {
    this.props.toggleDialog();
  };

  handleDialogChange = name => e => {
    if (name === "task") {
      this.props.updateTaskTitleState(e.target.value);
    } else {
      let value = e.target.value;
      const len = value.length;
      let existing = value.slice(0, len - 1);
      const latest = value.slice(len - 1);
      existing = existing.filter(x => x.id !== latest[0]["id"]);
      existing.length === len - 1
        ? (existing = existing.concat(latest))
        : existing;
      this.setState(
        {
          tasktag: existing
        },
        () => console.log(this.state.tasktag)
      );
    }
  };

  handleSubmit = flag => e => {
    if (flag === "edit") {
      e.preventDefault();
      this.props.updateTask(
        this.props.id,
        this.props.tasktitle,
        this.props.status,
        this.state.tasktag
      );
      this.handleToggle();
    } else {
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (state.tasktag.length === 0 && props.dialogState) {
      return {
        tasktag: props.tasktag
      };
    }
    return null;
  }

  render() {
    const tags = this.props.tags;
    return (
      <Fragment>
        <Dialog open={this.props.dialogState} onClose={this.handleToggle}>
          <DialogContent>
            <form onSubmit={this.handleSubmit(this.props.action)}>
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                label={`${this.props.action.toUpperCase()} TASK`} // generalize
                id="title"
                value={this.props.tasktitle}
                onChange={this.handleDialogChange("task")}
              />
              <br />
              <FormControl>
                <InputLabel>Tags</InputLabel>
                <Select
                  id="name"
                  multiple
                  value={this.state.tasktag} // generalise
                  onChange={this.handleDialogChange("tag")}
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
                        checked={
                          this.state.tasktag.findIndex(i => i.id === tag.id) >
                          -1
                        }
                      />
                      <ListItemText primary={tag.attributes.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit(this.props.action)}>
              {this.props.action}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default GeneralDialog;
