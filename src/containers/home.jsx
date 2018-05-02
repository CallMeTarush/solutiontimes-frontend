import React from 'react';
import '../css/home.css';
import '../css/input.css';

import axios from 'axios';
import ProblemStatement from '../components/problemstatement'
import Header from '../components/header'

import FaSearch from 'react-icons/lib/fa/search'


class App extends React.Component {
  
  
  state = {
    problemstatements: [],
    query: '',
    queriedstatements: [],
  }
  constructor() {
    super();
    this.initLoad();
  }
  
  getInfo = () => {

    var p = this.state.problemstatements.problemstatements;

    if(this.state.query.length == 0 ) {
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

    // axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
    //   .then(({ data }) => {
    //     this.setState({
    //       results: data.data
    //     })
    //   })
  }
  
  initLoad = () => {

    console.log("Im here");
    var problemstatements = { "problemstatements": [ {"title":"This is a title","description":"lmao","videolink":"lmao"}, {"title":"This one is a title too","description":"lmao","videolink":"lmao"}  ]};
    
    this.state.problemstatements = problemstatements;
    
    for(var key in this.state.problemstatements.problemstatements) {
      
      this.state.queriedstatements.push(key);

    }
    
    this.loadProblemStatements();
  }

  handleInputChange = () => {
    
    this.setState({
      query: this.search.value
    }, () => {
        if(this.search.value.length > 1 ) {
          this.getInfo()
        }
    })


  }

  loadProblemStatements() {

    var p = this.state.problemstatements.problemstatements;
    var probs = [];
    
    

    for (var prop in p) {
      
      for(var key in this.state.queriedstatements) {

        if(prop == this.state.queriedstatements[key]) {

          probs.push( <ProblemStatement
              title={p[prop].title} 
              description={p[prop].description} 
              youtube = {p[prop].videolink}
              /> 
          );
    
        }
      }   
    }
    return probs;

  }

  render() {   
    


    return (
      
      <div>
        <Header />  

        <div className="container-div">
          <form className="search-bar col-md-12">

            <input
              placeholder="Search"
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              type="text" 
              className="question col-md-6"
              id="nme" required autocomplete="off" 
            />          
          </form>

          <div className="problemstatements col-md-12">
            { this.loadProblemStatements() }
          </div>
        </div>
      </div>
    );
  }
    
}

export default App;
 

 