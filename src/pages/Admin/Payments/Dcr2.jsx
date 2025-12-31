import React,{useState} from 'react'

// reusable card
const StatCard = ({title,amount})=>{
    <div className='bg-white rounded-2xl shadow p-5'>
        <h3>{title}</h3>
        <p>{amount}</p>
        <button>Export Report</button>
    </div>
}

const Dcr2 = () => {
  return (
    <div>Dcr2</div>
  )
}

export default Dcr2