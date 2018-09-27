import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home/Home';
import PermanentDrawer from './PermanentDrawer/PermanentDrawer'

export class App extends React.Component{
  render() {
    return (
        <div>
          <PermanentDrawer>
            <Router>
              <Home/>
            </Router>
          </PermanentDrawer>
      </div>
    )
  }
}