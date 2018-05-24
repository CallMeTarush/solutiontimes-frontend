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
            errorMessages: [],
            date: new Date(),
            is_participant: true,
            is_mentor: false,
            is_sponsor: false,
            is_end_user: false
        })
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onChange = date => this.setState({ date })

    toggle(x) {
        switch(x) {
            case 0:
                this.setState({ is_participant: true })
                break;
            case 1:
                this.setState({ is_mentor: true })
                break;
            case 2:
                this.setState({ is_sponsor: true })
                break;
            case 3:
                this.setState({ is_end_user: true })
                break;
        }
    }

    componentWillUnmount() {

    }

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
        
        const creds = { 
            name: name.value.trim(),
            password1: password1.value.trim(),
            password2: password2.value.trim(),
            email: email.value.trim(),
            college: college.value.trim(),
            date_of_birth: dob ,
            is_participant: this.state.is_participant,
            is_mentor: this.state.is_mentor,
            is_sponsor: this.state.is_sponsor,
            is_end_user: this.state.is_end_user
        }
        
        if(password1.value === password2.value ) {
            axios.post( window.api + 'rest-auth/registration/', creds)
            .then( function (response) {            
                if(response.status == 201) {
                    alert("Success")
                    window.location.href="/login"
                }
            })
        }
        else {
            alert("Match password fields")
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
                    {/* { this.state.errorMessage[0] } */}
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
                        <ControlLabel >Date Of Birth</ControlLabel> <br />
                        <DatePicker dateFormat="DD/MM/YYYY" onChange={this.onChange} value={this.state.date} />
                    </FormGroup>
                    
                    <ControlLabel >Do you want to register as..?</ControlLabel>
                    <br />
                    <table>
                        <thead>
                            <th className="custom-head" className="custom-head" >
                                Contestant
                            </th>
                            <th className="custom-head">
                                Mentor
                            </th>
                            <th className="custom-head">
                                Sponsor
                            </th>
                            <th className="custom-head">
                                End-user()
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" checked={this.state.is_participant} onChange={() => {this.toggle(0)}}/>
                                </td>
                                <td>
                                    <input type="checkbox" checked={this.state.is_mentor} onChange={() => {this.toggle(1)}}/>
                                </td>
                                <td>
                                    <input type="checkbox" checked={this.state.is_sponsor} onChange={() => {this.toggle(2)}}/>
                                </td>
                                <td>
                                    <input type="checkbox" checked={this.state.is_end_user} onChange={() => {this.toggle(3)}}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>     
                    <br />
                    <Button onClick={(event) => this.handleSubmit(event)}>Register</Button>
                    <br />
                    <br />
                </Form>
            </div>
        )
    }
}
