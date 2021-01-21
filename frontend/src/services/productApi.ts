import axios from 'axios'
import { IProduct, IAvailability } from '../../../general_types'

const baseURL = '/api/'
const timeout = 250

// Used to cancel API call retries if another API call is requested
let apiRetryID = 0


const getCategoryProducts = async (category: string): Promise<IProduct[]> => {
  const products = await getAPIResponse<IProduct[]>(apiPath(["products", category]))
  return products ? products : []
}

const getManufacturerAvailability = async (manufacturer: string): Promise<IAvailability[]> => {
  const availability = await getAPIResponse<IAvailability[]>(apiPath(["availability", manufacturer]))
  return availability ? availability : []
}

const getAPIResponse = async <T>(path: string, retries = 6): Promise<T | null> => {
  const retryID = ++apiRetryID
  for (let i = 0; i < retries; i++) {
    if (retryID !== apiRetryID) {
      break
    }
    try {
      const response = await axios.get(path)
      if (response.status != 200) {
        throw "Invalid response status received: " + response.status
      }
      return response.data as T
    } catch (e) {
      console.log("Error fetching JSON from API: ", e.message, e)
    }

    await delay(timeout)
  }
  return null
}

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const apiPath = (path: string[]) => {
  return baseURL + path.join("/")
}

export default {
  getCategoryProducts,
  getManufacturerAvailability
}