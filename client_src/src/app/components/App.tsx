import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import PermanentDrawer from './PermanentDrawer/PermanentDrawer'

interface IProps {
}
class App extends React.Component<IProps>{

  render() {
    return (
      <div>
        <CssBaseline />
        <Router>
          <PermanentDrawer>
            {/* <this.props.routeComponent /> */}
          </PermanentDrawer>
        </Router>
      </div>
    )
  }
}

export default App;