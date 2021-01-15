import axios from 'axios'

const baseURL = 'http://localhost:3001/api/'

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

const getCategoryProducts = async (category: string): Promise<Array<IProduct>> => {
  try {
    console.log("API request for products: ", category)
    const response = await axios.get(apiPath(["products", category]))
    return response.data as Array<IProduct>
  } catch (e) {
    console.log('Error getting products: ', { category, message: e.message, e })
  }
  return []
}


const getManufacturerAvailability = async (manufacturer: string): Promise<Array<IAvailability>> => {
  try {
    console.log("API request for availability: ", manufacturer)
    const response = await axios.get(apiPath(["availability", manufacturer]))
    return response.data as Array<IAvailability>
  } catch (e) {
    console.log('Error getting availability: ', { manufacturer, message: e.message, e })
  }
  return []
}

const apiPath = (path: Array<string>) => {
  return baseURL + path.join("/")
}

export default {
  getCategoryProducts,
  getManufacturerAvailability,
}