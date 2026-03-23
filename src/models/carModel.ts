import mongoose, {Schema, Document, type ObjectId} from "mongoose";
import type { IProduct } from "./productModel.ts";


const CartStatusEnum=["active","completed"]

export interface ICartItem extends Document{
    product:IProduct;
    unitPrice:number;
    qunatity:number;
}
export interface ICart extends Document{
    userId:ObjectId|string;
    items:ICartItem[];
    totalAmount:number;
    status:"active"|"completed";
}
const cartItemSchema =new Schema<ICartItem>({
    product:{type:Schema.Types.ObjectId,ref:"product",required:true},
    qunatity:{type:Number,required:true,default:1},
    unitPrice:{type:Number,required:true},
});
const cartSchema =new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId,ref:"user",required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number,required:true},
    status:{ type:String,enum:CartStatusEnum,default:"active"}

})
export const cartModel =mongoose.model<ICart>("cart",cartSchema)