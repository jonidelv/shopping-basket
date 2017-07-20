import * as actions from '../../actions/shoppingBasket'
import * as types from '../../constants/actionTypes'
import fruits from '../../constants/fruits'
import disccount from '../../constants/disccount'

describe('shoppingBasket actions', () => {

  it('it should handle action FETCHING_SUCCES', () => {
    const expectedDisccountAction = {
      type: types.FETCHING_SUCCES,
      payload: {
        key: 'disccount',
        data: disccount,
      },
    }
    const expectedFruitsAction = {
      type: types.FETCHING_SUCCES,
      payload: {
        key: 'fruits',
        data: fruits,
      },
    }
    expect(actions.fetchingSuccess('disccount', disccount)).toEqual(expectedDisccountAction)
    expect(actions.fetchingSuccess('fruits', fruits)).toEqual(expectedFruitsAction)
  })

  it('it should handle action FETCHING_ERROR', () => {
    const expectedDisccountAction = {
      type: types.FETCHING_ERROR,
      payload: {
        key: 'disccountError',
        data: 'Error',
      },
    }
    const expectedFruitsAction = {
      type: types.FETCHING_ERROR,
      payload: {
        key: 'fruitsError',
        data: 'Error',
      },
    }
    expect(actions.fetchingError('disccountError', 'Error')).toEqual(expectedDisccountAction)
    expect(actions.fetchingError('fruitsError', 'Error')).toEqual(expectedFruitsAction)
  })

  it('it should handle action ADD_TO_BASKET', () => {
    const payload = {
      fruitId: 3,
      fruitName: 'orange',
      quantity: 5,
      price: 0.30,
      disccount: false,
    }
    const expectedAction = {
      type: types.ADD_TO_BASKET,
      payload,
    }
    expect(actions.addToBasket(payload)).toEqual(expectedAction)
  })

  it('it should handle action REMOVE_TO_BASKET', () => {
    const payload = {
      fruitId: 4,
      fruitName: 'papaya',
      quantity: 3,
      price: 0.15,
      disccount: true,
    }
    const expectedAction = {
      type: types.REMOVE_TO_BASKET,
      payload,
    }
    expect(actions.removeToBasket(payload)).toEqual(expectedAction)
  })

  it('it should handle action CLEAR_BASKET', () => {
    const expectedAction = {
      type: types.CLEAR_BASKET,
    }
    expect(actions.clearBasket()).toEqual(expectedAction)
  })

})
