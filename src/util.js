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

export const roundTo = (number, precision) => {
  let factor = Math.pow(10, precision)
  return Math.trunc(number * factor) / factor
}

export const STATUS_CODE = {
  C500: '500000',
  C200: '200000'
}
