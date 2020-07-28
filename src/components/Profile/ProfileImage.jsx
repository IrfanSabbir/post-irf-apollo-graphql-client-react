import React ,{useState, useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import * as action from '../../store/action/index'
import {Typography , Grid , Container, Paper , TextField , Button} from '@material-ui/core'




const ProfileImage = (props)=>{
    const [files, setFiles] = useState(props.image)
    const [newfile, setNewFile] = useState()
    const [showButton, setShowButton]= useState(true)

    useEffect(()=>{
        setFiles(props.images)
    },[props.images])

    const fileResizeAndUpload = (event)=>{
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
                    setShowButton(false)
                    setNewFile(uri)
                },
                'base64'
            );
        }
    }



    const uploadFileHandler = (e)=>{
        e.preventDefault()
        
        axios.post(process.env.REACT_APP_RSET_URI + 'uploadImages' , {image:newfile},
        {
             headers:{
               'Authorization':`Bearer ${props.token}`
            }
       })
        .then(result =>{
            // const token = props.token
            const image ={
                url :result.data.url,
                public_id:result.data.public_id
            }
            
            let newImageArray =[...files]
            newImageArray.push(image)
            console.log(newImageArray)
            setFiles(newImageArray)
         
        })
        .catch(err=>{
            console.log(err)
        })

    }


    const handleImageRemove = (id) => {
        axios.post(
                `${process.env.REACT_APP_RSET_URI}removeimage`,
                {
                    public_id: id
                },
                {
                    headers:{
                        'Authorization':`Bearer ${props.token}`
                     }
                }
            )
            .then((response) => {
               
                let filteredImages = files.filter((item) => {
                    return item.public_id !== id;
                });
                setFiles(filteredImages)
            })
            .catch((error) => {
                
                console.log(error)
            })
    }

        let images =[]
        if(files){

             images = files.map(image=>{
                return(
                    
                    <img  src ={image.url} 
                            key={image.public_id} 
                            onClick={()=>handleImageRemove(image.public_id)}
                            style={{height:"200px", width:"200px" , margin:"5px" , border:"3px solid black"}}
                            />
                    
                    )
                })
                
            }
    return(
        <Container fixed>
            <Paper variant="outlined" >
                <Typography variant="h6" style={{color:"green", float:"left", marginLeft:"20px" }}>Images</Typography><br/>
                <Grid  container spacing={3} style={{padding:"10px"}}>
                    <Grid item xs={12}  lg={8} >
                        <div style={{height:"auto"}} >
                        <Typography>showing all images</Typography>
                           {images}
                        </div>
                    </Grid>
                    <Grid item xs={12}  lg={4} >
                        <Paper variant="outlined" >
                              <Typography>Upload new Image</Typography>
                              <TextField type="file" 
                              onChange ={fileResizeAndUpload}
                              label="select file"
                              >
                                  select
                              </TextField><br/><br/>
                              <Button variant="outlined"  disabled={showButton} color="primary" onClick={uploadFileHandler}>Upload</Button><br/><br/>
                        </Paper>

                    </Grid>
                </Grid><br/>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state =>{
    return{
        // images :state.auth.user.images,
        user_id : state.auth.user.user_id,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        OnUserInfo : (images)=>dispatch(action.user_info(images))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage)
