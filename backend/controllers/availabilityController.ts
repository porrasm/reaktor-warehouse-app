import { Router } from 'express'
import parser from 'xml2json'
import { IAvailability } from '../../general_types'
import getJsonResponse from '../utils/getJson'
const router = Router()

const baseURL = "https://bad-api-assignment.reaktor.com/v2/availability/"

interface IAvailabilityResponse {
    response: IRawAvailability[]
}
type IRawAvailability = {
    id: string,
    DATAPAYLOAD: string
}

router.get('/:manufacturer', async (req, res) => {
    try {
        const path = baseURL + req.params.manufacturer
        const data = await getJsonResponse<IAvailabilityResponse>(path)
        console.log("Received availability: ", data)
        res.json(data.response.map((p: { id: any; DATAPAYLOAD: string; }) => {
            const productAvailability: IAvailability = {
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

const getAvailabilityFromXml = (s: string): string => {
    const data = JSON.parse(parser.toJson(s))
    return data["AVAILABILITY"]["INSTOCKVALUE"]
}

export default router;