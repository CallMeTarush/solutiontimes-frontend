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
            contestants: [],
            mentors: [],
            sponsors: [],
            active: [],
            search: '',
            title: '',
            description: '',
            showModal: true,
            solutionShow: false,
            mentorShow: false,
            sponsorShow: false,
            youtube: "https://www.youtube.com/embed/",
            checked: false,
            domain: '',
            time_to_show: '',
            queriedstatements: [],
            current_selected: [],
        }

        this.toggle = this.toggle.bind(this);
        this.getRows = this.getRows.bind(this);
    }

    componentWillMount() {

        axios.get(window.api + `problemstatements/${this.props.params.id}`)
        .then(({ data }) => {


            this.setState({
                title: data.Problemstatement.title,
                description: data.Problemstatement.description,
                problemID: data.Problemstatement.id,
                domain: data.Problemstatement.domain,
                time_to_show: data.Problemstatement.time_to_show,
                contestants: data.Solutions,
                mentors: data.Mentors,
                sponsors: data.Sponsors
            })
            
            var video_id = data.Problemstatement.videolink.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
            }
            
            for(var key in data.Solutions ) {
                this.state.queriedstatements.push(key);
            }
            // this.state.contestants = Object.assign(data.Solutions)
            // this.state.mentors = data.Mentors
            // this.state.sponsors = data.Sponsors
            // this.state.queriedstatements = data.Solutions
            console.log(data.Solutions)
            console.log(this.state.contestants)
            console.log(this.state.queriedstatements)
            this.state.youtube = this.state.youtube.concat(video_id);
            this.forceUpdate();
        });
    }


    handleClick = (e) => {
        // access to e.target here
        console.log(e.target.id)
        // console.log(e.target.id);
        // this.setState({current_selected: e.target.id})
        this.state.current_selected.push(Number(e.target.id))
        console.log(this.state.current_selected)
        this.forceUpdate()
    }
    handleClickRemove = (e) => {
        
        this.state.current_selected.pop(Number(e.target.id))
        console.log(this.state.current_selected)
        this.forceUpdate()
    }

    getRows() {
        

        var data;
        var rows_to_push = [];

        var current_counter = 0;

        if(this.state.optionSelect==0) {
            data = this.state.contestants;

            // rows_to_push.push(
            //     <tr className="challengeHead" >
            //         <td> Name </td>
            //         <td> Email </td>
            //         <td> Category submitted </td>
            //     </tr>
            // )

            for(var j in data) {

                for(var key in this.state.queriedstatements) {
                            
                    if(j == this.state.queriedstatements[key] ) {
                        if( Object.values(this.state.current_selected).indexOf(current_counter) > -1 ) {
                            rows_to_push.push(
                                <tr onClick={((e) => this.handleClickRemove(e))} className="hover-color">
                                    <td colSpan={3}>
                                    {console.log(data[j])}
                                        <table id={current_counter} className='animated hacky-row fadeIn' >
                                            <tr style={{borderBottom: "none"}} >
                                                <td style={{width:"50%"}} >
                                                    Contest ID: {data[j].id}
                                                </td>
                                                <td style={{width:"50%"}}>
                                                    { 
                                                        data[j].is_team ?
                                                        <div>
                                                            Team Name: {data[j].team_name}
                                                        </div>
                                                        :
                                                        <div>
                                                            Name: {data[j].team_name}
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:"50%"}}>
                                                    Category submitted: {data[j].category}
                                                </td>
                                                <td style={{width:"50%"}}>
                                                    Selected: 
                                                    {data[j].selected ?
                                                    <i id={current_counter} class="fa fa-thumbs-up" style={{fontSize:"28px"  }} ></i> :
                                                    <i id={current_counter} class="fa fa-thumbs-down" style={{fontSize:"28px"  }} ></i>
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            )
                        }
                        else {
                            rows_to_push.push(
                                
                                <tr id={j} className="animated fadeIn" >
                                    <td className="contestant-row" > {data[j].team_name} </td>
                                    <td className="contestant-row"> {data[j].college} </td>
                                    {console.log(current_counter)}
                                    <td id={current_counter} onClick={((e) => this.handleClick(e))} className="sponsor-row view"> <span id={current_counter}> View </span></td>
                                </tr>
                                
                            )
                        }
                    }
                }
            }
            if( rows_to_push.length==0 ) {
                rows_to_push.push( 
                    <tr className="mentorHead animated fadeIn" >
                        No Contestants yet!
                    </tr>
                )
            }
        }

        else if(this.state.optionSelect==1) {
            
            data = this.state.sponsors;
            // rows_to_push.push(
            //     <tr className="sponsorHead" >
            //         <td> Name </td>
            //         <td> Email </td>
            //         <td> Challenges Sponsored </td>
            //     </tr>
            // )
            
            for(var j in data) {

                for(var key in this.state.queriedstatements) {
                            
                    if(j == this.state.queriedstatements[key] ) {
                        console.log(current_counter, this.state.current_selected )
                        console.log(current_counter in this.state.current_selected.values)
                        console.log(this.state.current_selected.values)
                        if (Object.values(this.state.current_selected).indexOf(current_counter) > -1) {
                            console.log(current_counter)
                        }

                        if( Object.values(this.state.current_selected).indexOf(current_counter) > -1) {
                            rows_to_push.push(
                                <tr onClick={((e) => this.handleClickRemove(e))} className="hover-color" >                                    
                                        {/* {console.log(data[j])} */}
                                        <td colSpan={3}>
                                        <table id={current_counter} className='animated hacky-row fadeIn'  >
                                            <tr style={{borderBottom: "none"}} >
                                                <td>
                                                    Email: {data[j].email}
                                                </td>
                                                <td>
                                                    { 
                                                        data[j].is_indivisual ?
                                                        <div>
                                                            Sponsor Name: {data[j].organization_name}
                                                        </div>
                                                        :
                                                        <div>
                                                            organization Name: {data[j].organization_name}
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Number of challenges sponsored: {data[j].no_of_sponsors}
                                                </td>
                                                <td>
                                                    Sponsor id: {data[j].id}
                                                </td>
                                            </tr>
                                        </table>
                                        </td>
                                </tr>
                            )
                        }
                        else {
                            
                            rows_to_push.push(
                                <tr className="sponsor-row animated fadeIn">
                                    <td className="sponsor-row"> {data[j].organization_name} </td>
                                    <td className="sponsor-row"> {data[j].email} </td>
                                    {console.log(current_counter)}
                                    <td id={current_counter} onClick={((e) => this.handleClick(e))} className="sponsor-row view"> <i id={current_counter} class="fa fa-plus-circle" style={{fontSize:"28px"  }} ></i> </td>
                                </tr>
                            )
                        }
                        
                        current_counter+=1;
                    }
                }
            }
            if( rows_to_push.length==0 ) {
                rows_to_push.push( 
                    <tr className="mentorHead animated fadeIn" >
                        No Sponsors yet!
                    </tr>
                )
            }
        }

        else {
            data = this.state.mentors;
            // rows_to_push.push(
            //     <tr className="mentorHead" >
            //         <td> Name </td>
            //         <td> Email </td>
            //         <td> Challenges Mentored </td>
            //     </tr>
            // )
            
            for(var j in data) {

                for(var key in this.state.queriedstatements) {
                            
                    if(j == this.state.queriedstatements[key] ) {
                        if( Object.values(this.state.current_selected).indexOf(current_counter) > -1) {
                            rows_to_push.push(
                                <tr onClick={((e) => this.handleClickRemove(e))} className="hover-color" >                                    
                                        {/* {console.log(data[j])} */}
                                        <td colSpan={3}>
                                        <table id={current_counter} className='animated hacky-row fadeIn'  >
                                            <tr style={{borderBottom: "none"}} >
                                                <td>
                                                    Email: {data[j].email}
                                                </td>
                                                <td>
                                                    { 
                                                        data[j].is_indivisual ?
                                                        <div>
                                                            Sponsor Name: {data[j].organization_name}
                                                        </div>
                                                        :
                                                        <div>
                                                            organization Name: {data[j].organization_name}
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Number of challenges sponsored: {data[j].no_of_sponsors}
                                                </td>
                                                <td>
                                                    Sponsor id: {data[j].id}
                                                </td>
                                            </tr>
                                        </table>
                                        </td>
                                </tr>
                            )
                        }
                        else {
                            
                            rows_to_push.push(
                                
                                <tr className="animated fadeIn">
                                    <td className="mentor-row"> {data[j].organization_name} </td>
                                    <td className="mentor-row"> {data[j].email} </td>
                                    <td id={current_counter} onClick={((e) => this.handleClick(e))} className="sponsor-row view"> <i id={current_counter} class="fa fa-plus-circle" style={{fontSize:"28px"  }} ></i> </td>
                                </tr>
                            )
                        }
                        
                    }
                }
            }
            if( rows_to_push.length==0 ) {
                rows_to_push.push( 
                    <tr className="mentorHead animated fadeIn" >
                        No Mentors yet!
                    </tr>
                )
            }
        }

        return rows_to_push;
    }

    toggle(x) {
        
        this.state.current_selected = [];
        // var d = document.getElementById("table-fade");
        // console.log(d)
        // d.classList.remove("animated");
        // d.classList.remove("fadeIn");
        // console.log(d)
        // d.classList.add("animated");
        // d.classList.add("fadeIn");
        // console.log(d)
        while(this.state.queriedstatements.length>0) {
            this.state.queriedstatements.pop()
        }

        if(x == 3) {
            this.props.history.push('/login')
        }
        if( x==0 ) {
            for(var key in this.state.contestants ) {
                this.state.queriedstatements.push(key);
            }
        }
        if( x==1 ) {
            for(var key in this.state.sponsors ) {
                this.state.queriedstatements.push(key);
            }
        }
        if( x==2 ) {
            for(var key in this.state.mentors ) {
                this.state.queriedstatements.push(key);
            }
        }
        this.setState(
            {
                optionSelect: x,
            }
        )
    }
    
    getInfo = () => {

        var search_data;

        if(this.state.optionSelect == 0) {
            search_data = this.state.contestants;            
        }

        else if(this.state.optionSelect == 2) {
            search_data = this.state.mentors;
        }
        
        else {
            search_data = this.state.sponsors;
        }
        if( QUERY_LENGTH < 2 ) {
            
            while(this.state.queriedstatements.length > 0) {
              this.state.queriedstatements.pop();
            }
            
            for( var key in search_data ) {
              this.state.queriedstatements.push(key);
            }
            this.forceUpdate();
        }
      
        else {
      
            while(this.state.queriedstatements.length > 0) {
                this.state.queriedstatements.pop();
            }
            var p = search_data
      
            for( var key in p) {        

                if(this.state.optionSelect == 0) {
                    var title = p[key].team_name;           
                }
                
                else {
                    var title = p[key].organization_name;           
                }

                            
                title = title.toLowerCase();
                if(title.search(this.state.query.toLowerCase() )!=-1) {
        
                    this.state.queriedstatements.push(key);
        
                }
                
            }
      
        }
        console.log(search_data);
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

        let sponsorClass = ['table-ka-head'];
        let contestClass = ['table-ka-head'];
        let mentorClass = ['table-ka-head'];
    
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
                        <div className="row show-mobile text-center">

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
                    
                    
                    <br />                
                </div>
                    <div className="col-md-3">
                        <div className="challenge-people">
                            <span className="people-title">Domain:</span> {this.state.domain} <br />
                            <span className="people-title">Uploaded:</span> {this.state.time_to_show} <br />
                            <span className="people-title">Contestants:</span> {this.state.contestants.length} <br />
                            <span className="people-title">Sponsors:</span> {this.state.sponsors.length} <br />
                            <span className="people-title">Mentors:</span> {this.state.mentors.length} <br />
                        </div>                    
                        <div className="show-not-mobile text-center">
                            { sessionStorage.getItem('isLoggedin') === "1" ? 
                                <div>
                                    { JSON.parse(sessionStorage.getItem('user')).is_participant ? 
                                        
                                        <button className="submit col-md-8 col-md-offset-2 text-center" onClick={() => {this.setState({ solutionShow: !this.state.solutionShow }); }}>Submit a solution</button> :
                                        <div></div>
                                        
                                    }
                                    { JSON.parse(sessionStorage.getItem('user')).is_sponsor ? 
                                        <button className="submit col-md-8 col-md-offset-2 text-center" onClick={() => {this.setState({ sponsorShow: !this.state.sponsorShow }); }}>Sponsor this challenge</button> :
                                        <div></div>
                                    }
                                    { JSON.parse(sessionStorage.getItem('user')).is_mentor ? 
                                        <button className="submit col-md-8 col-md-offset-2 text-center" onClick={() => {this.setState({ mentorShow: !this.state.mentorShow }); }}>Mentor this challemge</button> :
                                        <div></div>
                                    }
                                </div>
                            :
                                <div>
                                    <NavLink to="/login"> <button className="submit col-md-8 col-md-offset-2 text-center" >Submit a solution</button> </NavLink>
                                </div>
                            }
                        </div>
                    </div>
                
            </div>

            <div className="the-info col-md-12" style={{paddingLeft: "5%", paddingRight: "5%"}} >
                <div className="inside-tables">
                    <table>
                        <thead>
                            <th className={contestClass.join(' ')} onClick={() => {this.toggle(0)}} >Contestants</th>
                            <th className={sponsorClass.join(' ')} onClick={() => {this.toggle(1)}} >Sponsors</th>
                            <th className={mentorClass.join(' ')} onClick={() => {this.toggle(2)}} >Mentors</th>
                        </thead>
                    </table>                            
                    <form className="col-xs-12 table-search">                                

                        
                        <input
                        placeholder="Q"
                        ref= {input => this.search = input}
                        onChange={this.handleInputChange}
                        type="text" 
                        className="question glyphicon"
                        id="nme2" required autocomplete="off" 
                        /> 
        
                    </form>
                    <table style={{marginBottom: "20px"}} className="animated fadeIn" id="table-fade" >                               
                        <tbody>
                            {this.getRows()}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={ this.state.solutionShow ? "solution-overlay" : "solution-overlay hidden" }>
                <div className="inner-overlay" >
                    <div className="cross" onClick={() => { this.closeAll() }}> <FaClose /> </div>
                    <div className="overlay-text col-md-12">
                        <h1 className="text-center" > Submit a Solution </h1>

                        <div className="input-group-overlay">
                            Link to solution (Video):
                            <input
                                placeholder="https://www.youtube.com/watch?v=id"
                                type="text" 
                                className="col-md-12 overlay-input"
                                id="overlay-inputs"
                                required autocomplete="off" 
                            />       
                        </div>
                        <div className="input-group-overlay ">
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
                        <div className="input-group-overlay">
                            
                            <input type="checkbox" onChange={this.handleCheck}/>       
                            &nbsp;&nbsp;
                            Are you an indivisual?  
                        </div>                        
                        { this.state.checked ? <div></div> : 
                            <div>
                            <div className="input-group-overlay ">
                                Team name
                                <input
                                    placeholder="Golden State Warriors"
                                    type="text" 
                                    className="col-md-12 overlay-input"
                                    id="overlay-inputs"
                                    required autocomplete="off" 
                                />       
                            </div>
                            <div className="input-group-overlay ">
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

                        <div className="input-group-overlay-1">
                            
                            <input type="checkbox" onChange={this.handleCheck}/>       
                            &nbsp;&nbsp;
                            Are you an indivisual?  
                        </div>                        
                        { this.state.checked ? <div></div> : 
                            
                            <div className="input-group-overlay-1">
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
                    <div className="overlay-text">
                        <h1 className="text-center" > Become a Sponsor </h1>

                        <div className="input-group-overlay-1">
                            
                            <input type="checkbox" onChange={this.handleCheck}/>       
                            &nbsp;&nbsp;
                            Are you an indivisual?  
                        </div>                        
                        { this.state.checked ? <div></div> : 
                            
                            <div className="input-group-overlay-1">
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
            <div className="row col-md-12 footer text-center">
                <p className="text"> &#169;Solution Times Pvt. Ltd. </p>
            </div>
        </div>
        );  
    }
}

export default App;