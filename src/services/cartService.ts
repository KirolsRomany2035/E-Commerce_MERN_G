import { cartModel } from "../models/carModel.ts";

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
export const getAcriveCartForUser= async({
userId,
}: GetActiveCartForUser)=>{
let cart =await cartModel.findOne({userId,status:"active"});

if(!cart){
    cart =await CreateCartForUser({userId});
}
return cart;
}