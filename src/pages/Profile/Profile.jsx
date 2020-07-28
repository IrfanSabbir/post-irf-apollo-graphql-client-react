import React, {useState, useRef,useMemo } from 'react'
import {connect} from 'react-redux'
import * as action from '../../store/action/index'
import "./Profile.css"
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ProfileUpdate from '../../components/Profile/Profile'
import PasswordUpdate from '../../components/Profile/Password'
import ProfileImage from '../../components/Profile/ProfileImage'
import omitDeep from 'omit-deep'
import {Link , animateScroll as scroll} from 'react-scroll'

import { gql } from 'apollo-boost'
import {useLazyQuery, useQuery} from '@apollo/react-hooks'
const UserInfo = gql`
   {
    userInfo{
        _id
        name
        user_name
        email
        about
        images{
          url
          public_id
        }
      }
   }
`

const Profile = (props)=>{
    const [images , setImages] = useState([])
    const [profile , setProfile] = useState("https://via.placeholder.com/200x200.png?text=Profile")
     
    let name = props.user.name
    if(!name){
        name = props.user.user_name
    }
     
    const { data, loading } = useQuery(UserInfo);
  
    
    const scrollToTop= ()=> {
        scroll.scrollToTop();
    }
    
    useMemo(() => {
        if (data) {
            const images = omitDeep(data.userInfo.images , ['__typename'])
            console.log(images)
            if(images[0]){
                setProfile(images[0].url)
            }
            setImages(images)
           
        }
    }, [data]);

    if(loading){
        return(<p>Loading.......</p>)
    }
    
    return(
        // <div className="Profile">

          <Container style={{marginTop:"30px",height:"1000px"}}>
             <img src={profile} height="300px" width="300px" style={{borderRadius:"50%", border:"5px solid white", boxShadow:"15px 5px grey"}} /> <br/>
             
            
            <Typography variant="h4" color="primary"> {name}</Typography>
            <Typography variant="body1" color="textPrimary">Contact: </Typography> <Typography variant="body1" color="textPrimary">Email :{props.user.email}</Typography><br/>
            
            <Typography variant="body2" color="primary"> About You:</Typography>  <Typography variant="body2" color="primary">{props.user.about}</Typography>
            
           
             <br/>
              <ProfileImage images={images} /><br/>
              {/* <Button variant="contained"  color="primary" onClick={openFormHandler} style={{marginRight:"10px"}}>Update Profile</Button>
             <Button variant="contained" color="secondary" onClick={ openPassFormHandler }>Update Password</Button><br/>  */}
               <Button variant="text" color="secondary"  style={{marginRight:"10px"}}>
              <Link
                to="updateProfile"
                spy={true}
                smooth={true}
                hashSpy={true}
                
                isDynamic={true}
            >Update Profile</Link></Button>
            <Button variant="text"  color="primary" >
                <Link
                to="updatePassword"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={500}

            >Update Password</Link> </Button>
             <br/> <br/>
                
            <div id="updateProfile"> <ProfileUpdate user={props.user} formControl = {scrollToTop}/> </div>
            
              <div id="updatePassword" ><PasswordUpdate user={props.user} formControl = {scrollToTop}/></div>

            <footer style={{height:"70px", backgroundColor:"rgb(100, 9, 136)", marginTop:"20px"}}></footer>  
            </Container>

        // </div> 
    )
}

const mapStateToProps = state =>{
    return{
        user:state.auth.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        OnUserInfo : (images)=>dispatch(action.user_info(images))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)