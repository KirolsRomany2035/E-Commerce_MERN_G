import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.ts";
import productRoute from "./routes/productRoute.ts";
import cartRoute from "./routes/cartRoute.ts";

import { seeIntialproducts } from "./services/productService.ts";

const app = express();
const prot = 3001;
app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/ecommerce-g")
.then(() => console.log(" mongo connected!"))
.catch((err) => console.log("failed to connect!", err));
seeIntialproducts()

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)

app.listen(prot,()=>{
    console.log(`server in runnig at http://localhost:${prot}`)
})
