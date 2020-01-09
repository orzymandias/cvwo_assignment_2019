import React, { Component, Fragment } from 'react'
import Header from './layouts/Header'
import Body from "./body/body"



class App extends Component {
    constructor() {
        super();
        this.state = {
            task: [],
            tags: []
        }

    }

    render() {
        return (
        <Fragment>
            <Header/>
            <Body/>

        </Fragment>
        );  
  }
}

export default App
