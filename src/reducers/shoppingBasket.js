import {
  FETCHING_SUCCES,
  FETCHING_ERROR,
  ADD_TO_BASKET,
  REMOVE_TO_BASKET,
  CLEAR_BASKET,
} from '../constants/ActionTypes'

const initialState = {
  fruits: [],
  fruitsError: '',
  disccount: {},
  disccountError: '',
  basket: [],
  totalItems: 0,
}

export default function shoppingBasket(state = initialState, action) {
  switch (action.type) {

    case FETCHING_SUCCES:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      }

    case FETCHING_ERROR:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      }

    case ADD_TO_BASKET:
      return {
        ...state,
        basket:[
          ...state.basket.filter((i) => i.fruitId !== action.payload.fruitId),
          action.payload,
        ],
        totalItems: state.totalItems + 1,
      }

    case REMOVE_TO_BASKET:

      let basket = action.payload.quantity ? [
          ...state.basket.filter((i) => i.fruitId !== action.payload.fruitId),
          action.payload,
        ] : [...state.basket.filter((i) => i.fruitId !== action.payload.fruitId)]

      let pastTotalItems = state.basket.length > 0 && state.basket.find((item) => item.fruitId === action.payload.fruitId)
        ? action.payload.quantity - state.basket.find((item) => item.fruitId === action.payload.fruitId).quantity
        : action.payload.quantity

      return {
        ...state,
        basket,
        totalItems: (state.totalItems + pastTotalItems) < 0 ? 0 : state.totalItems + pastTotalItems,
      }

    case CLEAR_BASKET:
      return {
        ...state,
        basket: [],
        totalItems: 0,
      }

    default:
      return state
  }
}
