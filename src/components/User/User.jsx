import React from 'react'
import {useParams} from 'react-router-dom'
import{gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import Content from '../Slider/Content'

import {Container , Card , Avatar,CardActionArea, CardContent,CardActions,Typography, CardMedia, CardHeader} from '@material-ui/core'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Single_User = gql`
    query singleUser($user_name : String!){
        singleUser(user_name : $user_name){
            name
            user_name
            about
            images{
                url
            }     
        }
    }

`
 const User = (props)=>{
     const params = useParams()

     const {data, loading }= useQuery(Single_User, {
         variables:{user_name :params.user_name}
     })

     const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        cssEase: "linear"
      }

    if (loading) return <p>Loading...</p>;

     return(
         <Container style={{marginTop:"20px"}}>
            <Card >
                <CardActionArea>
                    <CardContent>
                        <CardHeader
                           
                            title={data.singleUser.user_name}
                        />
                         <Slider {...settings}>
                             {data.singleUser.images && data.singleUser.images.map(({url})=>{
                                 return(
                                 <div key={url}>
                                     <Content image ={url}/>
                                
                                 </div>
                                 )
                             })}
                         </Slider><br/><br/>
                        <Typography varient="h6" color="primary">{"name : " + data.singleUser.name}</Typography>
                        </CardContent>

                </CardActionArea>
                <CardContent>
                <Typography varient="body2" color="textPrimary">{ data.singleUser.about}</Typography>
                </CardContent>
            </Card>
         </Container>
     )
 }

 export default User
