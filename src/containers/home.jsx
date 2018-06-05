import React from 'react';
import '../css/home.css';
import '../css/input.css';

import axios from 'axios';
import ProblemStatement from '../components/problemstatement'
import Header from '../components/header'
import getLoggedIn from '../components/variables.js'

import { DropdownButton,MenuItem } from 'react-bootstrap'
import { PulseLoader } from 'react-spinners'
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
    addClass: '1',
    height: -69,
    loading: true,
    user: [],
    searching: false
  }
  
  
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  getInfo = () => {

    var p = this.state.problemstatements;
    console.log(QUERY_LENGTH)
    if( QUERY_LENGTH < 2 ) {
      
      while(this.state.queriedstatements.length > 0) {
        this.state.queriedstatements.pop();
      }

      for( var key in p ) {
        this.state.queriedstatements.push(key);
      }
      this.forceUpdate();
    }

    else {

      while(this.state.queriedstatements.length > 0) {
        this.state.queriedstatements.pop();
      }

      
      for( var key in p) {
        
        var title = p[key].title;
        title = title.toLowerCase();
        if(title.search(this.state.query.toLowerCase() )!=-1) {
        
          this.state.queriedstatements.push(key);

        }
        console.log(this.state.queriedstatements);
      }
      this.forceUpdate();
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
      query: this.search.value,
      searching: true
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
              id = {p[prop].id}
              onHeight = {this.handleHeight}
              height = {this.state.height}
              /> 
          );
    
        }
      }   
    }
    
    this.state.loading = false;   
    


    return probs;

  }

  handleHeight = (height) => {

    var nis = this;
    if(height > nis.state.height) {
      nis.state.height = height ;
      nis.forceUpdate();
    }
    
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
    if( sessionStorage.getItem('isLoggedin') === "1" ) {
      var nis = this;

      var User = JSON.parse (sessionStorage.getItem('user'));

      nis.setState({
        user: User
      })
    }
    this.updateDimensions();
    
    axios.get(window.api + 'problemstatements')
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
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  
  updateDimensions() {

    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.state.height = -69;
        this.forceUpdate();
        
        // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
  }

  getName = () => {
    console.log(sessionStorage.getItem('userKey'))

    if( sessionStorage.getItem('isLoggedin') === "1" ) 
      return( <h1> Hi, {this.state.user.name}! </h1>)
    else
      return(null)
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
        <Header {...this.props} />  
        <div className="sorter col-md-12">
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
          <div className="col-md-12">
            {this.getName() }
          </div>
          <div className="the-bar col-md-12 row">


            <form className="search-bar col-sm-6">
              <input
                placeholder="Search"
                ref= {input => this.search = input}
                onChange={this.handleInputChange}
                type="text" 
                className="question"
                id="nme" required autoComplete="off" 
              />          
              <i className="glyphicon glyphicon-search form-control-feedback"></i>

              
            </form>
          </div>
          { true ? 
            <div className="col-md-12 row text-center top-m " > 
              <div className="search-adv">
                Sort by &nbsp;&nbsp;
                <select >
                  <option>
                    Relevant
                  </option>
                </select>
              </div>
              <br className="br-mob" />
              <div className="search-adv">
                Duration&nbsp;&nbsp;
                <select>
                  <option>
                    Any
                  </option>
                  <option>
                    Short
                  </option>
                  <option>
                    Medium
                  </option>
                  <option>
                    Long
                  </option>
                </select>
              </div>
              <br className="br-mob" />
              <div className="search-adv">
                Uploaded &nbsp;&nbsp;
                <select>
                  <option>
                    All time
                  </option>
                  <option>
                    Today
                  </option>
                  <option>
                    Last week
                  </option>
                  <option>
                    Last month
                  </option>
                  <option>
                    Last year
                  </option>
                  <option>
                    Older
                  </option>
                </select>
              </div>
              <br className="br-mob" />
            </div>
            :
            <div></div>
          }

          <div className="problemstatements col-md-12">

            
            { this.state.loading ? (
            <center className="loader" >  
              <PulseLoader
                  color={'#01426a'} 
                  loading={this.state.loading} 
                  size={25}
                />
            </center>
            )
            :
            (
              this.loadProblemStatements()
            )
          }
          </div>          

        </div>
      </div>
    );
  }    
}

export default App;
 

 