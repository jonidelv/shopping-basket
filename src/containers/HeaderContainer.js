import React from 'react'
import PropTypes from 'prop-types'
import { HeaderView } from '../components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingBasketActions from '../actions/shoppingBasket'

class HeaderContainer extends React.Component {

  static propTypes = {
    fetchDisccount: PropTypes.func.isRequired,
    disccount: PropTypes.object.isRequired,
    disccountError: PropTypes.string.isRequired,
    totalItems: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.fetchDisccount()
  }

  render() {
    return (
      <HeaderView
        disccount={this.props.disccount}
        disccountError={this.props.disccountError}
        totalItems={this.props.totalItems}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    disccount: state.shoppingBasket.disccount,
    disccountError: state.shoppingBasket.disccountError,
    totalItems: state.shoppingBasket.totalItems,
  }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(shoppingBasketActions, dispatch)
  return {
    fetchDisccount: actions.fetchDisccount,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer)
