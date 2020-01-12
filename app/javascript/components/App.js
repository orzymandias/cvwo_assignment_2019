import React, { Component, Fragment } from 'react'
import Header from './layouts/Header'
import Body from "./body/body"
import {Grid, Paper} from '@material-ui/core';




class App extends Component {
    constructor() {
        super();
        this.state = {
            task: [
              {
                id: 1,
                title: 'take out trash',
                status: false
              },
            ],
            tags: []
        }

    }

    render() {
        return(
        <Fragment>
          <Header/>
          <Grid container>
            <Grid item sm={3} xs={12}>
              <Paper style={{padding:20}}>
                Sidebar
              </Paper>
            </Grid>
            <Grid item sm={9} xs={12}>
              <Body tasks={this.state.task}/>
            </Grid>
          </Grid>
          {/* footer here */}
        </Fragment>
        );
    }
}

export default App
