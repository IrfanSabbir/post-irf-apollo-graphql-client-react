import React, { useEffect } from 'react';
import {Switch, Route , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';
//apollo setup
// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
// gql
import { gql } from 'apollo-boost';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import {ApolloProvider} from '@apollo/react-hooks'



import Post from './pages/Posts'
import Toolbar from './components/Toolbar/Toolbar'
import Layout from './pages/Layout/Layout.jsx'
import Signup from './pages/Auth/Signup/Signup.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import Logout from './pages/Auth/Logout/Logout'
import Profile from './pages/Profile/Profile.jsx'
import Users from './pages/Users/Users.jsx'
import User from './components/User/User.jsx'
import CreatePost from './pages/Posts/Create.jsx'
import * as action from './store/action/index'



// const client =new ApolloClient({
//   uri:process.env.REACT_APP_GRAPHQL_URI,
//   request: (operation) => {
//     const token = localStorage.getItem('token')
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     })
//   }
// })

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_URI,
  optioons :{
    reconnect: true
  }
})
//http set up
const httpLink = new HttpLink({
  uri:process.env.REACT_APP_GRAPHQL_URI,
})
//authrization header setup
const authLink = setContext (()=>{
  const token = localStorage.getItem('token')
  return{
    headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
  }
})

//concat http link with authlink
const httpAuthLink = authLink.concat(httpLink) 

//use split to split http link or websocket link
const link = split(
  // split based on operation type
  ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpAuthLink
)

const client = new ApolloClient ({
 cache : new InMemoryCache(),
 link
})
const App= (props)=> {
   //web socket setup


  useEffect(()=>{
    props.onAuthCheck()
  })

  let route = null
  if(!props.token){
      route =   <Switch>
                      <Route path="/user" exact component={Users} />

                      <Route path="/register"  component={Signup} />
                      <Route path="/login"  component={Login} />
                      <Route path="/user/:user_name" exact component={User} />
                      <Route path="/" exact component={Post} />
                    </Switch>
  }              
  if(props.token){
    route =   <Switch>
                <Route path="/logout" exact component={Logout} />
                <Route path="/profile" exact component={Profile} /> 
                <Route path="/user" exact component={Users} />
                <Route path="/user/:user_name" exact component={User} />
                {/* <Route path="/create_post/:post_id" exact component={UpdatePost} /> */}
                <Route path="/create_post" exact component={CreatePost} />
                <Route path="/" exact component={Post} />
                <Redirect to="/"/>
              </Switch>
  }           
  return (
    <div className="App">
      <ApolloProvider client={client}>
          {/* <Toolbar/> */}
          <Layout>
            {route}
          </Layout>
      </ApolloProvider>
    </div>
  )
}
const mapStateToProps = state =>{
 return {
   token : state.auth.token
} 
   
}

const mapDispatchToProps = dispatch =>{
  return {
    onAuthCheck : ()=>dispatch(action.auth_check()),
    onLogout : ()=>dispatch(action.logout())
  }  
 }
export default connect(mapStateToProps, mapDispatchToProps)(App);
