import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser} from '../actions.jsx'
import Login from './Login.jsx'
import Navbar from './Navbar.jsx'

class App extends Component {

  render() {
    console.log(this.props);
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

function mapStateToProps(state) {

  console.log("mapStateToProps");
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
