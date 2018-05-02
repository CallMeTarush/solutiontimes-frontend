import React from 'react'
import YoutubeEmbedVideo from 'youtube-embed-video'
import ResponsiveEmbed from 'react-responsive-embed'
import Button from 'react-overlays'
import Modal from 'react-overlays'

import '../css/problemstatement.css'
import { NavLink } from 'react-router-dom';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    render() {
        return (
        <div>       
            <NavLink to='/challenge'>
                <div className="col col-lg-3 col-sm-6 col-xs-12 big-challenge">
                    <div className="challenge">
                        
                        <div className="category"> Category: Agriculture </div>
                        <ResponsiveEmbed src='https://www.youtube.com/embed/2yqz9zgoC-U' allowfullscreen />
                        <div className="title"> {this.props.title} </div>
                        <div className="contestants"> Contestants: 240 </div>
                        <div className="date"> 10/10/12 </div>

                    </div>
                </div>
            </NavLink>         
        </div>
        );  
    }
}

export default App;