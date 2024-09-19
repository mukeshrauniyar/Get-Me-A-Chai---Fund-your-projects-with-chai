'use client '
import React, {useEffect, useState} from 'react';
import Script from 'next/script';
import {fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';


const PaymentPage = (username) => {
    const [paymentform, setPaymentform] = useState({name:'', message:'', amount:''})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams =  useSearchParams()
    const router = useRouter()

    // const {data: session} = useSession

    useEffect(()=>{
      getData()
    },[])

    useEffect(() => {
      if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      router.push(`/${username}`)
    }, [])
    

    const handleChange = (e)=>{
        setPaymentform({...paymentform, [e.target.name]:e.target.value})
    }

    const getData = async ()=>{
      let u = await fetchuser(username)
      setcurrentUser(u)
      let dbpayments = await fetchpayments(username)
      setPayments(dbpayments)
      
    }
   
    const pay = async (amount) =>{
         //get the order id
     let a = await initiate(amount, username, paymentform)
     let orderId = a.id

        var option ={
            'key': currentUser.razorpayid, //Enter the Key ID generated fron the Dashboard
            'amount': amount, //Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paisa
            'currency': 'INR',
            'name': 'Get Me A Chai', //your bussiness name
            'description': 'Test Transaction',
            'image': 'https://example.com/your_logo',
            'order_id': orderId, //this is a sample orer ID. pass the id obtained in the response of step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {//Me recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "daurav Kumar", //your customer's name
            "email":"gaurav.kumar@example.com",
            "contact": "9888898888" //Provide the customer's phone number for better conversion rates
            },
            "notes": {
            "address": "Razorpay Corporate Office"
            },
            "theme":{
            "color": "#3399cc"
            }
            };

            var rzp1 = new Razorpay(option1);
            rzp1.open();
    
    }

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

      <Script src='https://checkout.razorpay.com/v1/checkout.js'></Script>
      
      <div className='cover w-full relative'>
      <img className='object-cover p-5 w-full h-48 md:h-[350]' src={currentUser.coverpic} alt="user cover image" />

      <div className="profile absolute -bottom-20 md:right-[44%] right-[34%] border-white border-2 rounded-full overflow-hidden size-36">
        <img className='rounded-full object-cover size-36' width={144} height={144} src={currentUser.profilepic} alt="profile pic" />
      </div>
    </div>
    <div className='info flex justify-center items-center flex-col my-24 gap-1'>
      <div className='font-bold text-xl'>@{username}</div>
      <div className='text-slate-400'>Let's help @{username} get a Chai</div>
      <div className='text-slate-400'>{payments.length} Payments . {currentUser.name} . ₹{payments.reduce((a,b)=> a+b.amount,0)} raised</div>

      <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
        <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
        {/* show list of all supporters as a leaderboard */}
        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
          <ul className='mx-5 text-lg'>
            {payments.length == 0 && <li>No Payments yet</li>}
            {payments.map((p, i)=>{
             return <li className='my-4 flex gap-2 items-center'>
               <img width={33} src="/avater.svg" alt="user avater" />
               <span>
                {p.name} donate <span className='font-bold'>₹{p.amount}</span> with a message: "{p.message}"
               </span>
             </li>
             })}
             
          </ul>
        </div>
        <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
        <div className='flex gap-2 flex-col'>
        <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />

             {/* input for name and message */}
        <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter your Name' />

          <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />

          <button onClick={()=> pay(Number.parseInt(paymentform.amount)*100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5  text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100 " disabled={paymentform.name?.length<3 || paymentform.message?.length<5 || paymentform.amount?.length<4}>Pay</button>
        </div>
        {/* or choose from these amount */}
        <div className='flex gap-2 mt-5 flex-col md:flex-row'>
          <button className='bg-slate-800 p-3 rounded-lg' onClick={()=> pay(1000)}>Pay ₹10</button>
          <button className='bg-slate-800 p-3 rounded-lg' onClick={()=> pay(2000)}>Pay ₹20</button>
          <button className='bg-slate-800 p-3 rounded-lg' onClick={()=> pay(3000)}>Pay ₹30</button>

        </div>

        </div>
      </div>
    </div>

    </>
  )
}

export default PaymentPage
