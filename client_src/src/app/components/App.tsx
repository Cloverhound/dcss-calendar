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
  routeComponent: any
}
class App extends React.Component<IProps>{
  
  render() {
    return (
        <div>
          <CssBaseline />
          <PermanentDrawer>
            <Router>
              <this.props.routeComponent/>
            </Router>
          </PermanentDrawer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    routeComponent: state.routeComponent
  }
}

export default connect(mapStateToProps, null)(App);