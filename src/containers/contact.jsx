import React from 'react'
import ResponsiveEmbed from 'react-responsive-embed'

import '../css/contact.css'
import Header from '../components/header'


class App extends React.Component {

    constructor() {
        super();        
    }

    render() {
        return (
        <div>        
            <Header />
            
            <div className="col-md-12">
                <div className="container-contact">
                    <div className="col-md-6 left-contact">
                        <div className="row">
                            <div className="col-md-6">
                                <h3> FOR GENERAL QUERIES </h3>
                                <h4> info@thesolutiontimes.com </h4>
                            </div>
                            <div className="col-md-6">
                                <h3> FOR GENERAL QUERIES </h3>
                                <h4> info@thesolutiontimes.com </h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h3> FOR GENERAL QUERIES </h3>
                                <h4> info@thesolutiontimes.com </h4>
                            </div>
                            <div className="col-md-6">
                                <h3> FOR GENERAL QUERIES </h3>
                                <h4> info@thesolutiontimes.com </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-container col-md-10 col-md-offset-1">

                             <h1>Leave us a message </h1>
    
                            <form>
                            <div class="form-group">
                            
                                <div class="col-md-12 inputGroupContainer">
                                    <div class="input-group col-md-12">
                                        <input name="regno" id="regno" placeholder="Your name" class="form-control" type="text" />
                                    </div>
                                    <div class="input-group col-md-12">
                                        <input name="regno" id="regno" placeholder="Email address" class="form-control" type="text" />
                                    </div>
                                    <div class="input-group col-md-12">
                                        <input name="regno" id="regno" placeholder="Phone Number" class="form-control" type="text" />
                                    </div>
                                    <div class="input-group col-md-12">
                                        <input name="regno" id="regno" placeholder="Your message" class="form-control" type="text" />
                                    </div>
                                    <div class="input-group col-md-12">
                                        <center><input type="submit" class="send" value="SEND"/></center>
                                    </div>
                                </div>
                            </div>
    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );  
    }
}

export default App;