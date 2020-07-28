import {gql} from 'apollo-boost'

export const Post_Info = gql `
    fragment post_info on Post {
        _id
        content
        image{
          url
          public_id
        }
        creator
        craeted_at
        created_by
        like
        view
    }
`