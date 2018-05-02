import React from 'react';

import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './containers/home.jsx';
import Challenge from './containers/challenge.jsx';

class App extends React.Component {
    render() {
       return (
        <Switch>
            <Route exact activeClassName="current" path='/' component={Home}></Route>
            <Route exact activeClassName="current" path='/challenge' component={Challenge}></Route>
            {/* <Route exact activeClassName="current" path='/checkin' component={Checkin}></Route>             */}
        </Switch>

       );
    }
}

 export default App;
 