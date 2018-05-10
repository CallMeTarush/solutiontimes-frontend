import React from 'react'

import '../css/challenge.css'
import Header from '../components/header'
import ResponsiveEmbed from 'react-responsive-embed'

import FaSearch from 'react-icons/lib/fa/search'
import axios from 'axios'

var QUERY_LENGTH;

class App extends React.Component {

    constructor() {
        super();        
        this.state = {
            optionSelect: 0,
            data: [],
            active: [],
            search: '',
            title: '',
            description: '',
            youtube: "https://www.youtube.com/embed/"
        }

        this.toggle = this.toggle.bind(this);
        this.getRows = this.getRows.bind(this);
    }

    componentWillMount() {
        axios.get(`http://139.59.13.187:8000/problemstatements/${this.props.params.id}`)
        .then(({ data }) => {
            console.log(data);
            // this.state.problemstatements = data;
            // this.setState( 
            // {
            //     problemstatements: data
            // }
            // );
            // console.log(this.state.problemstatements);
            // this.initLoad();
            this.setState({
                title: data.title,
                description: data.description
            })
            this.state.youtube = this.state.youtube.concat(data.video_id);
            this.forceUpdate();
        });
    }

    getRows() {
        
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
    
    getInfo = () => {

        var search_data,p;

        console.log(this.state.optionSelect);
        console.log(this.search.value);        

        if(this.state.optionSelect == 0) {
            search_data = this.state.data.contestants;
            this.state.data.contestants = search_data;
        }

        else if(this.state.optionSelect == 2) {
            search_data = this.state.data.mentors;
            this.state.data.mentors = search_data;
        }
        
        else {
            search_data = this.state.data.sponsors;
            this.state.data.sponsors = search_data;
        }

        console.log(this.state.data);

        if( QUERY_LENGTH == 0 ) {      
            // for( var key in search_data ) {
            //   this.state.queriedstatements.push(key);
            // }
        }
      
        else {
      
            while(this.state.queriedstatements.length > 0) {
                this.state.queriedstatements.pop();
            }
      
            for( var key in p) {
              
                var title = p[key].title;
      
                if(title.search(this.state.query)!=-1) {              
                    this.state.queriedstatements.push(key);      
                }

                console.log(this.state.queriedstatements);
            }
        }
    }

    handleInputChange = () => {
        
        QUERY_LENGTH = this.search.value.length;
    
        this.setState({
          query: this.search.value
        }, () => {              
          this.getInfo()        
        })

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
                        <ResponsiveEmbed src={this.state.youtube} allowFullScreen />

                        <h1 className="title-challenge">{this.state.title}</h1>
                        <div className="details-challenge">{this.state.description}



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
                                placeholder="Search"
                                ref= {input => this.search = input}
                                onChange={this.handleInputChange}
                                type="text" 
                                className="question"
                                id="nme2" required autocomplete="off" 
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