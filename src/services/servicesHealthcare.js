import axios from 'axios'

const {
  VITE_BASE_URL_API_HEALTHCARE
} = import.meta.env

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6IjEifQ.4-7PlydZ8HlMHTb2H3HlSuBkUGr8pPu7RIgjlBsR568'

export const getRequestHealthcare = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }
  const request = await axios.get(`${VITE_BASE_URL_API_HEALTHCARE}${url}`, config)
  return request.data
}
