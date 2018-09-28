import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import PermanentDrawer from './PermanentDrawer/PermanentDrawer'

interface IProps {
  routeComponent: any
}
class App extends React.Component<IProps>{
  
  render() {
    return (
        <div>
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