import React, { Component } from 'react'
import { Router } from "@reach/router";
import TaskList from "./TaskList/TaskList";

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
                {
                  id: 2,
                  title: 'make out with trash',
                  status: false
                },
                {
                  id: 3,
                  title: 'make trash',
                  status: false
                },
                {
                  id: 4,
                  title: 'take out babe',
                  status: false
                }
              ],
            tags: [
              {
                id: 1,
                name: 'important'
              },
              {
                id: 2,
                name: 'whenever you are free'
              }
            ]
        }
    }
    render() {
        return (
          <Router>
            <TaskList path="/" />
          </Router>
        )
    }
}

export default App
