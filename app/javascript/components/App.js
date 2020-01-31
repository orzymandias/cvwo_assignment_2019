import React, { Component, Fragment } from 'react';
import Header from './layouts/Header';
import Body from "./body/body";
import Sidebar from './sidebar/sidebar';
import { Grid } from '@material-ui/core';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.getTasks = this.getTasks.bind(this)
    this.getTags = this.getTags.bind(this)
    this.getTagTask = this.getTagTask.bind(this)
    this.state = {
      task: [],
      tag: []
    }
  }

  componentDidMount() {
    this.getTasks()
    this.getTags()
  }

  getTasks() {
    axios.get('/api/tasks').then(res => {
      this.setState({task: res.data.data.reverse() })
    })
  }

  getTags() {
    axios.get('/api/tags').then(res => {
      this.setState({tag: res.data.data })
    })
  }

  getTagTask = (id) =>  {
    axios.get(`/api/tags/${id}/tasks`)
    .then(res => {
    if (res.status === 200) {
        this.setState({task: res.data.data.reverse()})
        }
    })
  }
  


  render() {

    return (

      <Fragment>
        <Header />
        <Grid container>
          <Grid item sm={3} xs={12}>
            <div id='sidebar' style={{ padding: 20 }}>
              <Sidebar
                tags={this.state.tag} 
                getTags={this.getTags}
                getTagTask={this.getTagTask}
                getTasks={this.getTasks}
              />
            </div>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Body 
              tasks={this.state.task}
              tags={this.state.tag} 
              getTasks={this.getTasks} 
              getTags={this.getTags}
              />
          </Grid>
        </Grid>
        {/* footer here */}
      </Fragment>
    );

  }

}

export default App
