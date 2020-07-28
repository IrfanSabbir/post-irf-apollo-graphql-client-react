import React ,{useState} from 'react'
import {Container ,Paper ,Button, Typography ,Grid , TextField} from '@material-ui/core'
import {connect}  from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'
import { Post_Info} from '../../graphql/fragment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update_post = gql `
  mutation updatePost($input : UpdatePost){
    updatePost(input : $input){
      ...post_info
    }
  }
  ${Post_Info}
`

const UpdateProfile = (props)=>{
  const [id , setId] = useState(props.post._id)
  const [content, setContent] = useState(props.post.content )
  const [image , setImage ] = useState(props.post.image )
  const [showButton , setShowButton] = useState(true)
  const classes = useStyles();
  
  const [update_post]= useMutation(Update_post)
  //  , {
  //   update:(cache , {data :{updatePost}})=>{
  //     console.log(updatePost)
  //     toast.success(`Post successfully updated`,{
  //       autoClose: 2000
  //     });
  //   },
  //   // variables:{input :{_id:props.post._id, fields:{ content, image}}}
  // })


  const contentHandler =(e)=>{
    setContent(e.target.value)
    setShowButton(false)
  }
  const fileResizeAndUpload =(event)=>{
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
                  const image ={
                    url:result.data.url,
                    public_id:result.data.public_id
                  }
                  setImage(image)
                  setShowButton(false)

                  console.log(image)
              })
            },
            'base64'
        );
    }
  }
  const updatePostHandler =(e)=>{
    e.preventDefault()
    console.log("error")
    console.log(id)
    console.log(content)
    const im = image

    delete im.__typename
    console.log(im)

    update_post({variables:{input :{_id:id, fields:{ content, image:im}}}})
    toast.success('Post Updated');

  }
  return(
    <Container style={{textAlign:'center'}}>
          <ToastContainer  />

       <Typography variant="h6" color="primary">Update your post</Typography><br/>
       <Grid container spacing={2}> 
        <Grid item sm ={12} md ={6} lg={6}>

        <Paper variant="elevation" color="primary" style={{width:"100%"}}>
            <Typography variant="h6" color="primary" width="100%">{ content }</Typography>
            {image.url && <img src={image.url}  width="80%"/>}
        </Paper>
        </Grid>
        <Grid item sm ={12} md ={6} lg={6}>

        <Paper variant="elevation" color="primary">
        <TextField required multiline type="text" 
              
          className={classes.input} 
          onChange={(event)=>contentHandler(event)}
          placeholder="post "
          value={content}
        />
         <br/>
               
                <TextField type="file" 
                    className={classes.input} 
                    onChange ={fileResizeAndUpload}
                    label="select file"
                > Choose an image
                </TextField><br/><br/>

             <Button variant="outlined"  disabled={showButton} color="primary" onClick={updatePostHandler}>Update</Button> 
             <br/><br/>
        </Paper>
        </Grid>

      </Grid> 
    </Container>
  )
}

const mapStateoProps = state =>{
  return {
    token:state.auth.token
  }
}

export default connect(mapStateoProps)(UpdateProfile)


const useStyles = makeStyles({
  input: {
      width: '80%',
      paddingBottom:"20px"
  },

})
