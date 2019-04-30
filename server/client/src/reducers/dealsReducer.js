import * as actionTypes from '../actions/actionTypes';

export const dealsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DEALS:
      return {
        ...state,
        deals: action.payload.data
      }

    case actionTypes.GET_DEAL_BY_ID:
      return {
        ...state,
        deal: action.payload.data
      }

    default:
      return state;
  }
}

export default dealsReducer;