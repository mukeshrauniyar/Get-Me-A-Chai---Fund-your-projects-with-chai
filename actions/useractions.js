"use server"

import Razorpay from 'razorpay'
import Payment from '@/models/Payment'
import connectDb from '@/db/connectDb'
import User from '@/models/User'
import username from '@/app/[username]/page'

export const initiate = async (amount, to_username, paymentfrom) =>{
    await connectDb()
     //fetch the secrect of the user who is getting the payment
     let user = await User.findOne({username:to_username})
     const secret = user.razorpaysecret

    var instance = new Razorpay({key_id:user.razorpayid , key_secret: secret})

   let option = {
    amount: Number.parseInt(amount),
    currency: "INR",
   }

   let x = await instsnce.orders.create(option)

     //  create a payment object which shows a pending payment in the database

     await Payment.create({oid: x.id, amount:amount/100, to_user: to_username, name:paymentfrom.name, message: paymentfrom.message})

     return x
}

export const fetchuser = async (username)=>{
  await connectDb()
  let u = await User.findOne({username:username})
  let user = u.toObject({flattenObjectIds:true})
  return user
}

export const fetchpayments = async (username)=>{
  await connectDb()
  //find all payments sorted by decreasing order of amount and flattrn object ids
  
  let p = await Payment.find({to_user:username, done:true}).sort({amount: -1}).limit(10).lean()
  return p
}

export const updateProfile = async (data, oldusername)=>{
  await connectDb()
  let ndata = Object.fromEntries(data)

  //if the username is being updated, check if username is available
  if(oldusername !== ndata.username) {
    let u = await User.findOne({username: ndata.username})
    if(u){
      return{error: "Username already exists"}
    }
    await User.updateOne({email: ndata.email}, ndata)
    await Payment.updateMany({to_user:oldusername}, {to_user:ndata.username})
  }
  else{
    await User.updateOne({email: ndata.email}, ndata)
  }
  
}