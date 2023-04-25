import React, { useEffect } from 'react'
import './Wallet.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Wallet() {
    const user = useSelector(state => state.users.user);
    const [amount,setAmount] = useState(0)
    const [transaction,setTransaction] = useState([])
     useEffect(()=>{
      const fetchData = async () => {
        if(user){
            setAmount(user.wallet)
            setTransaction(user.transaction)
        }
      }
      fetchData()
        window.scrollTo(0, 0)
     },[user])
  return (
    <>
    <h1 className=" pt-3 text-uppercase " style={{ fontWeight: 'bolder',fontSize:'25px',justifyContent: 'center',display: 'flex' }}>Your Wallet</h1>
      <br />

    <div className='pb-4 rounded' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>
      
          <div className="iphone">
            
            <div className="headerwall">
              <div className="header-summary">
                <div className="summary-text">
                  My Balance
                </div>
                <div className="summary-balance">
                  ₹ {amount}
                </div>
                
              </div>
              
            </div>
            
      <div className="content">
             
      <div className="transactions"><span className="t-desc">Recent Transactions</span>
      {transaction.map((amount)=>(
         <div className="transaction">
     <div className="t-icon-container"><img src="https://pbs.twimg.com/profile_images/1271385506505347074/QIc_CCEg_400x400.jpg" className="t-icon" /></div>
     <div className="t-details">
       <div className="t-title ">Razorpay </div>
       <div className="t-time">  {amount.date}
       </div>
     </div>
     {amount.amount > 0 ? (
  <div className="t-amount">+ {Math.abs(amount.amount)}</div>
) : (
  <div className="s-amount"> {amount.amount}</div>
)}
      </div>
    ))}
       </div>
          </div>
           
           
           
          </div>
      
       
      </div>
      </>
  )
}

export default  Wallet
