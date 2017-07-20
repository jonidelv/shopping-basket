import React from 'react'
import PropTypes from 'prop-types'
import { ShoppingBasketView } from '../components'
import domtoimage from 'dom-to-image'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingBasketActions from '../actions/shoppingBasket'

class ShoppingBasketContainer extends React.Component {

  static propTypes = {
    fetchFruits: PropTypes.func.isRequired,
    fetchDisccount: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    removeToBasket: PropTypes.func.isRequired,
    clearBasket: PropTypes.func.isRequired,
    fruits: PropTypes.array.isRequired,
    fruitsError: PropTypes.string.isRequired,
    disccount: PropTypes.object.isRequired,
    disccountError: PropTypes.string.isRequired,
    basket: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchFruits()
    this.props.fetchDisccount()
  }

  addToBasket = (item) => {
    this.props.addToBasket(item)
  }

  removeToBasket = (item) => {
    this.props.removeToBasket(item)
  }

  clearBasket = () => {
    this.props.clearBasket()
  }

  saveReceipt = () => {
    domtoimage.toPng(document.getElementById('receipt'))
      .then((dataUrl) => {
        var link = document.createElement('a')
        link.download = 'my-receipt.png'
        link.href = dataUrl
        link.click()
        this.clearBasket()
      })
  }

  render() {
    return (
      <ShoppingBasketView
        fruits={this.props.fruits}
        fruitsError={this.props.fruitsError}
        addToBasket={this.addToBasket}
        removeToBasket={this.removeToBasket}
        clearBasket={this.clearBasket}
        basket={this.props.basket.sort((a, b) => (a.fruitId - b.fruitId))}
        disccount={this.props.disccount}
        saveReceipt={this.saveReceipt}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    fruits: state.shoppingBasket.fruits,
    fruitsError: state.shoppingBasket.fruitsError,
    disccount: state.shoppingBasket.disccount,
    disccountError: state.shoppingBasket.disccountError,
    basket: state.shoppingBasket.basket,
  }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(shoppingBasketActions, dispatch)
  return {
    fetchFruits: actions.fetchFruits,
    fetchDisccount: actions.fetchFruits,
    addToBasket: actions.addToBasket,
    removeToBasket: actions.removeToBasket,
    clearBasket: actions.clearBasket,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingBasketContainer)
