import React from 'react'

import '../css/challenge.css'
import Header from '../components/header'
import ResponsiveEmbed from 'react-responsive-embed'

import FaSearch from 'react-icons/lib/fa/search'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import FaClose from 'react-icons/lib/fa/close'
import api from '../api'

var QUERY_LENGTH;

class App extends React.Component {

    constructor() {
        super();        
        this.state = {
            problemID: '',
            optionSelect: 0,
            contestants: {},
            mentors: {},
            sponsors: {},
            active: [],
            search: '',
            title: '',
            description: '',
            showModal: true,
            solutionShow: false,
            mentorShow: false,
            sponsorShow: false,
            youtube: "https://www.youtube.com/embed/",
            checked: false
        }

        this.toggle = this.toggle.bind(this);
        this.getRows = this.getRows.bind(this);
    }

    componentWillMount() {
        console.log( window.api );

        axios.get(window.api + `problemstatements/${this.props.params.id}`)
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
                title: data.Problemstatement.title,
                description: data.Problemstatement.description,
                problemID: data.Problemstatement.id
            })
            var video_id = data.Problemstatement.videolink.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
            }
            
            this.state.contestants = data.Solutions
            this.state.mentors = data.Mentors
            this.state.sponsors = data.Sponsors
            

            this.state.youtube = this.state.youtube.concat(video_id);
            this.forceUpdate();
        });
    }

    getRows() {
        
        var data;
        var rows_to_push = [];

        if(this.state.optionSelect==0) {
            data = this.state.contestants;
            for(var j in data) {
                
                rows_to_push.push(
                    
                    <tr id={j}>
                        <td className="contestant-row" > {data[j].team_name} </td>
                        <td className="contestant-row"> {data[j].college} </td>
                        <td className="contestant-row"> {data[j].category} </td>
                        <td className="contestant-row view"> View </td> 
                    </tr>
                    
                )
                
            }
        }

        else if(this.state.optionSelect==1) {
            
            data = this.state.sponsors;

            for(var j in data) {
                rows_to_push.push(
                    <tr className="sponsor-row">
                        <td className="sponsor-row"> {data[j].organization_name} </td>
                        <td className="sponsor-row"> {data[j].email} </td>
                        <td className="sponsor-row view"> View </td>
                    </tr>
                )
            }
        }

        else {
            data = this.state.mentors;
            for(var j in data) {

                rows_to_push.push(
                    <tr>
                        <td className="mentor-row"> {data[j].organization_name} </td>
                        <td className="mentor-row"> {data[j].email} </td>
                        <td className="mentor-row view"> View </td>
                    </tr>
                )
            }
        }

        return rows_to_push;
    }

    toggle(x) {
        console.log(x)
        if(x == 3) {
            this.props.history.push('/login')
        }
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
    submitSolution = () => {
        
        this.state.solutionShow = false
        this.state.mentorShow = false
        this.state.sponsorShow = false

        var solution_inputs = document.getElementsByClassName('overlay-input');
        
        var video = solution_inputs[0].value;
        var category = solution_inputs[1].value;
        
        var email =  JSON.parse(sessionStorage.getItem('user')).email 
        
        if( !this.state.checked) {
            var team_name = solution_inputs[2].value;
            var team_size = solution_inputs[3].value;
            var is_team = true;
        }
        else {
            var team_name = null;
            var team_size = 0;
            var is_team = false;
        }

        var post_data = {
            'user_email': email, 
            'category': category, 
            'is_team': is_team, 
            'team_name': team_name, 
            'team_size': team_size, 
            'video_solution': video
        }
        this.state.checked = false
        var nis = this
        axios.post(window.api + 'problemstatements/' + this.state.problemID + '/solution/', post_data)
        .then( function (response) {
            if(response.status==201) {
                nis.setState({ solutionShow: false })
                alert("Successful")
            }

            else {
                alert("Failed")
            }
            
        })

        window.location.reload()

    }
    submitNotSolution = () => {
        
        
        var nis = this;
        var inputs = document.getElementsByClassName('overlay-input-1');
        var email =  JSON.parse(sessionStorage.getItem('user')).email 

        var poster,input;
        if(this.state.sponsorShow) {
            input = inputs[1];
            poster = "sponsor"
        }
        else {
            input = inputs[0];
            poster = "mentor"
        }
        if(!input) {
            input = "blank"
        }
        var post_data = {
            'user_email': email,
            'is_indivisual' : this.state.checked,
            'organization_name' : input
        }
        console.log(post_data)
        axios.post(window.api + 'problemstatements/' + this.state.problemID + '/' + poster + '/', post_data)
        .then( function (response) {
            if(response.status==201) {
                nis.setState({ 
                    solutionShow: false,
                    mentorShow: false
                })
                alert("Successful")
            }
            else {
                alert("Failed")
            }
        })
        this.state.solutionShow = false
        this.state.mentorShow = false
        this.state.sponsorShow = false
        this.state.checked = false

        window.location.reload()
    }
    handleCheck = () => {
        this.setState({checked: !this.state.checked});
    }
    closeAll = () => {
        this.setState({
            mentorShow: false,
            sponsorShow: false,
            solutionShow: false
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

                            { sessionStorage.getItem('isLoggedin') === "1" ? 
                                <div>
                                    { JSON.parse(sessionStorage.getItem('user')).is_participant ? 
                                        <button className="submit text-center" onClick={() => {this.setState({ solutionShow: !this.state.solutionShow }); }}>Submit a solution</button> :
                                        <div></div>
                                    }
                                    { JSON.parse(sessionStorage.getItem('user')).is_sponsor ? 
                                        <button className="submit text-center" onClick={() => {this.setState({ sponsorShow: !this.state.sponsorShow }); }}>Sponsor this challenge</button> :
                                        <div></div>
                                    }
                                    { JSON.parse(sessionStorage.getItem('user')).is_mentor ? 
                                        <button className="submit text-center" onClick={() => {this.setState({ mentorShow: !this.state.mentorShow }); }}>Mentor this challemge</button> :
                                        <div></div>
                                    }
                                </div>
                            :
                                <div>
                                    <NavLink to="/login"> <button className="submit text-center" >Submit a solution</button> </NavLink>
                                </div>
                            }
                        </div>
                    </div>
                    
                    <div className="challenge-video the-info row batch-16">
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
            <div className={ this.state.solutionShow ? "solution-overlay" : "solution-overlay hidden" }>
                <div className="inner-overlay" >
                    <div className="cross" onClick={() => { this.closeAll() }}> <FaClose /> </div>
                    <div className="overlay-text col-md-12">
                        <h1 className="text-center" > Submit a Solution! </h1>

                        <div className="input-group-overlay col-md-8 col-md-offset-2">
                            Link to solution (Video):
                            <input
                                placeholder="https://www.youtube.com/watch?v=id"
                                type="text" 
                                className="col-md-12 overlay-input"
                                id="overlay-inputs"
                                required autocomplete="off" 
                            />       
                        </div>
                        <div className="input-group-overlay col-md-8 col-md-offset-2">
                            Category solution is being submitted in:<br />
                            <select className="overlay-input" >
                                <option>
                                    General
                                </option>
                                <option>
                                    Advanced
                                </option>
                                <option>
                                    Legendary
                                </option>
                            </select>
                        </div>
                        <div className="input-group-overlay col-md-8 col-md-offset-2">
                            
                            <input type="checkbox" onChange={this.handleCheck}/>       
                            &nbsp;&nbsp;
                            Are you an indivisual?  
                        </div>                        
                        { this.state.checked ? <div></div> : 
                            <div>
                            <div className="input-group-overlay col-md-8 col-md-offset-2">
                                Team name
                                <input
                                    placeholder="Golden State Warriors"
                                    type="text" 
                                    className="col-md-12 overlay-input"
                                    id="overlay-inputs"
                                    required autocomplete="off" 
                                />       
                            </div>
                            <div className="input-group-overlay col-md-8 col-md-offset-2">
                                Team size
                                <input
                                    placeholder="6"
                                    type="text" 
                                    className="col-md-12 overlay-input"
                                    id="overlay-inputs"
                                    required autocomplete="off" 
                                />       
                            </div>
                            </div>
                        }
                    </div>
                    <div className="row col-md-12 text-center">
                        <button className="submit-sol" onClick={() => { this.submitSolution() }}>Submit</button>
                    </div>
                </div>
            </div>
            <div className={ this.state.mentorShow ? "solution-overlay" : "solution-overlay hidden" }>
                <div className="inner-overlay">
                <div className="cross" onClick={() => { this.closeAll() }}> <FaClose /> </div>
                    <div className="overlay-text col-md-12">
                        <h1 className="text-center" > Be a Mentor! </h1>

                        
                        
                        <div className="input-group-overlay-1 col-md-8 col-md-offset-2">
                            
                            <input type="checkbox" onChange={this.handleCheck}/>       
                            &nbsp;&nbsp;
                            Are you an indivisual?  
                        </div>                        
                        { this.state.checked ? <div></div> : 
                            
                            <div className="input-group-overlay-1 col-md-8 col-md-offset-2">
                                Organization name
                                <input
                                    placeholder="Golden State Warriors"
                                    type="text" 
                                    className="col-md-12 overlay-input-1"
                                    id="overlay-inputs"
                                    required autocomplete="off" 
                                />       
                            </div>
                            
                            
                        }
                    </div>
                    <div className="row col-md-12 text-center">
                        <button className="submit-sol" onClick={() => { this.submitNotSolution() }}>Submit</button>
                    </div>
                </div>
            </div>
            <div className={ this.state.sponsorShow ? "solution-overlay" : "solution-overlay hidden" }>
                <div className="inner-overlay">
                <div className="cross" onClick={() => { this.closeAll() }}> <FaClose /> </div>
                    <div className="overlay-text col-md-12">
                        <h1 className="text-center" > Become a Sponsor!! </h1>

                        <div className="input-group-overlay-1 col-md-8 col-md-offset-2">
                            
                            <input type="checkbox" onChange={this.handleCheck}/>       
                            &nbsp;&nbsp;
                            Are you an indivisual?  
                        </div>                        
                        { this.state.checked ? <div></div> : 
                            
                            <div className="input-group-overlay-1 col-md-8 col-md-offset-2">
                                Organization name
                                <input
                                    placeholder="Golden State Warriors"
                                    type="text" 
                                    className="col-md-12 overlay-input-1"
                                    id="overlay-inputs"
                                    required autocomplete="off" 
                                />       
                            
                            </div>
                        }
                    </div>
                    <div className="row col-md-12 text-center">
                        <button className="submit-sol" onClick={() => { this.submitNotSolution() }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        );  
    }
}

export default App;