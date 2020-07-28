import {gql} from 'apollo-boost'

import { Post_Info } from './fragment'

export const Post_Added = gql`
subscription {
    postAdded{
        ...post_info
    }
  }
  ${Post_Info}

`

export const Post_Updated = gql`
subscription {
  postUpdated{
        ...post_info
    }
  }
  ${Post_Info}

`
export const Post_Deleted = gql`
subscription {
    postDeleted{
      post_id
    }
  }

`