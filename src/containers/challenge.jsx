import React from 'react'

import '../css/challenge.css'
import Header from '../components/header'
import ResponsiveEmbed from 'react-responsive-embed'

class App extends React.Component {

    constructor() {
        super();        
    }

    getMentors() {
        
    }

    render() {
        return (
        <div>       
            <Header />
            <div className="col-md-12 challenge-content">
                <div className="col-md-9 video-container">
                    <div className="challenge-video">
                        <ResponsiveEmbed src='https://www.youtube.com/embed/2yqz9zgoC-U' allowFullScreen />

                        <h1>Title</h1>
                        <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus tincidunt diam, sed bibendum elit faucibus vitae. Vestibulum iaculis faucibus efficitur. Quisque egestas gravida faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum varius arcu sed nulla tempor feugiat. Integer at erat mi. Fusce feugiat felis a convallis ultrices. Donec sem neque, viverra sed porttitor quis, consectetur non massa. Ut bibendum ligula nibh. Curabitur in velit sed ipsum hendrerit hendrerit at id sem. Aliquam lacinia imperdiet tincidunt. Sed facilisis sollicitudin cursus. Donec vel porttitor leo. Ut auctor turpis eu venenatis ornare. Fusce a justo faucibus, congue velit id, tempor lacus.

Curabitur congue sapien lorem, facilisis molestie quam commodo quis. Nunc velit nisl, blandit quis massa ac, rutrum ultrices sapien. Integer rutrum nec ligula cursus egestas. Sed ultrices arcu non porttitor pellentesque. Aenean nibh tellus, blandit sed urna non, suscipit scelerisque urna. Phasellus fringilla risus a massa venenatis ultrices. Nam nec ligula at augue volutpat elementum at sit amet nisi. Quisque velit leo, maximus non justo eu, cursus rutrum orci. Nullam ut odio non massa mattis pulvinar tristique at ipsum. Nullam tincidunt nulla ac facilisis accumsan. Maecenas odio justo, eleifend et pretium eu, feugiat a velit.

                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="challenge-people">
                        <div>
                            <b> Mentors </b>
                            <hr />
                        </div>

                        <div className="mentors">
                            { this.getMentors() }
                        </div>
                        
                    </div>
                    <div className="challenge-people">
                        Contestant Walla
                    </div>
                    <div className="challenge-people">
                        Contestant Walla
                    </div>  
                </div>
            </div>

        </div>
        );  
    }
}

export default App;