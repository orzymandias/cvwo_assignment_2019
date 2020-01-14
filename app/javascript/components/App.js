import React, { Component, Fragment } from 'react'
import Header from './layouts/Header'
import Body from "./body/body"
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios'


class App extends Component {
  constructor() {
    super();
    this.getTasks = this.getTasks.bind(this)
    this.state = {
      task: [],
      tags: []
    }

  }

  componentDidMount() {
    this.getTasks()
  }

  getTasks() {
    console.log('getting task')
    axios.get('/api/tasks').then(res => {
      this.setState({task: res.data.data })
    })
  }

  render() {

    return (

      <Fragment>
        <Header />
        <Grid container>
          <Grid item sm={3} xs={12}>
            <Paper style={{ padding: 20 }}>
              Sidebar
              </Paper>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Body tasks={this.state.task} getTasks={this.getTasks} />
          </Grid>
        </Grid>
        {/* footer here */}
      </Fragment>
    );

  }

}

export default App
