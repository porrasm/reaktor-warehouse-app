import { Router } from 'express'
import warehouseAPI from '../API/warehouseAPI'
const router = Router()


const categories = ["gloves", "facemasks", "beanies"]

router.get('/categories', async (req, res) => {
    res.json(categories)
})

router.get('/manufacturers', async (req, res) => {
    const manufacturers = await warehouseAPI.getManufacturers(req.query.category as string)
    manufacturers ? res.json(manufacturers) : res.status(500)
})

router.get('/', async (req, res) => {
    console.log("--GET REQUEST PRODUCTS: ", req.query)
    const products = await warehouseAPI.getProducts(
        req.query.category as string, 
        req.query.manufacturer as string, 
        Number(req.query.page) - 1, 
        Number(req.query.pageItemCount), 
        req.query.filter as string)
    products ? res.json(products) : res.status(500)
})

export default router;