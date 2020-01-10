import React, { Component, Fragment } from 'react'
import Header from './layouts/Header'
import Body from "./body/body"
import {Grid, Paper} from '@material-ui/core';




class App extends Component {
    constructor() {
        super();
        this.state = {
            task: [],
            tags: []
        }

    }

    render() {
        return(
        <Fragment>
          <Header/>
          <Grid container>
            <Grid item sm='3' xs='3'>
              <Paper style={{padding:20}}>
                Sidebar
              </Paper>
            </Grid>
            <Grid item sm='9' xs='9'>
              <Body/>
            </Grid>
          </Grid>
          {/* footer here */}
        </Fragment>
        );
    }
}

export default App
