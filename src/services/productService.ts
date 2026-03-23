import productModel from "../models/productModel.ts";

export const getAllproducts = async ()=>{
    return await productModel.find();
}
export const seeIntialproducts= async()=>{
    const products =[
        {title:"dell laptop", image:"image.https://cdn.shopify.com/s/files/1/0517/5590/9295/files/best-dell-laptop_480x480.jpg?v=1689508231",price:25000 ,stock:10},
    ];

const existingProducts = await getAllproducts();

if (existingProducts.length=== 0){
    await productModel.insertMany(products)
}
};