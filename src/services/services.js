import axios from 'axios'

const {
  VITE_BASE_URL_API
} = import.meta.env

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6IjEifQ.4-7PlydZ8HlMHTb2H3HlSuBkUGr8pPu7RIgjlBsR568'
/* request apis */
export const getRequest = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.get(`${VITE_BASE_URL_API}${url}`, config)
  return request.data
}

export const createRequest = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.post(`${VITE_BASE_URL_API}${endpoint}`, data, config)
  return request.data
}

export const deleteRequest = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data
  }
  const request = await axios.delete(`${VITE_BASE_URL_API}${endpoint}`, config)
  return request.data
}

export const updateRequest = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.put(`${VITE_BASE_URL_API}${endpoint}`, data, config)
  return request.data
}

export const patchRequest = async (endpoint, data) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.patch(`${VITE_BASE_URL_API}${endpoint}`, data, config)
  return request.data
}
