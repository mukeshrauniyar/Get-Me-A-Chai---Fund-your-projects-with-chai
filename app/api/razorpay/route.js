import { NextResponse } from "next/server";
import {validdatePayentVerification} from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from 'razorpay';
import connectDb from "@/db/connectDb";
import User from "@models/user"

export const POST = async(req) =>{
    await connectDb()
    let body = await req.formDate() 
    body = Object.fromEntries(body)

    //check if razorpayOrderId is present on the server
    let p = await Payment.findOne({oid: body.razorpay_order-id})
    if(!p){
        return NextResponse.json({sucess: false, message:"Order id not found"})
    }

    //fetch the secrect of the user who is getting the payment
    let user = await User.findOne({username:p.to_user})
    const secret = user.razorpaysecret

    //verify the payment
    let xx = validdatePayentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id}, {done:"true"}, {new:true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({sucess: false, message:"Payment Verifacation Failed"})
    }
   
}