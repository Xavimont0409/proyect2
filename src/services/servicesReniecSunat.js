import axios from 'axios'

const {
  VITE_BASE_URL_API_APIS_PERU
} = import.meta.env

const TOKEN_APIS_PERU = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpc3RlbWFzQG1lZGljb3NzYWx1ZC5jb20ifQ.DlnZZRULwalE3T_6qkyWw5OaWDnTZgE1P6pFjWCPnOo'

export const getRequestApiPeru = async (endpoint, nro) => {
  const request = await axios.get(`${VITE_BASE_URL_API_APIS_PERU}${endpoint}/${nro}?token=${TOKEN_APIS_PERU}`)
  return request.data
}
