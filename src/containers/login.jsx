import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, div, Form, FormControl, FormGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import plane from '../img/Plane.png'
import Header from '../components/header'
import FaClose from 'react-icons/lib/fa/close'
import axios from 'axios'
import '../css/login.css'

export default class Login extends Component {

    constructor() {
        super();
        this.state = ({
            errorMessage: '',
            loginHeight: 0
        })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        var nis = this;
        console.log(event);
        const email = findDOMNode(this.refs.email)
        const password = findDOMNode(this.refs.password)
        const creds = { email: email.value, password: password.value}
        console.log(creds);

        axios.post( window.api + 'rest-auth/login/', creds)
        .then( function (response) {
            
            sessionStorage.setItem('userKey', response.data.key);

            if(response.status == 200) {
                var user;

                sessionStorage.setItem('isLoggedin', "1" )
                
                axios.get(window.api + 'rest-auth/user/', { headers: { "Authorization": "Token " + sessionStorage.getItem('userKey') } } )
                    .then((data) => {
                        
                        user = data.data;
                        sessionStorage.setItem('user', JSON.stringify(user));
                        nis.props.history.push('/');
                    }
                );
            
            }

        })

        nis.state.errorMessage = "Invalid username and password" ;
        nis.forceUpdate();
    }
    componentDidMount() {
        const loginHeight = document.getElementById('form-login').clientHeight;
        this.setState({loginHeight})
    }
    render() {
        
        if(sessionStorage.getItem('isLoggedin') == "1" ) {
            window.location.href="/"
        }
        let loginformClass = ["col-md-4 login-form-container "];
        // var formHeight = document.getElementById("form-login").offsetHeight;
        console.log("formheight" + this.state.loginHeight)
        const setHeight = {
            marginTop: `calc( 50vh - 40px - ${this.state.loginHeight/2}px )`
        }
        return (
            <div>
                <Header />
            <div className="login-container " >
                <div className="bg-bottom"></div>
                <div class="login-image col-md-4">
                    <img src={plane} alt={"plane"}/> 
                </div>
                <div className={loginformClass.join(' ')} style={setHeight} >
                <Form className="login-form col-md-12" id="form-login" >

                    <div className="theloginform" >

                        <div className="login text-center">
                            LOGIN 
                        </div>
                        
                        <FormGroup controlId="formHorizontalUsername">                        
                            <div className="control-label" id="first" > Username or email address </div>
                            <FormControl type="email" ref="email" className="login-input col-md-12" onChange={this.handleChange} />
                        </FormGroup>
                        &nbsp;&nbsp;
                        
                        <FormGroup controlId="formHorizontalPassword">
                            <div className="control-label">Password </div>
                            <FormControl type="password" ref="password" className="login-input col-md-12" onChange={this.handleChange} />
                        </FormGroup>
                        &nbsp;&nbsp;

                        <div className="forgot-password text-center" >
                            <a href="/forgotpassword" >Forgot your password?</a>
                        </div>

                        <Button className="signin col-xs-12" onClick={(e) => this.handleSubmit(e)} > SIGN IN  </Button>
                        
                        <div className="signup col-md-12 text-center">
                            Don't have an account? <NavLink to="/register"> Sign up</NavLink>
                        </div>
                    </div>
                </Form>
                </div>
            </div>
        </div>
        )
    }
}
