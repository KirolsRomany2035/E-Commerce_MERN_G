import express from "express";
import {getAcriveCartForUser} from "../services/cartService.ts";
import validateJWT from "../middlewares/validateJWT.ts";
import type { Request } from "express";
const router= express.Router();

interface ExtendRequest extends Request{
    user?:any;
}
router.get(
    "/",
    validateJWT,
    async (req:ExtendRequest,res)=>{
    const userId= req.user._id;
    const cart =await getAcriveCartForUser({userId });
    res.status(200).send (cart);
},
);
export default router;