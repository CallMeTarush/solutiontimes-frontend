import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, div, Form, FormControl, FormGroup } from 'react-bootstrap';

import axios from 'axios'
import '../css/login.css'

export default class Login extends Component {

    constructor() {
        super();
        this.state = ({
            errorMessage: ''
        })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        var nis = this;

        const username = findDOMNode(this.refs.username)
        const password = findDOMNode(this.refs.password)
        const creds = { username: username.value.trim(), password: password.value.trim()}
        console.log(creds);

        // axios.post('http://127.0.0.1:8000/rest-auth/login/', creds)
        // .then( function (response) {
            
        //     sessionStorage.setItem('userKey', response.data.key);

        //     if(response.status == 200) {
        //         nis.props.history.push('/') 
        //     }

        // })

        nis.state.errorMessage = "Invalid username and password" ;
        nis.forceUpdate();
    }

    render() {
        
        
        return (
            <div className="login-container col-md-12" >
                <div className="bg-bottom"></div>
                <Form className="col-md-4 col-md-offset-4 text-center login-form" >

                    <div className="theloginform">

                        <div className="login">
                            LOGIN 
                        </div>
                        
                        <FormGroup controlId="formHorizontalUsername">                        
                            <div className="control-label" id="first" > Username </div>
                            <FormControl type="username" ref="username" className="login-input col-md-12" onChange={this.handleChange} />
                        </FormGroup>
                        &nbsp;&nbsp;
                        
                        <FormGroup controlId="formHorizontalPassword">
                            <div className="control-label">Password </div>
                            <FormControl type="password" ref="password" className="login-input col-md-12" onChange={this.handleChange} />
                        </FormGroup>
                        &nbsp;&nbsp;

                        <div className="forgot-password row" >
                            <a href="/forgotpassword" >Forgot your password?</a>
                        </div>

                        <Button className="signin col-md-12" > SIGN IN  </Button>
                        
                        <div className="signup col-md-12 text-center">
                            Don't have an account? <a href="/signup">Sign up</a>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
