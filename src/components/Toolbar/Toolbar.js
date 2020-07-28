import React , {useState} from 'react'
import "./Toolbar.css"
import Navigation from './Navigation/Navigations'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import Toggle from './SideDrawer/DrawerToggle/DrawerToggle'
import { makeStyles } from '@material-ui/core/styles';
import * as action from '../../store/action/index'
import {connect} from 'react-redux'

const useStyles = makeStyles({
    input: {
        marginTop:"20px",
        height:"80%",
        // width: '70%',

        // paddingTop:"5px"
    }
  })

   
const Toolbar = (props)=>{
    const classes = useStyles();
    const [search , setSearch] = useState('')
   
    const searchStoreHandler = ()=>{
        props.onSearch(search)
    }
    return (
        <div className="Toolbar">
            {/* <div className="Nav"> <Navigation /> </div> */}
            <Toggle clicked={props.SidedrawerControll}/>
            
            <div className="Search">
            {/* <input type="text" placeholder="name..."/> */}
            <TextField required type="email" 
                    className={classes.input} 
                    onChange={(e)=>setSearch(e.target.value)}
                    // label="post person date"
                    placeholder="hi 2020-07-22.."
            />
            <Button variant="text" color="primary" onClick={searchStoreHandler}>search</Button>

             </div> 

        </div>
      
    )
}

const mapDispatchToProps = dispatch =>{
    return {
        onSearch : (search)=>dispatch(action.search(search))
    }
}

export default connect(null, mapDispatchToProps)(Toolbar)