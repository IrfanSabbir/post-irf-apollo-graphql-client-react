import React , {useState, useEffect} from 'react'
import { TextField, Typography , Paper , Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {connect} from 'react-redux'
import {gql} from 'apollo-boost'
import { Post_Info} from '../../graphql/fragment'
import { Post_Auth_User } from '../../graphql/query'
import {useMutation , useQuery}  from '@apollo/react-hooks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthUserPost from '../../components/posts/PostByUser'


const Create_Post = gql`
mutation createPost($input : PostInput!){
    createPost(input:$input){
        ...post_info
    }
}
${Post_Info}
` 


const useStyles = makeStyles({
    input: {
        width: '40%',
        paddingBottom:"20px"
    },
  
  })
  
  


const Post = props=>{
    
    const [content, setContent] = useState('')
    const [image , setImage ] = useState({})
    const [showButton , setShowButton] = useState(true)
    const [showSubPost , setShowSubPost] = useState(true)
    const classes = useStyles();
    
    const {data , loading, error} = useQuery(Post_Auth_User)

    // useEffect(()=>{
    //     console.log("reload")
    //     setShowSubPost(false)
    // },[data])  
    
    const [create_post] = useMutation(Create_Post , {
        update:(cache, {data : {createPost}})=>{
            toast.success(`You have successfully posted`,{
                autoClose: 2000
              });
             
            const { authUserPost } = cache.readQuery({
                query:Post_Auth_User
            })
            cache.writeQuery({
                query:Post_Auth_User,
                data :{
                    authUserPost :[createPost , ...authUserPost]
                }
            })
        },
        variables:{input :{content, image}}
    })

    if(loading)return<p>Loading.....</p>

    const createPostHandler =(e)=>{
        e.preventDefault()
        create_post()
    }

    const contentHandler = (e)=>{
        setContent(e.target.value)
        setShowButton(false)
    }
    const fileResizeAndUpload = (event)=>{
        setShowButton(true)

        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                  axios.post(process.env.REACT_APP_RSET_URI + 'post_image', {image:uri},
                  {
                    headers:{
                        'Authorization':`Bearer ${props.token}`
                     }
                  })
                  .then(result=>{
                      console.log(result.data)
                      setImage(result.data)
                      setShowButton(false)

                    //   console.log(image)
                  })
                },
                'base64'
            );
        }
    }

    return(
        <div style={{ marginTop:"20px"}}>
          <ToastContainer  />

            {content && <Paper variant="outlined" color="primary">
               <Typography variant="body2" color="textSecondary" >Review post:</Typography><br/>
                <Typography variant="h6" color="primary">{ content }</Typography>
               {image.url &&  <div>
                    <Typography variant="body2" color="textSecondary" >Review Image:</Typography><br/>
                    <img src={image.url}/>

                </div>
                }

            </Paper>}
            
            <hr/>
            <Typography variant="h5" color="primary">Share you day</Typography>
            <TextField required multiline type="text" 
                   
                   autoFocus
                   className={classes.input} 
                   onChange={(event)=>contentHandler(event)}
                   label="Your thought's"
                   placeholder="I am feeling cool...."
        />
         <br/>
               
                <TextField type="file" 
                    className={classes.input} 
                    onChange ={fileResizeAndUpload}
                    label="select file"
                > Choose an image
                </TextField><br/><br/>

             <Button variant="outlined"  disabled={showButton} color="primary" onClick={createPostHandler}>Post</Button> 
             <br/><br/>

        <hr/>
        {showSubPost &&data.authUserPost && <AuthUserPost posts={data.authUserPost}/>}
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        token : state.auth.token
    }
}
export default connect(mapStateToProps)(Post)