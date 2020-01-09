import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core';


export default props =>
  <AppBar position='static'>
    <Toolbar>
      <Typography variant="h6" className="classes.title">
        Todo Manager
      </Typography>
    </Toolbar>
  </AppBar>