import type { NextFunction,Request,Response } from "express";
import JWT from 'jsonwebtoken';
import { userModel } from "../models/userModel.ts";

interface ExtendRequest extends Request{
    user?:any;
}

const validateJWT=(req:ExtendRequest,res:Response, next:NextFunction)=>{
    const authorizationHeader=req.get('authorization');
    if(!authorizationHeader){
        res.status(403).send("Authorization header was not procided");
        return;
    }
    const token=authorizationHeader.split(" ")[1];

    if (!token){
        res.status(403).send("bearer token not found");
        return;
    }
    JWT.verify(token,'7a59035a6aea4b8c234f53833d1e6176a673f8074b2e05b3a1d3fda815a072bd',async (err,payload)=>{
        if(err){
            res.status(403).send("Invalid token");
            return;
        }
        if(!payload){
            res.status(403).send ("Invalid token payload")
            return
        }
        const userPatload=payload as{
        email: String;
        firstName:String;
        lastName:String;
        };
        //farch user from database based on the payload
        const user= await userModel.findOne({email:userPatload.email});
        req.user=user;
        next();
});

}
export default validateJWT