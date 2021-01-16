import axios from 'axios'

const baseURL = 'http://localhost:3001/api/'
const timeout = 250

let callID = 0

export interface IProduct {
  id: string,
  type: string,
  name: string,
  color: Array<string>,
  price: number,
  manufacturer: string
}

export interface IAvailability {
  id: string,
  availability: string
}

const getCategoryProducts = async (category: string, retries = 6): Promise<Array<IProduct>> => {
  const id = ++callID
  for (let i = 0; i < retries; i++) {
    if (id !== callID) {
      break
    }
    console.log(`API request for products (retries left: ${retries - 1 - i}): `, category)
    try {
      const response = await axios.get(apiPath(["products", category]))
      if (response.status = 200) {
        return response.data as Array<IProduct>
      } else {
        console.log("Error fetchin product data: ", response)
        return []
      }
    } catch (e) {
      console.log('Error getting products: ', { category, message: e.message, e })
    }

    await delay(timeout)
  }
  return []
}


const getManufacturerAvailability = async (manufacturer: string, retries = 6): Promise<Array<IAvailability>> => {
  const id = ++callID
  for (let i = 0; i < retries; i++) {
    if (id !== callID) {
      break
    }
    console.log(`API request for availability (retries left: ${retries - 1 - i}): `, manufacturer)
    try {
      const response = await axios.get(apiPath(["availability", manufacturer]))
      if (response.status == 200) {
        return response.data as Array<IAvailability>
      } else {
        console.log("Error fetching availability data: ", response)
        return []
      }

    } catch (e) {
      console.log('Error getting availability: ', { manufacturer, message: e.message, e })
    }

    await delay(timeout)
  }
  return []
}

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const apiPath = (path: Array<string>) => {
  return baseURL + path.join("/")
}

export default {
  getCategoryProducts,
  getManufacturerAvailability,
}