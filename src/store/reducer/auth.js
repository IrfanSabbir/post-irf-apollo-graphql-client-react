import * as actionTypes from '../action/actionTypes'

const initialState ={
    token :null,
    user:{
        user_id : null,
        email : null,
        user_name : null,
        name : null,
        images : [],
        about:''
    },
    search:''
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                user:action.user
            }
        case  actionTypes.LOG_OUT:
            return{
                ...state,
                token:null,
                user:{
                    user_id : null,
                    email : null,
                    user_name : null,
                    name : null,
                    images : [],
                    about:''
                }
            } 
            
        case actionTypes.UPDATE_PROFILE:
            return{
                ...state,
                user:{
                    ...state.user,
                    name:action.name,
                    about:action.about
                }
            } 
            case actionTypes.USER_INFO:
                
                return{
                    ...state,
                    user:{
                        ...state.user,
                        images:action.images
                    }
                } 
            case actionTypes.SEARCH:
                return{
                    ...state,
                    search:action.search
                }           
        default :
         return state    
    }
}

export default reducer
