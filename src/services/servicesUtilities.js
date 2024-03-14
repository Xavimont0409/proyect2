import axios from 'axios'

const {
  VITE_BASE_URL_API_UTILITIES
} = import.meta.env

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6IjEifQ.4-7PlydZ8HlMHTb2H3HlSuBkUGr8pPu7RIgjlBsR568'
/* request apis */
export const getRequestUtilities = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.get(`${VITE_BASE_URL_API_UTILITIES}${url}`, config)
  return request.data
}

export const createRequestUtilities = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.post(`${VITE_BASE_URL_API_UTILITIES}${endpoint}`, data, config)
  return request.data
}

export const deleteRequestUtilities = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data
  }
  const request = await axios.delete(`${VITE_BASE_URL_API_UTILITIES}${endpoint}`, config)
  return request.data
}

export const updateRequestUtilities = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.put(`${VITE_BASE_URL_API_UTILITIES}${endpoint}`, data, config)
  return request.data
}
