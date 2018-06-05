import React from 'react';
import '../css/header.css';

import axios from 'axios'
import Navigation from '../navigation.js';
import Main from '../main.js';
import {getLoggedIn} from './variables'

import { NavLink, Redirect } from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"
// import 'bootstrap/dist/css/bootstrap.css';


import api from '../api'

class App extends React.Component {

    constructor() {
      super();
      this.state = {
        user: [],
        redirect: false
      };

      this.getName = this.getName.bind(this)
    }
    getName() {
      console.log(sessionStorage.getItem('userKey'))
      
      if( sessionStorage.getItem('isLoggedin') === "1" ) 
        return(this.state.user.name)
      else
        return(undefined)
    }
    componentWillMount() {

      if( sessionStorage.getItem('isLoggedin') === "1" ) {
        var User = JSON.parse (sessionStorage.getItem('user'));

        this.setState({
          user: User
        })
      }
    }

    handleSelect = (selectedKey) => {
      console.log(selectedKey)
    }

    handleLogout = () => {
      var nis = this;
      axios.get(window.api + 'rest-auth/logout/')
      .then(({ data }) => {
          
          console.log("lol")
          if(data.detail == "Successfully logged out." ) {
            
            sessionStorage.setItem('isLoggedin', "0")
            sessionStorage.setItem('userKey', undefined)
            sessionStorage.setItem('user', undefined)
            
            nis.setState({ redirect: true })

          }
        } 
      );
    }

    render() {
      if(this.state.redirect)  {
        window.location.href = "/";
      }
      else {

      
      return (

        <div>
          <div>
            <Navbar collapseOnSelect>
            
              <Navbar.Collapse activeKey="1" onSelect={k => this.handleSelect(k)} >
                
                <Nav>
                  <NavItem eventKey="1" href="#">
                    <NavLink to='/'>
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem eventKey="2" href="#">
                    <NavLink to='/student2society'>
                      Student2Society
                    </NavLink>
                  </NavItem>
                  <NavItem eventKey="3" href="#">
                    <NavLink to='/faq'>
                      FAQ
                    </NavLink>
                  </NavItem>
                  <NavItem eventKey="4" href="#">
                    <NavLink to='/contact'>
                      Contact Us
                    </NavLink>
                  </NavItem>
                </Nav>

                  {console.log(sessionStorage.getItem('userKey')) }
                    {sessionStorage.getItem('userKey') == "undefined" || !sessionStorage.getItem('userKey') ? (
                    <Nav pullRight>
                      <NavItem eventKey="7"  >
                        <NavLink to='/login'>
                          <div>
                            <span className="login-button">
                              Login
                            </span>
                          </div>
                        </NavLink>
                      </NavItem>                                      
                    </Nav>    
                  ) : (
                    <Nav pullRight>
                      <NavItem eventKey="5" onClick={() => {this.handleLogout()}} >
                        Logout
                      </NavItem>
                    </Nav>    
                    
                  )}
                
              </Navbar.Collapse>
            </Navbar>
              {/* <Navigation /> */}

          </div>
          
        </div>
      );
    }
   }
}

export default App;
