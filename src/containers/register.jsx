import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import '../css/faq.css'
import moment from 'moment'

import axios from 'axios'
import DatePicker from 'react-date-picker'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

export default class Login extends Component {

    

    constructor() {
        super();
        this.state = ({
            errorMessage: '',
            date: new Date()
        })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = date => this.setState({ date })

    handleSubmit(event) {

        var nis = this;
        var month = 0;
        const name = findDOMNode(this.refs.name)
        const password1 = findDOMNode(this.refs.password1)
        const password2 = findDOMNode(this.refs.password2)
        const email = findDOMNode(this.refs.email)
        const college = findDOMNode(this.refs.college)

        var dob = '' + this.state.date
        dob = dob.split(" ")
        for( var j in monthNames ) {
            month++;
            if( monthNames[j] == dob[1]) {
                break;
            }
        }
        
        dob = month + "/" + dob[2] + "/" + dob[3];
        dob = moment(dob).format('YYYY-MM-DD');
        
        const creds = { name: name.value.trim(), password1: password1.value.trim(), password2: password2.value.trim(), email: email.value.trim(), college: college.value.trim(), dob: dob }
        
        if(password1.value === password2.value ) {
            axios.post('http://localhost:8000/rest-auth/registration/', creds)
            .then( function (response) {            
                sessionStorage.setItem('userKey', response.data.key);
                console.log(response)
            })
        }
        else {
            console.log("lmao");
        }
    }

    render() {
                
        return (
            <div>
                <Form className="col-md-6 col-md-offset-3 text-center" >

                    <FormGroup controlId="formHorizontalEmail">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl type="email" ref="email" onChange={this.handleChange} placeholder="Email" />
                    </FormGroup>
                    <br />
                    
                    <FormGroup controlId="formHorizontalPassword">
                        <ControlLabel>Password </ControlLabel>
                        <FormControl type="password1" ref="password1" onChange={this.handleChange} placeholder="Password" />
                    </FormGroup>
                    <br />

                    <FormGroup controlId="formHorizontalPassword">
                        <ControlLabel>Confirm Password </ControlLabel>
                        <FormControl type="password2" ref="password2" onChange={this.handleChange} placeholder="Confirm Password" />
                    </FormGroup>
                    <br />

                    <FormGroup controlId="formHorizontalName">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl type="name" ref="name" onChange={this.handleChange} placeholder="Name" />
                    </FormGroup>
                    <br />

                    <FormGroup controlId="formHorizontalCollege">
                        <ControlLabel>College/University Name</ControlLabel>
                        <FormControl type="college" ref="college" onChange={this.handleChange} placeholder="College" />
                    </FormGroup>
                    <br />

                    <FormGroup controlId="formHorizontalDOB">
                        <ControlLabel >DOB</ControlLabel> <br />
                        <DatePicker dateFormat="DD/MM/YYYY" onChange={this.onChange} value={this.state.date} />
                    </FormGroup>
                    <br />
                    
                    <Button onClick={(event) => this.handleSubmit(event)}>Register</Button>

                </Form>
            </div>
        )
    }
}
