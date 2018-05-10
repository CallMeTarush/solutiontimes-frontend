import React from 'react';

import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './containers/home.jsx';
import Challenge from './containers/challenge.jsx';
import Contact from './containers/contact';
import FAQ from './containers/faq';

class App extends React.Component {
    render() {
       return (
        <Switch>
            <Route exact activeClassName="current" path='/' component={Home}></Route>
            <Route exact path="/challenge/:id" render={({ location, match }) => (
                <Challenge params={match.params}/>
            )} />
            <Route exact activeClassName="current" path='/contact' component={Contact}></Route>
            <Route exact activeClassName="current" path='/faq' component={FAQ}></Route>
            {/* <Route exact activeClassName="current" path='/checkin' component={Checkin}></Route>             */}
        </Switch>

       );
    }
}

 export default App;
 