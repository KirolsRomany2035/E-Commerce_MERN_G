import express from "express";
import { login, register } from "../services/userService.ts";

const routrt =express.Router();

routrt.post("/register",async(request,response)=>{
    const{firstName,lastName,email,password} = request.body;
    const{statusCode,data}= await register({firstName,lastName,email,password});
    response.status(statusCode).send(data)
    });
routrt.post('/login',async (request,response)=>{
    const{email,password}=request.body;
    const{statusCode,data}=await login({email,password})
    response.status(statusCode).send(data)

})


export default routrt;