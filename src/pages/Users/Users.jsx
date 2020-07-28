import React from 'react'
import {Container , Card , CardActionArea, CardContent,CardActions,Typography} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import{gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import {NavLink} from 'react-router-dom'


const All_User = gql`{
    allUser{
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

    const {data , loading ,error} = useQuery(All_User)
    
    if(loading)return<p>Loading.........</p>

    return(
        <Container fixed  style={{marginTop :"20px"}}>
                <Grid container spacing={3}>
                { data && data.allUser.map(user=>{
                    return (
                        <Grid item  xs={12} sm={6} lg={4} key={user.user_name}>
                            <Card >
                                <CardActionArea>
                                    <CardContent>
                                            <Typography varient="body1" color="primary">{ user.name}</Typography>
                                                <img
                                                    height="200px"
                                                    src={user.images[0].url}
                                                    alt={user.user_name}
                                                />
                                            
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                  
                                    <NavLink to ={ `/user/${user.user_name}`} exact style={{ textDecoration:"none", color:"blue" }}>
                                         
                                            {user.user_name} 
                                        
                                    </NavLink>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }) 
            }
            </Grid>
        </Container>
    )
}

export default User