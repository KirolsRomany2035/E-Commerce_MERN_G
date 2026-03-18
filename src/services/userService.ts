import { userModel } from "../models/userModel.ts";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
interface Registerparams {
firstName: string;
lastName: string;
email: string;
password: string;
}
export const register = async ({
firstName,
lastName,
email,
password,
}: Registerparams) => {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
    return { data: "User already exists", statusCode: 400 };
}
const hashedpassword= await bcrypt.hash(password,10)
const newUser = new userModel({ email, password :hashedpassword, firstName, lastName });
await newUser.save();
return { data:generateJWT ({firstName,lastName,email}), statusCode: 200 };
};
interface Loginparams {
email: string;
password: string;
}
export const login = async ({ email, password }: Loginparams) => {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
    return { data:  "Incorrect email or password" ,statusCode:400 };
}
const passwordMatch = await bcrypt.compare(password,findUser.password)
if (passwordMatch) {
    return {data:generateJWT({email,firstName:findUser.firstName,lastName:findUser.lastName}),statusCode:200};
}
return { data:  "Incorrect email or password" ,statusCode:400 };
};
const generateJWT=(data:any)=>{
    return JWT.sign(data,'7a59035a6aea4b8c234f53833d1e6176a673f8074b2e05b3a1d3fda815a072bd')
}