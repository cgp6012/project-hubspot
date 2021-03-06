import * as actionTypes from './actionTypes'
import axios from 'axios'
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, X-Authentication'
}

export const getAllDeals = () => {
  // change the url back please and thank you
  const request = axios.get('/api/deals', {
    headers: CORS_HEADERS
  })
  return {
    type: actionTypes.GET_ALL_DEALS,
    payload: request
  }
}

export const getAllDealsDashboard = () => {
  // change the url back please and thank you
  const request = axios.get('/api/deals', {
    headers: CORS_HEADERS
  })
  return {
    type: actionTypes.GET_ALL_DEALS_DASHBOARD,
    payload: request
  }
}

export const getDealPosition = () => {
  const request = axios.get('/api/dealsposition', { headers: CORS_HEADERS })

  return {
    type: actionTypes.GET_DEAL_POSITION,
    payload: request
  }
}

export const setDealPosition = (newState, oldColumn, newColumn) => {

  let data = [];

  if (oldColumn && newColumn) {

    data = [oldColumn, newColumn]
  } else {
    // Change order in same column
    data = [oldColumn];
  }

  const request = axios({
    method: 'put',
    url: '/api/dealsposition/',
    headers: CORS_HEADERS,
    data
  })

  return {
    type: actionTypes.SET_DEAL_POSITION,
    payload: newState
  }
}

export const createDeal = dealData => {
  const request = axios({
    method: 'post',
    url: '/api/deals',
    headers: CORS_HEADERS,
    data: dealData
  })

  return {
    type: actionTypes.CREATE_DEAL,
    payload: request
  }
}

export const getDealById = dealId => {
  const request = axios.get(`/api/deals/${dealId}`, {
    headers: CORS_HEADERS
  })

  return {
    type: actionTypes.GET_DEAL_BY_ID,
    payload: request
  }
}

export const deleteDealById = dealId => {
  const request = axios.delete(`/api/deals/${dealId}`)
  return {
    type: actionTypes.DELETE_DEAL_BY_ID,
    payload: request
  }
}
