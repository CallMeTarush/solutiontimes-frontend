import React from 'react'
import ResponsiveEmbed from 'react-responsive-embed'

import '../css/challenge.css'
import Header from '../components/header'


class App extends React.Component {

    constructor() {
        super();        
    }

    render() {
        return (
        <div>       
            <Header />
            <div className="col-md-8 col-md-offset-2">

                <div className="row">
                    <span className="challenge-category"> Category: Agriculture </span>
                    <span className="challenge-date"> 10/10/12 </span>
                </div>
                
                <ResponsiveEmbed src='https://www.youtube.com/embed/2yqz9zgoC-U' allowfullscreen />
                
                <div className="challenge-title"> This is the title </div>

                <div className="description"> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae ullamcorper arcu, eu ultrices metus. Nam vel dolor ac sapien maximus sodales ac ut nisi. Sed nec malesuada erat, id blandit massa. Pellentesque vitae ipsum tempus, volutpat neque sit amet, placerat lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc id massa tristique, vulputate diam non, consectetur enim. Duis nec vehicula metus.

                    Duis consectetur nisi at turpis aliquet, posuere sollicitudin nisl rutrum. Suspendisse nec massa et mauris vulputate porttitor eget sit amet arcu. Nunc elementum nisi nec lorem scelerisque rhoncus. Nunc in pharetra ipsum. Ut fermentum eget urna eget cursus. Aenean hendrerit, nibh at commodo pharetra, lacus ex porttitor elit, vitae rutrum neque ante nec purus. Nunc quis leo eros. Etiam quis velit ut turpis maximus finibus vel placerat augue. Fusce mattis purus vitae porta lobortis. Aliquam erat volutpat. Curabitur facilisis mauris blandit, pulvinar arcu sed, tincidunt ex. Quisque non tortor eget ligula convallis euismod. Donec posuere iaculis euismod. Nullam eget suscipit tellus.
                </div><br /><br />
                <div className="contestants"> Contestants: 240 </div>
                
        
            </div>

        </div>
        );  
    }
}

export default App;