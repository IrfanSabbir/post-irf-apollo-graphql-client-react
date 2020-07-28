import React from 'react'
import {NavLink} from 'react-router-dom'

import './NavigationItems.css'
import TreeItem from '@material-ui/lab/TreeItem'

const NavigationItems = (props)=>(
    <div className="item">
    <NavLink to={props.path} exact activeClassName="active" onClick={props.cancleDrawer}>
        <TreeItem nodeId={props.nodeId} label={props.label} />
            {/* <p >{props.label}</p> */}
        {/* </TreeItem> */}
    </NavLink>
    </div>
)

export default NavigationItems