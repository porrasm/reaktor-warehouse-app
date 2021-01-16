import { Router } from 'express'
import axios from 'axios';
import timer from '../tools/timer'
import parser from 'xml2json'
const router = Router()

const baseURL = "https://bad-api-assignment.reaktor.com/v2/"
const timeout = 250

router.get('/', async (req, res) => {
    console.log('Get')
    res.json({success: true})
})

router.get('/products/:category', async (req, res) => {
    const path = apiPath(["products", req.params.category])
    res.json(await getJsonResponse(path))
})

router.get('/availability/:manufacturer', async (req, res) => {
    const path = apiPath(["availability", req.params.manufacturer])
    const data = await getJsonResponse(path)

    console.log("Received availability: ", data)

    try {
        res.json(data.response.map((p: { id: any; DATAPAYLOAD: string; }) => {
            const productAvailability = {
                id: p.id,
                availability: getAvailabilityFromXml(p.DATAPAYLOAD)
            }
            console.log("Product availability: ", productAvailability)
            return productAvailability
        }))
    } catch (e) {
        res.status(500).json([])
    }
})
const getAvailabilityFromXml= (s: string) => {
    const data = JSON.parse(parser.toJson(s))
    return data["AVAILABILITY"]["INSTOCKVALUE"]
}

const getJsonResponse = async (path: string, retries = 1) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(path, {
                headers: {
                    'x-force-error-mode': ''
                }
            })
            return response.data
        } catch (e) {
            console.log("Error fetching JSON from API: ", e.message, e)
        }
        await timer(timeout)
    }
}

const apiPath = (path: Array<string>) => {
    return baseURL + path.join("/")
}

export default router;