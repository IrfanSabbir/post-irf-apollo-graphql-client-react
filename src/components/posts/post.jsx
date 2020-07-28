import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {CardHeader, Avatar ,IconButton , CardMedia , CardActions} from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyle = makeStyles((theme)=>({
   
    media: {
        // height: "auto",
        height:"70%",
        width:"70%"
        // paddingTop: '80.99%', // 16:9
      },
    avatar: {
    backgroundColor: red[500],
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        backgroundColor :'red'
        },
    
    root:{
        // display:'flex',
        textAlign:'center',
        justifyContent:'center',
        flexGrow:1,
        width:'70%',

    }
}))

const Post = (props)=>{
    const classes = useStyle()
    let post = <Paper> Loading Posts ....</Paper>
    if(props.posts.length>=1){
        post = props.posts.map(post=>{
            return(
               <Card key={post._id}>
                   <Paper  style={{marginBottom:"10px"}}>
                   <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.creator[0]}
                    </Avatar>
                    }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={post.creator}
                        subheader={post.craeted_at}
                    />
                     <CardContent>
                        <Typography variant="body1" color="textPrimary" >
                           {post.content}
                        </Typography>
                    </CardContent>
                   { post.image.url && <img
                       
                        className={classes.media}
                        src={post.image.url}
                        alt={post._id}
                    />}
                   
                    <CardActions >
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                        
                    </CardActions>
                    </Paper>
                    <br/><br/><br/>
               </Card> 
            )
        })
    }
    return(

        <Container fixed className={classes.root}>
            {post}
        </Container>
    )
}
export default Post