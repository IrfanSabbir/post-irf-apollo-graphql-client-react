import React , {useEffect ,useMemo, useState} from 'react'

import {Container , Card , CardActionArea, CardContent,CardActions,Typography} from '@material-ui/core'
import {Grid , Button ,TextField} from '@material-ui/core'
import {gql} from 'apollo-boost'
import { useMutation} from '@apollo/react-hooks'
import Modal from '../Modal/Modal'
import { NavLink } from 'react-router-dom'
import UpdateProfile from './UpdatePost'

const DELTE_POST = gql`
   mutation deletePost($post_id : ID!){
       deletePost(post_id : $post_id){
           post_id
       }
   }
` 


const PostByUser = (props)=>{
  const [post , setPost] = useState({})  
  const [posts , setPosts] = useState([])
  const [openModal , setOpenModal] = useState(false)

   const [delte_post] = useMutation(DELTE_POST ,{
    update: (cache , {data : {deletePost:{post_id}}})=>{

        const newArray = []
         posts.map(post => {
            if(post._id !== post_id){
                newArray.push(post)
            }
            return post
        })
        setPosts(newArray)
    }
})

useEffect(()=>{
        setPosts(props.posts)
},[props.posts])

const openModalHandler = (post)=>{
    setPost(post)
    setOpenModal(true)
}
const cancleModalHandler = ()=>{
    console.log("here clicked")
    setOpenModal(false)
}

const deletePostMutation = (_id)=>{
    delte_post({variables :{post_id:_id}})
}

let modal= null
if(openModal){
    modal = <Modal cancleModal={cancleModalHandler} >
            <UpdateProfile 
                 post={post}
                 cancleModal={cancleModalHandler}
                 />
    
         </Modal>
}



    return(
        <Container fixed  style={{marginTop :"20px"}}>
                {modal}
                <Grid container spacing={3}>
                {posts.map(post=>{
                    return (
                        <Grid item  xs={12} sm={6} lg={4} key={post._id}>
                            <Card >
                                <CardActionArea>
                                    <CardContent>
                                            <Typography varient="body1" color="primary">{ post.content}</Typography>
                                            {post.image.url && <img
                                                height="200px"
                                                src={post.image.url}
                                                alt={post.image.url}
                                            />}
                                        
                                    </CardContent>
                                </CardActionArea>
                               
                            <Button color="primary" style={{margin:"10px"}} onClick={ ()=>openModalHandler(post) }>Edit</Button>
                            
                            <Button  color="secondary" onClick={()=>deletePostMutation(post._id) }>Delete</Button>
                            <br/>
                            </Card>


                        </Grid>
                    )
                }) 
            }
            </Grid>
        </Container>
    )
}

export default PostByUser