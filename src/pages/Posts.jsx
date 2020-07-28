import React, { useState, useEffect ,useContext } from 'react';
import { useQuery, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Post from '../components/posts/post'
import Slider from '../components/Slider/Slider'
import { All_Post , Post_Count } from '../graphql/query'
import {Post_Added , Post_Updated , Post_Deleted} from '../graphql/subscription'
import { connect} from 'react-redux'
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';





const Home = (props) => {
  const [page, setPage ] = useState(1)
  const  [search , setSearch] = useState(props.search || '')
   const [countPost , setCount ] = useState(0)
   const classes = useStyles();
   const  {data :count } = useQuery(Post_Count)
   const { data, loading, error } = useQuery(All_Post , {
    variables:{page ,search:props.search}
  });
   
  const {data:newPost} = useSubscription(Post_Added , {
    onSubscriptionData : async ({client :{cache}, subscriptionData :{data}})=>{
      //read from cache
      const {allPosts} = cache.readQuery({
        query:All_Post,
        variables:{page ,search:props.search}
      })

      //write into cache
      cache.writeQuery({
        query:All_Post,
        variables: {page ,search:props.search},
        data :{
          allPosts : [data.postAdded , ...allPosts]
        }
      })

      //update all posts
      fetchPosts({
        variables:{page ,search:props.search},
        refetchQueries : [{query :All_Post }]
      })

      //toast notification
      toast.success("New post Added")
      
    }
  })
  
  const {data : updatePost } = useSubscription(Post_Updated , {
    onSubscriptionData : ()=>{
      console.log("here")
      toast.success("Post updated")
    }
  })

  const { data: deletedPost } = useSubscription(Post_Deleted, {
    onSubscriptionData: async ({ client: { cache }, subscriptionData: { data } }) => {
      console.log(data)
      // readQuery from cache
      const { allPosts } = cache.readQuery({
        query:All_Post,
        variables:{page ,search:props.search}
      });
      console.log(data.postDeleted.post_id)

      let filteredPosts = allPosts.filter((p) => p._id !== data.postDeleted.post_id);
      console.log(filteredPosts)
      
      // write back to cache
      cache.writeQuery({
        query:All_Post,
        variables:{page ,search:props.search},
        data: {
          allPosts: filteredPosts
        }
      });
      fetchPosts({
        variables:{page ,search:props.search},
        refetchQueries : [{query :All_Post }]
      })
    }
  })

  const [fetchPosts , { data: posts } ] = useLazyQuery(All_Post)
   
   useEffect(()=>{
     setCount(count ? count.countPost : 0)
    },[count])
    
 
   let history = useHistory();

  const pageHandler= (e,p)=>{
    e.preventDefault()
    setPage(p)
  }
  if (loading) return <p>Loading...</p>;

  return (
    <div>
    
      <Container fixed style={{ marginTop:"20px" }}>
        
      <Slider/><br/>
        <hr />
        { data && <Post posts={data.allPosts} count={countPost}/>}

        <br/><br/>
        <div className={classes.root} style={{float:"right"}}>
        <Pagination count={Math.ceil(countPost/3)} variant="outlined" shape="rounded"  onChange={(e , p)=>pageHandler(e ,p)}/>
        </div><br/><br/>
       <hr /><br/>
        {JSON.stringify(newPost)}
       <br/><br/><br/>
      </Container>
      </div>
  );
};
const mapStateToProps = state =>{
  return{
    search : state.auth.search
  }
}
export default connect(mapStateToProps)(Home);


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));