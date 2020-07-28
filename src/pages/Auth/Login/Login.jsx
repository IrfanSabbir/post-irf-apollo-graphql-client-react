import React ,{useContext, useState} from 'react'
import {connect} from 'react-redux'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import {  useHistory } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify'

import {gql } from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'

import * as action from '../../../store/action/index'

const USER_LOGIN = gql`
mutation userLogIn($input : PostLogin!){
    userLogIn (input : $input){
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

const useStyles = makeStyles({
    input: {
        width: '60%',
        paddingBottom:"20px"
    }
  })

  
const Login = (props)=>{
    const [email, setEmail]= useState('')
    const [password, setpassword]= useState('')
     

    const [user_login] = useMutation(USER_LOGIN , {
      update : (prefix , {data})=>{
        console.log(data.userLogIn.user)
        props.onAuth(data.userLogIn.user, data.userLogIn.token)
      }
    })

        const classes = useStyles();
        let history = useHistory();
        const emailChangeHandler = (e)=>{
            setEmail(e.target.value)
          }
          const passwordChangeHandler = (e)=>{
            setpassword(e.target.value)
          }

          const values  ={ email , password}

      //   const googleLogin = () => {
      //       auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      //           const { user } = result;
      //           const idTokenResult = await user.getIdTokenResult();
      //            console.log(result)
      //           dispatch({
      //               type: 'LOGGED_IN_USER',
      //               payload: { email: user.email, token: idTokenResult.token }
      //           });
    
      //           // send user info to our server mongodb to either update/create
      //           toast.success("login complete");
      //           history.push('/');
      //       });
        
      //  }

    
    const loginHandler = (event)=>{
    event.preventDefault()
    toast.success(`completing login....`)
    user_login({variables : {input : values }  })
    // create_user({variables : {input : values }})

    // console.log(user)
  }
    return(
        <Container fixed style={{marginTop:"30px"}}>
            <ToastContainer/>
            <TextField required type="email" 
                   className={classes.input} 
                   onChange={(event)=>emailChangeHandler(event)}
                    label="Email"
                     placeholder="enter you mail..."
            />
             <TextField required type="password" 
                   className={classes.input} 
                   onChange={(event)=>passwordChangeHandler(event)}
                   label="password"
                   placeholder="********"
            />
            <br/>
        <Button variant="contained" color="primary" onClick={loginHandler}>Login</Button>
        
        </Container>
    )
}

const matDispatchToProps = dispatch =>{
  return{
    onAuth : (user, token)=>dispatch(action.auth_start(user, token))
  }
}

export default connect(null, matDispatchToProps)(Login)