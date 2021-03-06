import React, { useState,useEffect } from 'react'
import './payments.css'
const Payments = () => {
  const [responses,setresponses]=useState([])
  const [delay,setdelay]=useState(true)
   /* const queryParams = new URLSearchParams(window.location.search);
    const [phone,setphone]=useState();
    const[cost,setcost]=useState();
    var status=false
    const urlphone = queryParams.get('phone');
    const urlcost = queryParams.get('cost');
    */
    const getPost = async () => {
      const response = await fetch("https://e8cc-41-90-115-26.ngrok.io/check").then(res=>{
        return res.json()}).then(data=>{
          console.log(data.CheckoutID)
          console.log(data.PassedCheckoutID)
          console.log(data.FailedCheckoutID)
          setresponses(data)
        })};
    
      
    useEffect(()=>{
      getPost()
      setTimeout(()=>{
        setdelay(false)
      },3000)
     setInterval(()=>getPost()
     ,4000)
      },[])

      
      
  return (
    <div id='cont' className='container align-items-center col-md-5 mt-4' >
      {(responses.CheckoutID==responses.FailedCheckoutID&&delay==false) && <h1>Your transaction was cancelled</h1>} 
      {(responses.CheckoutID==responses.PassedCheckoutID&&delay==false) && <div>
      <h1>Mpesa Transaction complete</h1>
      <h3>Transaction code: {responses.code}</h3>
      <h3>Amount: {responses.Amount}</h3>
      <h3>Phone Number: {responses.phone}</h3>
      </div>
      }
      {(responses.CheckoutID!==responses.FailedCheckoutID&& responses.CheckoutID!==responses.PassedCheckoutID) && <h1>Please enter pin</h1>}
    </div>
  )
}

export default Payments