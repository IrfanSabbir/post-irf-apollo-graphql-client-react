import * as actionTypes from './actionTypes'

export const auth_success =(user, token)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        user:user,
        
    }
}

export const logout = ()=>{
 
    localStorage.removeItem('name')
    localStorage.removeItem('about')
    localStorage.removeItem('token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('email')
    localStorage.removeItem('user_id')
    // localStorage.removeItem('images')


    return{
        type:actionTypes.LOG_OUT
    }
}

// export const auth_time_out = (expiresIn)=>{
//     const time = new Date(expiresIn).getTime()-new Date().getTime()
//     return dispatch =>{
//         setTimeout(()=>{
//             dispatch(logout())
//         },time)
//     }
    
// }


export const auth_start = (user, token)=>{
    return dispatch =>{
        // const myImage =[]
        // const images = JSON.stringify(user.images)
        // user.images.map(image=>{
        //     const i ={
        //         url :image.url,
        //         public_id:image.public_id
        //     }
        //     myImage.push(i)
        //     return images
        // })
        

        localStorage.setItem('name',user.name)
        localStorage.setItem('about',user.about)
        localStorage.setItem('token',token)
        localStorage.setItem('user_name', user.user_name)
        localStorage.setItem('email', user.email)
        localStorage.setItem('user_id', user._id)
        // localStorage.setItem('images',  JSON.stringify(user.images))

        const user_info = {user_id : user._id, user_name:user.user_name, name: user.name , email: user.email , images : user.images , about:user.about}
        dispatch(auth_success(user_info, token))
    }
}

export const auth_check = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }
        else{
            
            const name = localStorage.getItem('name')
            const user_name = localStorage.getItem('user_name')
            const email = localStorage.getItem('email')
            const _id = localStorage.getItem('user_id')
            const files = localStorage.getItem('images')
            const about = localStorage.getItem('about')



            const images = JSON.parse(files)


        const user_info = {user_id : _id, user_name:user_name, name: name , email:email , images :images , about:about}
            
            // const user = {_id, name , email, user_name, images}


               dispatch(auth_success(user_info, token))
        }

    }
} 

export const updateProfile = (user)=>{
    localStorage.removeItem("name")
    localStorage.removeItem("about")
    localStorage.setItem('name',user.name)
    localStorage.setItem('about',user.about)

    return {
        type:actionTypes.UPDATE_PROFILE,
        name:user.name,
        about:user.about
    }


}

export const user_info = (images)=>{

        // localStorage.setItem('images',  JSON.stringify(user.images))
        // const user_info = {user_id : user._id, user_name:user.user_name, name: user.name , email: user.email , images : user.images , about:user.about}
          
    return {
        type:actionTypes.USER_INFO,
        images:images
    }


}


export const search = (search)=>{
    return {
        type:actionTypes.SEARCH,
        search:search
    }
}