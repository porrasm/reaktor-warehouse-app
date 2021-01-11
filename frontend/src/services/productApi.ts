import axios from 'axios'

const baseURL = 'http://localhost:3001/api/'

const getCategoryProducts = async (category: string) => {
  try {
    const response = await axios.get(apiPath(["products", category]))
    return response.data
  } catch (e) {
    console.log('Error getting products: ', { category, message: e.message, e })
  }
}


const getManufacturerAvailability = async (manufacturer: string) => {
  try {
    const response = await axios.get(apiPath(["availability", manufacturer]))
    return response.data
  } catch (e) {
    console.log('Error getting availability: ', { manufacturer, message: e.message, e })
  }
}

const apiPath = (path: Array<string>) => {
  return baseURL + path.join("/")
}

export default {
  getCategoryProducts,
  getManufacturerAvailability
}