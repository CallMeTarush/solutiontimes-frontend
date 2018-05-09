import React from 'react';
import '../css/home.css';
import '../css/input.css';

import axios from 'axios';
import ProblemStatement from '../components/problemstatement'
import Header from '../components/header'

import { DropdownButton,MenuItem } from 'react-bootstrap'

import FaSearch from 'react-icons/lib/fa/search'
import FaAngleDown from 'react-icons/lib/fa/angle-down'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


var QUERY_LENGTH;

class App extends React.Component {
  
  
  state = {
    problemstatements: [],
    query: '',
    queriedstatements: [],
    selected: { value: 'two', label: 'Two'},
    showMenu: false,
    selectValue: 'all',
    addClass: '1'
  }
  
  
  constructor() {
    super();

    
    // axios.post('http://127.0.0.1:3000/challenges/createChallenges', {
    
    //   name: 'Challenge 1',
    //   domain: 'Social',
    //   link: 'PPQ0par6DK4'

    // })    
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);

  }
  


  getInfo = () => {

    var p = this.state.problemstatements;
    
    if( QUERY_LENGTH == 0 ) {
      
      for( var key in p ) {
        this.state.queriedstatements.push(key);
      }
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
  
  initLoad = () => {

    console.log("Im here");
    
    this.setState({
      selectValue: "Select a domain"
    });

    var queriedstatements = [];
    this.state.queriedstatements = queriedstatements;

    console.log(this.state.problemstatements);

    for(var key in this.state.problemstatements) {
      
      this.state.queriedstatements.push(key);

    }
    console.log(this.state.queriedstatements);
    this.loadProblemStatements();
    this.forceUpdate();
  }

  handleInputChange = () => {
    
    QUERY_LENGTH = this.search.value.length;

    this.setState({
      query: this.search.value
    }, () => {              
      this.getInfo()        
    })


  }

  loadProblemStatements() {

    var p = this.state.problemstatements;
    var probs = [];
    
    for (var prop in p) {
      
      for(var key in this.state.queriedstatements) {
        
        console.log(key,prop);
        if(prop == this.state.queriedstatements[key]) {
          console.log("added statement");
          probs.push( <ProblemStatement
              title={p[prop].title} 
              description={p[prop].description} 
              youtube = {p[prop].video_id}
              domain = {p[prop].domain}
              submissions = {p[prop].submissions}
              date = {p[prop].time_to_show}
              /> 
          );
    
        }
      }   
    }

    return probs;

  }

  toggle(j) {
    
    this.setState({addClass: j});
    if(j==1) {
      this.initLoad();
    }
  }

  handleChange(e){
    
    this.state.queriedstatements = [];
    this.setState({ selectValue:e.target.value });
    console.log(this.state.problemstatements);
    var p = this.state.problemstatements;
    for(var key in p) {
      
      console.log(p[key].domain);
      console.log(e.target.value);
      console.log(p[key]);

      if(p[key].domain == e.target.value) {
        this.state.queriedstatements.push(key);
      }

    }

  }

  componentWillMount() {
    
    var data_problemstatements;
    
    axios.get('http://127.0.0.1:8000/problemstatements')
      .then(({ data }) => {
        console.log(data);
        // this.state.problemstatements = data;
        this.setState( 
          {
            problemstatements: data
          }
        );
        console.log(this.state.problemstatements);
        this.initLoad();
    });

  }

  render() {   
    console.log(this.state.selectValue);
    let challengeClass = ["choice choice-block col-xs-6 col-sm-2"];
    let domainClass = ["choice choice-select col-xs-6 col-sm-2"];

    if(this.state.addClass == "2") {
      domainClass.push("selected");
    }
    else {
      challengeClass.push("selected");
      
    }

    console.log(this.state.addClass);

    return (      
      <div>
        <Header />  
        <div className="sorter row col-xs-12">
            <span className={challengeClass.join(' ')} onClick={() => {this.toggle(1)}} >Challenges</span>          
            <span className={domainClass.join(' ')} onClick={() => {this.toggle(2)}} > 
              <select id="select"         
                value={this.state.selectValue} 
                onChange={this.handleChange} 
              > 
                <option> All Challenges</option>
                <option> Agriculture </option>
                <option> Social </option>
                <option> Domain 4 </option>
                <option> Domain 4 </option>
              </select>
            </span>          
          </div>          
        <div className="container-div">          

          <div className="the-bar">
            <form className="search-bar col-sm-5 col-xs-10">
              <input
                placeholder="Search"
                ref= {input => this.search = input}
                onChange={this.handleInputChange}
                type="text" 
                className="question"
                id="nme" required autoComplete="off" 
              />          
            </form>
            <div className="search-icon col-sm-1 col-xs-2 text-center">
              <div className="actual-search">
                <FaSearch />
              </div>
            </div>
          </div>
          <div className="problemstatements col-md-12">
            { console.log("called") }
             { this.loadProblemStatements() }
          </div>          

        </div>
      </div>
    );
  }    
}

export default App;
 

 