import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom';

import * as action from '../../../store/action/index'


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


const CREATE_USER = gql` 
    mutation userCreate($input : PostUser!){
      userCreate (input : $input){
        user{
          _id
          name
          user_name
          email
          images{
            url
            public_id
          }
          about
        }
        token
      }
    }
  
`   



const Signup = (props)=> {
  const [email, setEmail]= useState('')
  const [user_name, setUserName]= useState('')
  const [name, setName]= useState('')
  const [password, setpassword]= useState('')
  const [about, setAbout]= useState('')
  const [token,setToken]= useState('')

  localStorage.removeItem('token')
  const [create_user, {loading }] = useMutation(CREATE_USER, {
    update : ( proxy, {data})=>{
      console.log(proxy)
      console.log(data.userCreate.user)
      props.onAuth(data.userCreate.user, data.userCreate.token)
    } 
  })

  const classes = useStyles();
  
  const emailChangeHandler = (e)=>{
    setEmail(e.target.value)
  }
  const userNameChangeHandler = (e)=>{
    setUserName(e.target.value)
  }
  const nameChangeHandler = (e)=>{
    setName(e.target.value)
  }
  const passwordChangeHandler = (e)=>{
    setpassword(e.target.value)
  }
  const aboutChangeHandler = (e)=>{
    setAbout(e.target.value)
  }

  const values = { email, user_name , name, password , about}
  const formSubmitHandler = (event)=>{
    event.preventDefault()
    toast.info(`completing signup....`);
    
    create_user({variables : {input : values }})

    // console.log(user)
  }
  
  
  
  
  return (
    <Container fixed style={{ marginTop:"20px" }}>
        
        <Typography color="primary" variant="h6">Continue register</Typography>
        <hr/>
        <ToastContainer/>
        <form>
        <TextField required type="text" 
                   autoFocus
                   className={classes.input} 
                   onChange={(event)=>userNameChangeHandler(event)}
                   label="User Name"
                   placeholder="user_123"
        />
        <TextField required type="email" 
                   className={classes.input} 
                   onChange={(event)=>emailChangeHandler(event)}
                    label="Email"
                     placeholder="enter you mail..."
        />
        <TextField type="text" 
                   className={classes.input}                   
                   onChange={(event)=>nameChangeHandler(event)}
                   label="Name"
                   placeholder="Jon Doe"
        />
         <TextField required type="password" 
                   className={classes.input} 
                   onChange={(event)=>passwordChangeHandler(event)}
                   label="password"
                   placeholder="********"
        />
          <TextField multiline type="text" variant = "outlined" 
                   className={classes.input} 
                   onChange={(event)=>aboutChangeHandler(event)}
                   label="About"
                   placeholder="say somthing about you.."
        />

        <br/><Button variant="contained" color="secondary" onClick={formSubmitHandler}>Continue</Button>
        </form>
        
    </Container>
  )
}

const matDispatchToProps = dispatch =>{
  return{
    onAuth : (user, token)=>dispatch(action.auth_start(user, token))
  }
}


export default connect(null, matDispatchToProps)(Signup)