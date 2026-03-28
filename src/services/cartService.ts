import { cartModel } from "../models/carModel.ts";
import productModel from "../models/productModel.ts";

interface CreateCartForUser{
    userId:string;

}
const CreateCartForUser =async ({userId}:CreateCartForUser)=>{
    const cart = await cartModel.create({userId ,totalAmount:0});
    await cart.save();
    return cart;
};
interface GetActiveCartForUser{
    userId:string;
}
export const  getActveCartForUser= async({
userId,
}: GetActiveCartForUser)=>{
let cart =await cartModel.findOne({userId,status:"active"});

if(!cart){
    cart =await CreateCartForUser({userId});
}
return cart;
};
interface AddItemToCart {
    productId:any;
    quantity:number;
    userId:string;
}
export const addItemToCart = async ({
    productId,
    quantity,
    userId
}:AddItemToCart) =>{
    const cart = await getActveCartForUser({userId});

    const existsInCart = cart.items.find((p)=>p.product.toString() === productId);

    if(existsInCart){
        return { data: "item already exists in cart",statusCode:400};
    }
    //fetch the product 
    const product = await productModel.findById(productId);

    if(!product ){
        return  { data:"product not found!", statusCode:400};
    }
    if (product.stock<quantity){
        return{data:"low stock for item",statusCode:400};
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,quantity,
    });
    cart.totalAmount+=product.price*quantity;
    
    const updatedCart= await cart.save();
    return{data :updatedCart ,statusCode : 200 };

};
