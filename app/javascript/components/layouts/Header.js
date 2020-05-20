import React, {useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Dialog, DialogTitle} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const AboutDialog = ({ open, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={open}  style={{ textAlign: "left"}}>
      <DialogTitle>Welcome to the Task Manager</DialogTitle>
      <div id="about-content" style={{paddingLeft: 10, paddingRight:10}}>
      <h2>Features</h2>
      <ul style={{listStyleType: "none"}}>
        <li>Create Tasks</li>
        <li>Tag your tasks</li>
        <li>Complete Task: checking box</li>
        <li>Search by Tags: Search for Tasks by their Tags</li>
      </ul>
      <p>The task manager is built by <a href="https://github.com/orzymandias">Isaac</a></p>
 
      </div>
   </Dialog>

  )
}

const Header = (props) => {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };
  const useStyles = makeStyles(() => ({
    title: {
      flexGrow: 1,
      color: "white"
    },
    about: {
      color: "white"
    }
  }));

  const classes = useStyles()

  return (<AppBar position='static' style={{ margin: 0 }}>
    <Toolbar>
      <Typography variant="h6" className="classes.title" className={classes.title}>
        Task Manager
      </Typography>
      <Button className={classes.about} onClick={handleClickOpen}>About</Button>
      <AboutDialog open={open} handleClose={handleClose} />
    </Toolbar>
  </AppBar>)
}

export default Header; ``