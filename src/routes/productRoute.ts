import express from "express"

import { getAllproducts } from "../services/productService.ts"


const router = express.Router()

router.get('/', async (req,res)=>{
    const products =await getAllproducts();
    res.status(200).send(products)

    });
export default router;