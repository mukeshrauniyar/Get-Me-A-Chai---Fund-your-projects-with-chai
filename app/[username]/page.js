'use client'
import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const username = async ({params}) => {

  //if the username is not persent in the database, show a 404 page
  const checkUser = async ()=>{
    await connectDb()
    let u = await User.findOne({username: params.username})
    if(!u){
      return notFound()
    }
  }
  await checkUser()


  return (
    <>
      
   <PaymentPage username={params.username}/>
    
    </>
  )
}

export default username

// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Ma A Chai`,
  }
}
