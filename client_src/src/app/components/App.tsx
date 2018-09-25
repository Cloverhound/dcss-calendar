import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {Home} from './Home/Home';

interface IProps {
  compiler: string,
  framework: string,
  bundler: string
}

export class App extends React.Component<IProps, {}> {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}