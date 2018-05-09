import React, { Component } from 'react';
import './App.css';

import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import Main from './main'

const api_line = 'http://139.59.13.187:8000/';

class App extends Component {


  render() {
    return (
      <div>
        <Main />        
      </div>

    );
  }
}

export default App;
