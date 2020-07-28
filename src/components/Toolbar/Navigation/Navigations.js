import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import "./Navigation.css"
const navigation = (props)=>(
    <ul className="Navigation">

        <li><NavLink  to="/" exact>home</NavLink></li>
        { !props.token && <li><NavLink  to="/register">register</NavLink> </li> }
        { !props.token &&  <li><NavLink  to="/login">login</NavLink> </li>}
        { props.token && <li><NavLink  to="/profile">profile</NavLink> </li> }
        { props.token && <li><NavLink  to="/logout">Logout</NavLink> </li> }


    </ul>
)
const mapStateToProps = state =>{
    return {
        token : state.auth.token
    }
}
export default connect(mapStateToProps)(navigation)