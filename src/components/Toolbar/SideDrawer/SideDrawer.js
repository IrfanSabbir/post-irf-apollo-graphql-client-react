import React from 'react'
import  './SideDrawer.css'
import Navigations from './Navigation/Navigations'
import Backdrop from '../Backdrop/Backdrop'

const sidedrawer = (props)=>{
    
    return(
        <React.Fragment>
            
            <div className="SideDrawer">
             
                <Navigations  cancleDrawer={props.cancleDrawer}/>
            </div>
            <Backdrop cancleModal={props.cancleDrawer} />
         </React.Fragment>
    )
}
export default sidedrawer
