import React from 'react'
import './Modal.css'
import Backdrop from '../Toolbar/Backdrop/Backdrop'
import CloseIcon from '@material-ui/icons/Close';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
const Modal = (props)=>{
    return(
        <div>   
        <div className="Modal">
           <div style={{float:"right", padding:"5px"}} > 
              <button  onClick={props.cancleModal}><CloseOutlinedIcon color="secondary"/></button>
           </div>
            {console.log("here")}
            {props.children}
        </div>
        {/* <Backdrop /> */}
        </div>
    )
}

export default Modal 