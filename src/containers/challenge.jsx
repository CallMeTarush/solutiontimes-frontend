import React from 'react'

import '../css/challenge.css'
import Header from '../components/header'
import ResponsiveEmbed from 'react-responsive-embed'

import FaSearch from 'react-icons/lib/fa/search'

class App extends React.Component {

    constructor() {
        super();        
        this.state = {
            optionSelect: 0,
            data: [],
            active: [],
        }

        this.toggle = this.toggle.bind(this);
        this.getRows = this.getRows.bind(this);
    }

    getRows() {
        
        console.log(this.state.optionSelect);
        var data;
        var rows_to_push = [];

        if(this.state.optionSelect==0) {
            data = this.state.data.contestants;
            for(var j in data) {
                
                rows_to_push.push(
                    
                    <tr id={j}>
                        <td className="contestant-row" > {data[j].name} </td>
                        <td className="contestant-row"> {data[j].college} </td>
                        <td className="contestant-row"> {data[j].category} </td>
                        <td className="contestant-row view"> View </td> 
                    </tr>
                    
                )
                
            }
        }

        else if(this.state.optionSelect==1) {
            
            data = this.state.data.sponsors;
            for(var j in data) {
                console.log(data[j]);
                rows_to_push.push(
                    <tr className="sponsor-row">
                        <td className="sponsor-row"> {data[j].name} </td>
                        <td className="sponsor-row"> {data[j].email} </td>
                        <td className="sponsor-row view"> View </td>
                    </tr>
                )
            }
        }

        else {
            data = this.state.data.mentors;
            for(var j in data) {

                rows_to_push.push(
                    <tr>
                        <td className="mentor-row"> {data[j].name} </td>
                        <td className="mentor-row"> {data[j].domain} </td>
                        <td className="mentor-row"> {data[j].mentoring} </td>
                        <td className="mentor-row view"> View </td>
                    </tr>
                )
            }
        }

        return rows_to_push;
    }
    componentDidMount() {
        var data = { 
            contestants: [ {"name": "Tarush", "college": "VIT University", "category": "Legendary", "selected":true },{ "name": "Sidhant", "college": "VIT University", "category": "Advanced", "selected":false },{"name": "John", "college": "SRM University", "category": "General", "selected":true} ],
            mentors: [ {"name": "Mentor 1", "domain": "General", "mentoring": 7}, {"name": "Mentor 2", "domain": "Advanced", "mentoring": 7} ],
            sponsors: [ {"name": "Sponsor 1", "email": "sponsor1@sponsor.com" }, {"name": "Sponsor 2", "email": "sponsor2@sponsor.com" } ]        
        }
        this.setState({data: data});
    }

    toggle(x) {
        this.setState(
            {
                optionSelect: x,
            }
        )
    }

    render() {

        let sponsorClass = [];
        let contestClass = [];
        let mentorClass = [];
    
        if(this.state.optionSelect == 0) {
            contestClass.push("selected-category");
        }
        else if(this.state.optionSelect == 1) {
            sponsorClass.push("selected-category");
        }
        else {
            mentorClass.push("selected-category");
        }

        return (
        <div>       
            <Header />
            <div className="col-md-12 challenge-content">
                <div className="col-md-9 video-container">
                    <div className="challenge-video">
                        <ResponsiveEmbed src='https://www.youtube.com/embed/2yqz9zgoC-U' allowFullScreen />

                        <h1 className="title-challenge">Title</h1>
                        <div className="details-challenge"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus tincidunt diam, sed bibendum elit faucibus vitae. Vestibulum iaculis faucibus efficitur. Quisque egestas gravida faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum varius arcu sed nulla tempor feugiat. Integer at erat mi. Fusce feugiat felis a convallis ultrices. Donec sem neque, viverra sed porttitor quis, consectetur non massa. Ut bibendum ligula nibh. Curabitur in velit sed ipsum hendrerit hendrerit at id sem. Aliquam lacinia imperdiet tincidunt. Sed facilisis sollicitudin cursus. Donec vel porttitor leo. Ut auctor turpis eu venenatis ornare. Fusce a justo faucibus, congue velit id, tempor lacus.

Curabitur congue sapien lorem, facilisis molestie quam commodo quis. Nunc velit nisl, blandit quis massa ac, rutrum ultrices sapien. Integer rutrum nec ligula cursus egestas. Sed ultrices arcu non porttitor pellentesque. Aenean nibh tellus, blandit sed urna non, suscipit scelerisque urna. Phasellus fringilla risus a massa venenatis ultrices. Nam nec ligula at augue volutpat elementum at sit amet nisi. Quisque velit leo, maximus non justo eu, cursus rutrum orci. Nullam ut odio non massa mattis pulvinar tristique at ipsum. Nullam tincidunt nulla ac facilisis accumsan. Maecenas odio justo, eleifend et pretium eu, feugiat a velit.

                        </div>

                        <div className="row text-center">
                            <button className="submit">Submit a solution</button>
                        </div>
                    </div>
                    
                    <div className="challenge-video row batch-16">
                        <table>
                            <thead>
                                <th className={contestClass.join(' ')} onClick={() => {this.toggle(0)}} >Contestants</th>
                                <th className={sponsorClass.join(' ')} onClick={() => {this.toggle(1)}} >Sponsors</th>
                                <th className={mentorClass.join(' ')} onClick={() => {this.toggle(2)}} >Mentors</th>
                            </thead>
                        </table>
                            
                            <form className="search-bar col-xs-12 table-search">
                                
                                <input
                                placeholder="Search..."
                                ref= {input => this.search = input}
                                onChange={this.handleInputChange}
                                type="text" 
                                className="question"
                                id="nme" required autocomplete="off" 
                                />          
                            </form>
                        <table>                               
                            <tbody>
                                {this.getRows()}
                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
                <div className="col-md-3">
                    <div className="challenge-people">
                        Challenge details
                    </div>                    
                </div>
            </div>

        </div>
        );  
    }
}

export default App;