import React from 'react'

import '../css/faq.css'
import { NavLink } from 'react-router-dom';

import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'

import classNames from 'classnames'
import {Animated} from "react-animated-css";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            youtube: "https://www.youtube.com/embed/",
            active: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.state.active = !this.state.active;
        console.log(this.state.active)
        this.forceUpdate()
    }

    render() {
        
        console.log(this.props)
        
        var answerClass = classNames(
            'faq-answer',
            {'no-display': !this.state.active}
        );
        console.log(this.state.active)
        var containerClass = classNames(
            {'white': this.state.active},
            'faq-specifc-container', 
            'col-md-8',
            'col-md-offset-2'
        );

        var questionClass = classNames(
            {'border': !this.state.active},
            'faq-question',
            'row'
        )
        return (
        <div>       
            <div className={containerClass} onClick={() => {this.toggle()}} >
                <div className={questionClass}>
                    
                    <p className='left-text'>
                        {this.props.question} 
                    </p>
                    <p className="right-text">
                        { this.state.active ? ( <FaAngleUp /> ) : ( <FaAngleDown /> ) }
                    </p>

                    <div className="clear" ></div>

                </div>

                <Animated className={answerClass} animationIn="fadeIn" animationOut="slideInOut" isVisible={this.state.active}>
                    <div>
                        {this.props.answer}
                    </div>
                </Animated>
            </div>
        </div>
        );  
    }
}

export default App;