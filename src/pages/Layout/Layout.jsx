import React,{useState}  from 'react'
import Toolbar from '../../components/Toolbar/Toolbar'
import SideDrawer from '../../components/Toolbar/SideDrawer/SideDrawer'


const  Layout = (props)=>{
   
    const [sideDrawer , setSideDrawer] = useState(false)

    const SidedrawerControllHandler = ()=>{
        setSideDrawer(!sideDrawer)
    }
    
   
    const cancleDrawerHandler=()=>{
        setSideDrawer(false)
    }
    
        return(
            <div >
                <Toolbar 
                SidedrawerControll={SidedrawerControllHandler}
                cancleDrawer={cancleDrawerHandler}
                />
                
                {sideDrawer ?
                <SideDrawer  cancleDrawer={cancleDrawerHandler} />
                : null}

                <main>
                    {props.children}
                </main>
             
            </div>
        )
    
}


  
export default Layout