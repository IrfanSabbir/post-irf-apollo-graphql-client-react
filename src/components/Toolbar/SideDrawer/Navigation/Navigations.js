import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

// import classes from './NavigationItems.css'
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';

import Avatar from '@material-ui/core/Avatar'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem'
import NavigationItems from './NavigationItems/NavigationItems'

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "./Navigation.css"
const navigation = (props)=>(
    <div>

   
    {props.token && <TreeView
     defaultCollapseIcon={<ExpandMoreIcon />}
     defaultExpandIcon={<ChevronRightIcon />}
    >
       <div className="items">
        <TreeItem nodeId="10" label= {props.name}>
        <NavigationItems 
            path ="/profile"
            label="profile"
            nodeId="11"
            cancleDrawer={props.cancleDrawer}
        />
        
        <NavigationItems 
            path ="/logout"
            label="logout"
            nodeId="12"
            cancleDrawer={props.cancleDrawer}
        />
      
      </TreeItem>
      </div>
    </TreeView>}

    {/* <TreeView >

     <Avatar style={{border:"2px solid white"}} alt="Remy Sharp" src={props.image} />
      
       <NavigationItems 
           path ="/profile"
           label="post"
           nodeId="5"
       />
    </TreeView> */}
     <br/>
    <TreeView
    >
        
       <NavigationItems 
           path ="/"
           label="post"
           nodeId="1"
           cancleDrawer={props.cancleDrawer}
       />
    </TreeView>
    
    {
        props.token && 
        <TreeView
        >
            
           <NavigationItems 
               path ="/create_post"
               label="create_post"
               nodeId="10"
               cancleDrawer={props.cancleDrawer}
           />
        </TreeView>
    }

    <TreeView
    >
        
       <NavigationItems 
           path ="/user"
           label="users"
           nodeId="2"
           cancleDrawer={props.cancleDrawer}
       />
    </TreeView>


    {!props.token && <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
       <div className="items">
        <TreeItem nodeId="5" label="Regester" >
        <NavigationItems 
            path ="/register"
            label="signup"
            nodeId="6"
            cancleDrawer={props.cancleDrawer}
        />
        
        <NavigationItems 
            path ="/login"
            label="login"
            nodeId="7"
            cancleDrawer={props.cancleDrawer}
        />
      
      </TreeItem>
      </div>
    </TreeView>}



        </div>
        

)
const mapStateToProps = state =>{
    return {
        token : state.auth.token,
        name : state.auth.user.user_name
    }
}
export default connect(mapStateToProps)(navigation)