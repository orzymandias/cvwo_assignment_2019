import React, { Component } from 'react'
import Body from "./body/body";
import {AppBar, Toolbar, Typography,makeStyles} from '@material-ui/core';



class App extends Component {
    constructor() {
        super();
        this.state = {
            task: [],
            tags: []
        }

    }

    useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
      },
    }));

    render() {
        return (
          <div className='classes.root' >
            <AppBar>
              <Toolbar>
                <Typography variant="h6" className='classes.title'>
                  Todo Manager
                </Typography>                
              </Toolbar>
            </AppBar>
            <Body/>
          </div>
        )
    }
}

export default App
