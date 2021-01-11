import { Router } from 'express'
import axios from 'axios';
import timer from '../tools/timer'
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
    res.json(await getJsonResponse(path))
})

const getJsonResponse = async (path: string, retries = 1) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(path)
            console.log("Received response: ", response)
            return response.data
        } catch (e) {
            console.log("Error fetching products: ", e.message, e)
        }
        await timer(timeout)
    }

}

const apiPath = (path: Array<string>) => {
    return baseURL + path.join("/")
}

export default router;