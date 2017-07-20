import shoppingBasket from '../../reducers/shoppingBasket'
import * as types from '../../constants/actionTypes'
import fruits from '../../constants/fruits'
import disccount from '../../constants/disccount'

const initialState = {
  fruits: [],
  fruitsError: '',
  disccount: {},
  disccountError: '',
  basket: [],
  totalItems: 0,
}

describe('shoppingBasket reducer', () => {

  it('should return the initial state', () => {
    expect(shoppingBasket(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCHING_SUCCES', () => {
    expect(shoppingBasket(initialState, {
      type: types.FETCHING_SUCCES,
      payload: {
        key: 'disccount',
        data: disccount,
      },
    })).toEqual({...initialState, disccount})

    expect(shoppingBasket(initialState, {
      type: types.FETCHING_SUCCES,
      payload: {
        key: 'fruits',
        data: fruits,
      },
    })).toEqual({...initialState, fruits})
  })

  it('should handle FETCHING_ERROR', () => {
    expect(shoppingBasket(initialState, {
      type: types.FETCHING_ERROR,
      payload: {
        key: 'disccountError',
        data: 'Error',
      },
    })).toEqual({...initialState, disccountError: 'Error'})

    expect(shoppingBasket(initialState, {
      type: types.FETCHING_ERROR,
      payload: {
        key: 'fruitsError',
        data: 'Error',
      },
    })).toEqual({...initialState, fruitsError: 'Error'})
  })

  it('should handle ADD_TO_BASKET', () => {
    const payload = {
      fruitId: 3,
      fruitName: 'orange',
      quantity: 1,
      price: 0.30,
      disccount: false,
    }
    expect(shoppingBasket(initialState, {
      type: types.ADD_TO_BASKET,
      payload,
    })).toEqual({...initialState, basket:[payload], totalItems: 1 })
  })

  it('should handle REMOVE_TO_BASKET', () => {
    const state = {
      ...initialState,
      basket: [{
        fruitId: 4,
        fruitName: 'papaya',
        quantity: 5,
        price: 0.15,
        disccount: true,
      }],
      totalItems: 5,
    }
    const payload = {
      fruitId: 4,
      fruitName: 'papaya',
      quantity: 4,
      price: 0.15,
      disccount: true,
    }
    expect(shoppingBasket(state, {
      type: types.REMOVE_TO_BASKET,
      payload,
    })).toEqual({...state, basket:[payload], totalItems: 4 })
  })

  it('should handle CLEAR_BASKET', () => {
    const state = {
      ...initialState,
      basket: [{
        fruitId: 4,
        fruitName: 'papaya',
        quantity: 5,
        price: 0.15,
        disccount: true,
      }],
      totalItems: 5,
    }
    expect(shoppingBasket(state, {
      type: types.CLEAR_BASKET,
    })).toEqual({ ...initialState })
  })

})
