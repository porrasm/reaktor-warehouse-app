import getJsonResponse from '../utils/getJson'
import parser from 'xml2json'
import { IProduct, IAvailability } from '../../general_types'

interface IProductCache {
    // Map<category, list of products>
    products: { [name: string]: Array<IProduct> },
    availability: { [name: string]: string },
    productUpdateTimes: { [name: string]: number },
    availabilityUpdateTimes: { [name: string]: number }
}
interface IAvailabilityResponse {
    response: IRawAvailability[]
}
type IRawAvailability = {
    id: string,
    DATAPAYLOAD: string
}
enum UpdateStatus {
    Updated,
    NotUpdated,
    Failed
}

const cachedObjectLifetime = 300

const baseURL = "https://bad-api-assignment.reaktor.com/v2"

const cache: IProductCache = {
    products: {},
    availability: {},
    productUpdateTimes: {},
    availabilityUpdateTimes: {}
}

//#region updating
const updateProducts = async (category: string): Promise<UpdateStatus> => {
    if (cache.products[category]
        && cache.products[category].length > 0
        && getSeconds() - cache.productUpdateTimes[category] < cachedObjectLifetime) {
        return UpdateStatus.NotUpdated
    }
    try {
        const path = baseURL + "/products/" + category
        let products = await getJsonResponse<IProduct[]>(path)
        products = products.map(p => {
            p.availability = ""
            return p
        }).sort((a, b) => a.name.localeCompare(b.name))
        saveProducts(category, products)
        return UpdateStatus.Updated
    } catch (error) {
        return UpdateStatus.Failed
    }
}

const updateAvailability = async (manufacturer: string): Promise<UpdateStatus> => {
    if (cache.availabilityUpdateTimes[manufacturer] && getSeconds() - cache.availabilityUpdateTimes[manufacturer] < cachedObjectLifetime) {
        return UpdateStatus.NotUpdated
    }

    try {
        const path = baseURL + "/availability/" + manufacturer
        let data = await getJsonResponse<IAvailabilityResponse>(path)
        const availability = data.response.map((p: { id: any; DATAPAYLOAD: string; }) => {
            const productAvailability: IAvailability = {
                id: p.id,
                availability: getAvailabilityFromXml(p.DATAPAYLOAD)
            }
            return productAvailability
        })

        saveAvailability(manufacturer, availability)
        return UpdateStatus.Updated
    } catch (error) {
        return UpdateStatus.NotUpdated
    }
}

const getAvailabilityFromXml = (s: string): string => {
    const data = JSON.parse(parser.toJson(s))
    return data["AVAILABILITY"]["INSTOCKVALUE"]
}


//#endregion

//#region saving
const saveProducts = (category: string, products: IProduct[]) => {
    cache.products[category] = products
    cache.productUpdateTimes[category] = getSeconds()
}
const saveAvailability = (manufacturer: string, availabilityArray: IAvailability[]) => {
    availabilityArray.forEach(a => {
        cache.availability[a.id.toLowerCase()] = a.availability
    });
    cache.availabilityUpdateTimes[manufacturer] = getSeconds()
}

const getSeconds = () => {
    return new Date().getTime() / 1000
}
//#endregion


//#region API
const getManufacturers = async (category: string): Promise<string[] | null> => {
    const productsResult = await updateProducts(category)
    console.log(`--PRODUCT UPDATE STATUS '${category}': ${productsResult}`)
    
    if (productsResult == UpdateStatus.Failed) {
        return null
    }
    const products = cache.products[category]
    if (!products) {
        return []
    }
    const hs = new Set<string>()
    products.forEach(p => {
        hs.add(p.manufacturer)
    });
    const manufacturers: string[] = []
    hs.forEach(m => {
        manufacturers.push(m)
    })
    return manufacturers.sort()
}

const getProducts = async (category: string, manufacturer: string, page = 0, pageItemCount = 20, filter = ""): Promise<IProduct[] | null> => {

    console.log(`Get producst: cat=${category} man=${manufacturer} page=${page} filter=${filter}`)

    const productsResult = await updateProducts(category)
    console.log(`--PRODUCT UPDATE STATUS '${category}': ${productsResult}`)

    if (productsResult == UpdateStatus.Failed) {
        return null
    }

    const availabilityResult = await updateAvailability(manufacturer)
    console.log(`--AVAILABILITY UPDATE STATUS '${manufacturer}': ${availabilityResult}`)
    
    // leave out await for instant return
    if (availabilityResult == UpdateStatus.Failed) {
        console.log('Failed to update availability')
    }

    return cache.products[category].filter(p => {
        return manufacturer == p.manufacturer && p.name.toLocaleLowerCase().includes(filter.toLowerCase())
    }).slice(page, page + pageItemCount).map(p => {
        p.availability = cache.availability[p.id]
        return p
    })
}
//#endregion

export default {
    getManufacturers,
    getProducts
}