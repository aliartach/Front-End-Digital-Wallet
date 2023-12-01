import React from 'react'
import './homecard.css'
import { FaWallet } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const HomeCard = ({children, type, amount }) => {
  return (
    <div className='homecard'>
        <div className='headercard'>
       { children }
        <HiDotsVertical className='dotslogo'/>
        </div>
        <p className='balancecard'>{type}</p>
        <p className='balancecard'>{amount}</p>
        
        
        
        
        
        
    </div>
  )
}

export default HomeCard