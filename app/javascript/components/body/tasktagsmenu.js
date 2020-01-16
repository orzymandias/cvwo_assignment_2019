import React, { Component, Fragment } from 'react'
import MenuItem from '@material-ui/core/MenuItem';

export default class TaskTags extends Component {
  render() {
    return (
      
      <Fragment>
        {this.props.tasktags.map(tags => {
                    const {id, attributes} = tags
                          return (<MenuItem key={id} onClick={this.props.handleClose}>{attributes.name}</MenuItem>);
                  }
        )}
      </Fragment>
    );
  }
}
