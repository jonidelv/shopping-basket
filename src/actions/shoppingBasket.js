import { createAction } from 'redux-actions'
import fruits from '../constants/fruits'
import disccount from '../constants/disccount'
import {
  FETCHING_SUCCES,
  FETCHING_ERROR,
  ADD_TO_BASKET,
  REMOVE_TO_BASKET,
  CLEAR_BASKET,
} from '../constants/ActionTypes'

export const fetchingSuccess = createAction(FETCHING_SUCCES, (key, data) => ({key, data}) )
export const fetchingError = createAction(FETCHING_ERROR, (key, data) => ({key, data}) )
export const addToBasket = createAction(ADD_TO_BASKET)
export const removeToBasket = createAction(REMOVE_TO_BASKET)
export const clearBasket = createAction(CLEAR_BASKET)

export function fetchDisccount() {
  return (dispatch, getState) => {
    try {
      //simulating an API call that return the disccount data
      return setTimeout(() => dispatch(fetchingSuccess('disccount', disccount)), 600)
    } catch (e) {
      dispatch(fetchingError('disccountError', e))
    }
  }
}

export function fetchFruits() {
  return (dispatch, getState) => {
    try {
      //simulating an API call that return the fruits data
      return setTimeout(() => dispatch(fetchingSuccess('fruits', fruits)), 700)
    } catch (e) {
      dispatch(fetchingError('fruitError', e))
    }
  }
}
