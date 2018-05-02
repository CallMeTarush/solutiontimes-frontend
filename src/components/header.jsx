import React from 'react';
import '../css/header.css';

import Navigation from '../navigation.js';
import Main from '../main.js';

import { BrowserRouter as Router, Route } from "react-router-dom"
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"
// import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
   render() {
      return (

        <div>
          <div className="left-bar" >
            <Navbar collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand">Logo</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                
                <Nav>
                  <NavItem eventKey={1} href="#">
                    Home
                  </NavItem>
                  <NavItem eventKey={2} href="#">
                    Mentors
                  </NavItem>
                  <NavItem eventKey={3} href="#">
                    FAQ
                  </NavItem>
                  <NavItem eventKey={4} href="#">
                    Contact Us
                  </NavItem>
                </Nav>

                <Nav pullRight>
                  <NavItem eventKey={1} href="#">
                    Login or Sign Up
                  </NavItem>                  
                </Nav>
              </Navbar.Collapse>
            </Navbar>
              {/* <Navigation /> */}

          </div>
          
        </div>
      );
   }
}

export default App;
