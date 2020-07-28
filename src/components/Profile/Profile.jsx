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


const UPDATE_USER = gql` 
    mutation updateUser($input : postUpdate){
      updateUser (input : $input){
          name
          about
      }
    }
  
`   



const Profile = (props)=> {
 
  const [name, setName]= useState(props.user.name || '')
  const [about, setAbout]= useState(props.user.about || '')
  const [showButton, setShowButton]= useState(false)




  const [update_user, {loading }] = useMutation(UPDATE_USER, {
    update : ( proxy, {data})=>{
      console.log(data.updateUser)
      props.onUpdateProfile(data.updateUser)
    } 
  })

  const classes = useStyles();
  
  
  const nameChangeHandler = (e)=>{
    setShowButton(true)
    setName(e.target.value)
  }
  const aboutChangeHandler = (e)=>{
    setShowButton(true)

    setAbout(e.target.value)
  }

 

  const formSubmitHandler = (event)=>{
    event.preventDefault()
    toast.success(`Profile Updated`,{
      autoClose: 2000
    });
    setShowButton(false)
    update_user({variables : {input : {name , about} }})

  }
  
  
  
  
  return (
    <Container fixed className="Profile">
        <Typography color="primary" variant="h6">Update Profile Information</Typography><br/><br/>
        <ToastContainer  />
        <form>
        <TextField required type="text" 
                   disabled
                   className={classes.input} 
                   label="User Name"
                   value={props.user.user_name}
        /><br/>
        <TextField required type="email" 
                    disabled
                    className={classes.input} 
                    label="Email"
                     value={props.user.email}
        /><br/>
        <TextField type="text" 
                   focused
                   className={classes.input}                   
                   onChange={(event)=>nameChangeHandler(event)}
                   label="Name"
                   value={name}
        /><br/>
        
          <TextField multiline type="text" variant = "outlined" 
                   className={classes.input} 
                   onChange={(event)=>aboutChangeHandler(event)}
                   label="About"
                   value={about}
        /><br/><br/>

        {/* <br/><Button variant="text" color="primary" style={{marginRight:"10px"}} onClick={props.formControl}><ArrowUpwardIcon/> {" "} Top</Button> */}
        <Button variant="contained" disabled={!showButton} color="primary" onClick={formSubmitHandler}>Update Profile</Button>
        </form><br/>
        <div className="Top">
        <Button variant="text" color="primary" style={{marginRight:"10px"}} onClick={props.formControl}><ArrowUpwardIcon/></Button><br/>
        </div><br/>
        <hr/>

    </Container>
  )
}

const matDispatchToProps = dispatch =>{
  return{
    onUpdateProfile : (user)=>dispatch(action.updateProfile(user))
  }
}


export default connect(null, matDispatchToProps)(Profile)