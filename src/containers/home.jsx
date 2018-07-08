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
import ResponsiveEmbed from 'react-responsive-embed'
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { goToAnchor,goToTop } from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'
import ScrollableAnchor from 'react-scrollable-anchor'

import la from '../img/la.jpg'
import ca from '../img/chicago.jpg'
import ny from '../img/ny.jpg'

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
    searching: false,
    selectValueDuration: 'Any',
    selectValueTime: 'All time',
    selectValueSort: 'all',
    selectedProp: -1,
    timesCalled: 0,
    screenWidth: -1,
    lastItem: -1,
    videoLinks: [],
  }
  
  
  constructor() {
    super();

    configureAnchors({offset: -10, scrollDuration: 400})

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
      
      this.state.searching = false;

      while(this.state.queriedstatements.length > 0) {
        this.state.queriedstatements.pop();
      }

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
        
        title = title.toLowerCase();
        if(title.search(this.state.query.toLowerCase() )!=-1) {

          this.state.queriedstatements.push(key);

        }
        console.log(this.state.queriedstatements);
      }

    }

    this.handleTime();
    this.handleDuration();
    this.forceUpdate();
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
    var iterator = 0;
    if( this.state.screenWidth > 799 ) {
      var actualSelected = Math.ceil(this.state.selectedProp/4.0) * 4;
    }
    else {
      var actualSelected = Math.ceil(this.state.selectedProp/2.0) * 2;
    }
    this.state.videoLinks = [];

    if(actualSelected > this.state.lastItem ) {
      actualSelected = this.state.lastItem;
    }

    var isSelected = false;

    console.log(actualSelected);
    for (var prop in p) {
      
      for(var key in this.state.queriedstatements) {
        
        if(prop == this.state.queriedstatements[key]) {

          iterator+=1;
          console.log(this.state.selectedProp)
          if( iterator == this.state.selectedProp ) {
            console.log(iterator, this.state.selectedProp)
            isSelected = true;
          }
          else {
            isSelected = false;
          }
          this.state.videoLinks = this.state.videoLinks.concat( p[prop].video_id )


            if( iterator != actualSelected ) {
              probs.push( 
                
                <div>
                  <ProblemStatement
                    iterator={iterator}
                    title={p[prop].title} 
                    description={p[prop].description} 
                    youtube = {p[prop].video_id}
                    domain = {p[prop].domain}
                    submissions = {p[prop].submissions}
                    date = {p[prop].time_to_show}
                    id = {p[prop].id}
                    onHeight = {this.handleHeight}
                    height = {this.state.height}
                    updateProblemStatement = {this.updateProblemStatement}
                    thumbnail = { p[prop].thumbnail }
                    isSelected = { isSelected }
                    duration = {p[prop].duration}
                    views = {p[prop].views}
                    /> 
                </div>
              );              
            }
            else {
              var description = this.state.problemstatements[this.state.selectedProp - 1 ].description;
              if( description.length > 400 ) {
                description = p[prop].description.substring(0,400);
                description = description.concat('...')
              }
              // console.log(description)
              var video_link = "https://www.youtube.com/embed/".concat( this.state.videoLinks[this.state.selectedProp - 1] );
              video_link = video_link.concat("?autoplay=1");
              // console.log( this.state.problemstatements[this.state.selectedProp - 1 ] );
              var likes = Number(this.state.problemstatements[this.state.selectedProp - 1 ].likes_number);
              var dislikes = Number( this.state.problemstatements[this.state.selectedProp - 1 ].dislikes_number);
              var widthPercent = (likes)/(dislikes + likes);
              
              widthPercent = widthPercent*100;

              probs.push( 
                
                <div >
                  <ProblemStatement
                    title={p[prop].title} 
                    description={p[prop].description} 
                    youtube = {p[prop].video_id}
                    domain = {p[prop].domain}
                    submissions = {p[prop].submissions}
                    date = {p[prop].time_to_show}
                    id = {p[prop].id}
                    onHeight = {this.handleHeight}
                    height = {this.state.height}
                    updateProblemStatement = {this.updateProblemStatement}
                    thumbnail = { p[prop].thumbnail }
                    isSelected = { isSelected }
                    duration = {p[prop].duration}
                    views = {p[prop].views}

                  />
                  {/* <div className="col-md-12"> */}
                    {/* PLEASE WHAT */}
                    {/* <ResponsiveEmbed src={video_link} allowFullScreen /> */}
                  {/* </div> */}
                  <div className="for-margin">
                    <ScrollableAnchor id={'theVideo'}>

                      <div className="big-video col-xs-12" >
                        <ResponsiveEmbed src={video_link} allowFullScreen autoplay />
                        <div className="row padding-for-row" >
                          <h3> {this.state.problemstatements[this.state.selectedProp - 1 ].title} </h3>

                          <div className="likes col-md-4 text-right" style={{fontSize: "18px"}} >
                            {this.state.problemstatements[this.state.selectedProp - 1 ].views} views


                            <div className="col-md-12 like-container" style={{height:"0.25em", background:"black" }} >
                              <div style={{ width: widthPercent + "%", background: "#3981EA", height: "100%" }}></div>
                            </div>

                            <i class="fa fa-thumbs-up" style={{float:"left", fontSize:"14px", marginTop: "5px"  }} >{likes}</i>
                            <i class="fa fa-thumbs-down" style={{float:"right", fontSize:"14px", marginTop: "5px"  }} > {dislikes} </i>
                          </div>


                          </div>
                        <h4> Published: { this.state.problemstatements[this.state.selectedProp - 1 ].time_to_show } </h4>
                        
                        <div className="in-home-desc"> { description }</div>
                        <p className="text-center more-details"> <NavLink to={`/challenge/${ p[prop].id }`} > More Details... </NavLink> </p>
                      </div>
                    </ScrollableAnchor>
                  </div>
                </div>
              );
            }
            
          }
      }   
    }
    // console.log(this.state.videoLinks);
    this.state.lastItem = iterator;
    this.state.loading = false;   

    return probs;

    
  }

  // var reply_click = function()
  // {    <option value="" disabled selected>Select your option</option>

  //     alert("Button clicked, id "+this.id+", text"+this.innerHTML);
  // }
  updateProblemStatement = (prop) => {
    console.log(prop);
    this.setState({ selectedProp: prop })
    var nis = this
    setTimeout(function(){ nis.scrollToVideo(); }, 200);
    
  }

  handleHeight = (height) => {

    var nis = this;
    if(height > nis.state.height) {
      nis.state.height = height ;
      nis.forceUpdate();    <option value="" disabled selected>Select your option</option>

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

  handleChangeSort = (e) => {
    
    // this.state.queriedstatements = [];
    console.log(e.target.value)
    this.setState({ selectValueSort:e.target.value });


    console.log(this.state.selectValueSort)
    switch(e.target.value) {
      case 'Latest':
        console.log("lmao");
        this.sortLatest();
        break;
      case 'Liked':
        this.sortLiked();
        break;
      case 'Title':
        this.sortTitle();
        break;
      case 'Views':
        this.sortViews();
        break;
      
    }

    // for(var key in p) {
      
    //   console.log(p[key].domain);
    //   console.log(e.target.value);
    //   console.log(p[key]);


    //   if(p[key].domain == e.target.value) {
    //     this.state.queriedstatements.push(key);
    //   }

    // }

  }

  sortLatest = () => {
  
    function compare(a,b) {
  
      console.log(a.title,b.title)
  
      if (a.title < b.title)
        return 1;
      if (a.title > b.title)
        return -1;
      return 0;
    }
    
    console.log(this.state.problemstatements.sort(compare));
  
  }
  sortLiked = () => {
    
    function compare(a,b) {
      console.log(a)
      console.log(Number(a.likes_number),Number(b.likes_number))
  
      if (Number(a.likes_number) < Number(b.likes_number))
        return -1;
      if (Number(a.likes_number) > Number(b.likes_number))
        return 1;
      return 0;
    }
    console.log(this.state.problemstatements.sort(compare));
  }
  sortTitle = () => {

    function compare(a,b) {
  
      console.log(a.title,b.title)
  
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      return 0;
    }
    
    console.log(this.state.problemstatements.sort(compare));
  
    
  }
  sortViews = () => {
    
    function compare(a,b) {
  
      console.log(a.views_number,b.views_number)
  
      if (a.views_number < b.views_number)
        return 1;
      if (a.views_number > b.views_number)
        return -1;
      return 0;
    }
    
    console.log(this.state.problemstatements.sort(compare));
  
  }
  

  handleChangeDuration = (e) => {
    this.state.selectValueDuration = e.target.value ;
    this.getInfo();
  }
  handleDuration = () => {
    var time = this.state.selectValueDuration
    var p = this.state.problemstatements;
    var probs = [];

    for (var prop in p) {
      
      for(var key in this.state.queriedstatements) {

        if(prop == this.state.queriedstatements[key]) {
          
          switch(time) {
            case 'Short':
              if( p[prop].is_short ) { probs.push(prop); }
              break;
            case 'Medium':
              if( p[prop].is_medium ) { probs.push(prop); }
              break;
            case 'Long':
              if( p[prop].is_long ) { probs.push(prop); }
              break;
            default:
              probs.push(prop);
          }
        }
      }   
    }
    
    while(this.state.queriedstatements.length > 0) {
      this.state.queriedstatements.pop();
    }
    this.state.queriedstatements= probs ;
  }
  handleChangeTime = (e) => {
    this.state.selectValueTime = e.target.value;
    this.getInfo();
  }
  handleTime = () => {
    
    var time = this.state.selectValueTime
    var p = this.state.problemstatements;
    var probs = [];

    for (var prop in p) {
      
      for(var key in this.state.queriedstatements) {

        if(prop == this.state.queriedstatements[key]) {
          
          switch(time) {
            case 'Today':
              if( p[prop].is_today ) { probs.push(prop); }
              break;
            case 'Last week':
              if( p[prop].is_week ) { probs.push(prop); }
              break;
            case 'Last month':
              if( p[prop].is_month ) { probs.push(prop); }
              break;
            case 'Last year':
              if( p[prop].is_year ) { probs.push(prop); }
              break;
            case 'Older':
              if( p[prop].is_older ) { probs.push(prop); }
              break;
            default:
              probs.push(prop);
          }
        }
      }   
    }
    
    while(this.state.queriedstatements.length > 0) {
      this.state.queriedstatements.pop();
    }
    this.state.queriedstatements= probs ;
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
        this.state.screenWidth = width;
        this.forceUpdate();
  }

  getName = () => {
    console.log(sessionStorage.getItem('userKey'))

    if( sessionStorage.getItem('isLoggedin') === "1" ) 
      return( <h1 className="name" > Hi, {this.state.user.name}! </h1>)
    else
      return(null)
  }
  scrollToVideo() {

    console.log("hello?")
    // const Video = ReactDOM.findDOMNode(this.refs.theVideo)
    // window.scrollTo(0, Video.offsetTop);
    // scrollToComponent(this.refs.theVideo)
    // scroller.scrollTo('theVideo', {
    //   duration: 800,
    //   delay: 0,
    //   smooth: 'easeInOutQuart'
    // });
    // console.log("?")
    // goToTop()
    goToAnchor('theVideo')

  }

  expand() {
    console.log("lol")
    // var tags = document.getElementsByClassName("selectTag")
    // for(var i in tags) {
    //   tags[i].size = 4;
    // }
  }
  unexpand() {
    console.log("sdadsa")
  }

  render() {   
    console.log(this.state.selectValue);
    let challengeClass = ["choice choice-block col-xs-6 col-sm-2"];
    let domainClass = ["choice choice-block col-xs-6 col-sm-2"];

    if(this.state.addClass == "2") {
      domainClass.push("selected");
    }
    else {
      challengeClass.push("selected");
      
    }

    console.log(this.state.addClass);

    return (      
      <div className="home-container" >
        <Header {...this.props} />  
        <div className="sorter col-md-12">
            <span className={challengeClass.join(' ')} onClick={() => {this.toggle(1)}} 
              onMouseOver={() => {this.expand()}}
              onMouseOut={()=>{this.unexpand()}}
              >

              <select id="select" 
                className="selectTag"          
                value={this.state.selectValueSort} 
                onChange={this.handleChangeSort} 
                
              > 
                <option value="all" hidden disabled selected> Challenges </option>
                <option> Latest </option>
                <option> Liked </option>
                <option> Title </option>
                <option> Views </option>
              </select>
            </span>          
            <span className={domainClass.join(' ')} onClick={() => {this.toggle(2)}} > 
              <select id="select"         
                value={this.state.selectValue} 
                onChange={this.handleChange} 
              > 
                <option value="All Challenges" hidden selected> Domains </option>
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
          <div className="jumbotron" >
            <h1>Student to Society</h1>      
            <p>Plan to put the banner here!</p>
          </div>
          {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="item active">
                <img src={la} alt="Los Angeles" />
              </div>
              <div className="item">
                <img src={ca} alt="Chicago" />
              </div>
              <div className="item">
                <img src={ny} alt="New York" />
              </div>
            </div>
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
              <span className="sr-only">Next</span>
            </a>
          </div> */}
          <div className="the-bar">
            <form className="search-bar col-sm-6" onSubmit="return false" action="javascript:void(-1)" >
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
          { this.state.searching ? 
            <div className="col-md-12 text-center top-m " > 
              <div className="search-adv">
                Sort by &nbsp;&nbsp;
                <select >
                  <option>
                    Relevant
                  </option>
                </select>
              </div>
              <br className="br-mob" />
              <br className="br-mob" />
              <div className="search-adv">
                Duration&nbsp;&nbsp;
                <select defaultValue={this.state.selectValueDuration} onChange={this.handleChangeDuration} >
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
              <br className="br-mob" />
              <div className="search-adv">
                Uploaded &nbsp;&nbsp;
                <select defaultValue={this.state.selectValueTime} onChange={this.handleChangeTime} >
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
                  size={15}
                />
            </center>
            )
            :
            (
              this.loadProblemStatements()
            )
          }
  
          {/* { this.state.timesCalled = this.state.timesCalled + 1 } */}
          </div>          

        </div>
      </div>
    );
    
  }    
}

export default App;
 

 