import {gql} from 'apollo-boost'

import { Post_Info } from './fragment'

export const All_Post = gql`
    query allPosts($page :Int! , $search:String){
        allPosts(page: $page , search:$search){
            ...post_info
        }
    }
    ${Post_Info}
`

export const Post_Auth_User = gql`
     query {
        authUserPost{
            ...post_info
        } 
     }
     ${Post_Info}
`

export const Post_Count = gql`
{
    countPost
}
`