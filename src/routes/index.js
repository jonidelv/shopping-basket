import React, { Component } from 'react'
import { ShoppingBasketContainer, HeaderContainer } from '../containers'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import colors from '../constants/colors'

class Routes extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={colors}>
          <div>
            <HeaderContainer />
            <Route path="/" component={ShoppingBasketContainer} />
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

export default Routes
