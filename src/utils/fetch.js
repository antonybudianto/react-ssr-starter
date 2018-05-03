import axios from 'axios'

export const fetch = async (url, headers) => {
  let header = {
    ...headers,
    url: url,
    withCredentials: 'true'
  }
  try {
    let data = await axios.request(header)
    return data.data
  } catch (err) {
    throw err.response
  }
}
