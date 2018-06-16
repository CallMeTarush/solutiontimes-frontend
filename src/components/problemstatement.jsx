import React from 'react'
import YoutubeEmbedVideo from 'youtube-embed-video'
import ResponsiveEmbed from 'react-responsive-embed'
import Button from 'react-overlays'
import Modal from 'react-overlays'
import classNames from 'classnames'

import '../css/problemstatement.css'
import { NavLink } from 'react-router-dom';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            youtube: "https://www.youtube.com/embed/",
            timesSelected: 0,
        };
    }

    componentDidMount() {
        let elHeight = document.getElementById(this.props.id).clientHeight;
        this.props.onHeight(elHeight);            

    }
    updateIterator = () => {
        // console.log(this.props.iterator)
        if(this.state.timesSelected%2==0 ) {
            this.props.updateProblemStatement( this.props.iterator )
        }
        else {
            this.props.updateProblemStatement( 0 )
        }
        this.state.timesSelected+=1;
    }
    render() {
        
        var video_link = this.state.youtube.concat(this.props.youtube);
        
        // console.log(video_link);
        // console.log(this.props.height);
        
        var matchHeight = {
            color: 'black'
        }

        if(this.props.height != -69) {            
            var matchHeight = {
                height: this.props.height
            };
        }
       
        return (
            <div>       
                {/* <NavLink 
                to={`/challenge/${this.props.id}`}
                > */}
                <div onClick={() => this.updateIterator() } >
                    <div className="col col-lg-3 col-sm-6 col-xs-6 big-challenge" >
                        {/* <div className="category"> Domain: {this.props.domain} </div> */}
                        <div className="challenge" style={matchHeight} id={this.props.id}>
                            
                            <ResponsiveEmbed src={video_link} allowFullScreen />
                            <div className="title"> {this.props.title} </div>
                            
                        </div>
                        <div className="details">
                            <span className="contestants"> Contestants: {this.props.submissions} </span>
                            <span className="date"> {this.props.date} </span>
                        </div>
                    </div>
                </div>
                {/* </NavLink>          */}
            </div>
        );  
    }
}

export default App;