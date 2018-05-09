import React from 'react'

import '../css/faq.css'
import Header from '../components/header'
import Faq from '../components/faq'
import axios from 'axios'


class App extends React.Component {

    constructor() {
        super();        

        this.state = ({
            faqs: []
        })       
    }

    componentWillMount() {
        
        axios.get('http://139.59.13.187:8000/faqs')
            .then(({ data }) => {
                console.log(data);
                // this.state.problemstatements = data;
                this.setState( 
                {
                    faqs: data
                }
                
            );
        });
    }

    getFaqs() {
        var to_render = [];
        for(var k in this.state.faqs) {
            to_render.push( <Faq 
                question = {this.state.faqs[k].question}
                answer = {this.state.faqs[k].answer}
                />
            );
        }

        return to_render
    }

    render() {
        return (
        <div>        
            <Header />
            <div className="faq-container"> 
                <div className="faq-title col-md-12 text-center">
                    Frequently asked questions
                </div>
                <div className="faqs">
                    {this.getFaqs()}
                </div>
                
            </div>
        </div>
        );  
    }
}

export default App;