import React, { Component, Fragment } from "react";
import Header from "./layouts/Header";
import Body from "./body/body";
import Sidebar from "./sidebar/sidebar";
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import axios from "axios";
import Image from '../../../public/img/background-unsplash.jpg'
import { dark } from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
      typography: {
        fontFamily: 'Helvetica'
      },
      palette: {
        primary: {
          main: fade('#f5f5f5', 0.3)
        },
        seconday: {
          main: 'eeeeee'
        },
        background: {
          paper: fade('#f5f5f5', 0.3)
        },
        text: {
          secondary: "rgba(255, 255, 255, 1)",
        }
      },
    });

    const styles = {
      appContainer: {
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        height: "100vh"
      }
    }
    
class App extends Component {
  constructor() {
    super();
    this.getTasks = this.getTasks.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getTagTask = this.getTagTask.bind(this);
    this.state = {
      task: [],
      tag: []
    };
  }

  componentDidMount() {
    this.getTasks();
    this.getTags();
  }

  getTasks() {
    axios.get("/api/tasks").then(res => {
      this.setState({ task: res.data.data.reverse() });
    });
  }

  getTags() {
    axios.get("/api/tags").then(res => {
      this.setState({ tag: res.data.data });
    });
  }

  getTagTask = id => {
    axios.get(`/api/tags/${id}/tasks`).then(res => {
      if (res.status === 200) {
        this.setState({ task: res.data.data.reverse() });
      }
    }).catch(err => alert(err));
  };


  render() {
      return (< div id='app-container' style = { styles.appContainer } >
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <Header />
          <Grid container >
            <Grid item sm={3} xs={12}>
              <Sidebar
                tags={this.state.tag}
                getTags={this.getTags}
                getTagTask={this.getTagTask}
                getTasks={this.getTasks}
              />
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
        </ThemeProvider>
        </div >
      );
  }
}

export default App;
