import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux'
import './Profile.css'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'

import * as action from '../../store/action/index'


const useStyles = makeStyles({
  input: {
      width: '60%',
      paddingBottom:"20px"
  },
  about: {
    width: '60%',
    height:'40%',
    paddingBottom:"20px"
},

})


const CHANGE_PASS = gql` 
    mutation uppateUserPass($input : postUpdatePassword!){
      uppateUserPass (input : $input){
        _id
      }
    }
  
`   



const Password = (props)=> {
 
  const [prevPass, setprevPass]= useState('')
  const [newPass, setNewPass]= useState('')
  const [confirmPass, setConfirmPass]= useState('')
  const [showButton, setShowButton]= useState(false)




  const [change_pass, {loading }] = useMutation(CHANGE_PASS, {
    update : ( proxy, {data})=>{
      console.log(proxy)
      console.log(data)
    //   props.onAuth(data.userCreate.user, data.userCreate.token)
    } 
  })

  const classes = useStyles();
  
  
  const prevPassHandler = (e)=>{
    setprevPass(e.target.value)
  }
  const newPassHandler = (e)=>{
    setNewPass(e.target.value)
  }
  const confirmPassHandler = (e)=>{
    setShowButton(true)
    setConfirmPass(e.target.value)
  }
 

  const formSubmitHandler = (event)=>{
    event.preventDefault()
    toast.success(`Profile Updated`,{
      autoClose: 2000
    });
    
    change_pass({variables : {input : { oldPass:prevPass, newPass:newPass , confirmNewPass:confirmPass} }})
    setShowButton(false)

  }
  
  
  
  
  return (
    <Container fixed className="Profile">
        <Typography color="primary" variant="h6">Update Password</Typography><br/><br/>
        <ToastContainer/>
        <form>
        <TextField required type="password" 
                   focused
                   className={classes.input} 
                   onChange={(event)=>prevPassHandler(event)}
                   label="Previous Password"
                   placeholder="previous password"
        /><br/>
        <TextField required type="password" 
                    className={classes.input} 
                   onChange={(event)=>newPassHandler(event)}
                    label="New Password"
                    placeholder="new password"
        /><br/>
        <TextField type="password" 
                  
                   className={classes.input}                   
                   onChange={(event)=>confirmPassHandler(event)}
                   label="Name"
                   placeholder="confirm new password"

        /><br/>
        
          

        {/* <br/><Button variant="text" color="primary" style={{marginRight:"10px"}} onClick={props.formControl}>Back to Top</Button> */}
        <Button variant="contained" disabled={!showButton} color="secondary" onClick={formSubmitHandler}>Change Password</Button>
        </form><br/>
        <div className="Top">
        <Button variant="text"  color="primary" style={{marginRight:"10px"}} onClick={props.formControl}><ArrowUpwardIcon/></Button><br/>
        </div>
        
        <br/><hr/>
        
    </Container>
  )
}

const matDispatchToProps = dispatch =>{
  return{
    onAuth : (user, token)=>dispatch(action.auth_start(user, token))
  }
}


export default connect(null, matDispatchToProps)(Password)