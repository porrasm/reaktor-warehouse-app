import { Router } from 'express'
import { IProduct } from '../../general_types'
import getJsonResponse from '../utils/getJson'
const router = Router()

const baseURL = "https://bad-api-assignment.reaktor.com/v2/products/"
const timeout = 250

router.get('/:category', async (req, res) => {
    try {
        const path = baseURL + req.params.category
        res.json(await getJsonResponse<IProduct[]>(path))
    } catch (error) {
        res.status(500).json([])
    }
})

export default router;