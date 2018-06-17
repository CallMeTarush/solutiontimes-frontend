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
        console.log(elHeight)
        this.props.onHeight(elHeight);  
        
        var opacity = {
            opacity: 1
        }

    }
    updateIterator = () => {
        // console.log(this.props.iterator)
        if(this.state.timesSelected%2==0 ) {
            this.props.updateProblemStatement( this.props.iterator)
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
            // var matchHeight = {
            //     height: this.props.height
            // };
        }

        if(this.props.isSelected) {
            var opacity = {
                opacity: 0.5,
            }    
        }

        console.log(this.props.id, this.props.isSelected)

        var title = this.props.title;
        if(title.length > 50) {
            title = this.props.title.substring(0,50);
            title = title.concat('...')
        }
        return (
            <div  >       
                {/* <NavLink 
                to={`/challenge/${this.props.id}`}
                > */}
                <div onClick={() => this.updateIterator() } >
                    <div className="col col-lg-3 col-sm-6 col-xs-6 big-challenge" id={this.props.id} style={opacity} >
                        {/* <div className="category"> Domain: {this.props.domain} </div> */}
                        <div className="challenge" style={matchHeight} >
                            
                            {/* <ResponsiveEmbed src={video_link} allowFullScreen /> */}
                            <div className="img-contianer">
                                <img className="problem-thumbnail" src={this.props.thumbnail} />
                                <div className="bottom-right"> {this.props.duration} </div>
                            </div>
                            <div className="title"> {title} </div>
                            <div className="details">
                             Contestants: {this.props.submissions} <strong>|</strong> {this.props.date} 
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* </NavLink>          */}
            </div>
        );  
    }
}

export default App;