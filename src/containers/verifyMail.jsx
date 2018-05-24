import React from 'react'
import ResponsiveEmbed from 'react-responsive-embed'

import axios from 'axios'
import { PulseLoader } from 'react-spinners'
import { browserHistory } from 'react-router';

import '../css/home.css'

class App extends React.Component {

    constructor() {
        super();      
        this.state = ({
            loading: true
        })  
    }

    componentDidMount() {
        
        var nis = this;
        var key = this.props.match.params.id;

        axios.post(window.api + 'rest-auth/registration/verify-email/', {
            key: key
        })
        .then( function (response) {
            console.log(nis);
            if(response.status == 200) {
                nis.props.history.push('/') 
            }
        })
    }

    render() {
        return (
            <div>
                <div className="absolute-center" >   
                    <h1> Oh, Hi! </h1>
                    <center>
                        <PulseLoader
                            color={'#F7BF1E'} 
                            loading={this.state.loading} 
                        />
                    </center>
                </div>
            </div>
        );  
    }
}

export default App;