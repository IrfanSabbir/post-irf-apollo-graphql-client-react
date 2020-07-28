import React from 'react'
import  './Backdrop.css'
const backdrop = (props)=>{
    console.log('here')
    return (
    <div className="Backdrop" onClick={props.cancleModal}>

    </div>)
    
}
export default backdrop