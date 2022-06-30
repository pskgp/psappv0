import { CLEAR_DATA, USERS_DATA_STATE_CHANGE, USERS_ACTIVITY_STATE_CHANGE, USER_STATE_CHANGE } from '../actions/actions';

const initState = {
    currentUser: null
    // authError: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
       case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        
    //   case 'LOGIN_ERROR':
    //     console.log('login error');
    //     return {
    //       ...state,
    //       authError: 'Login failed'
    //     }
  
    //   case 'LOGIN_SUCCESS':
    //     console.log('login success');
    //     return {
    //       ...state,
    //       authError: null
    //     }
  
    //   case 'SIGNOUT_SUCCESS':
    //     console.log('signout success');
    //     return state;
  
    //   case 'SIGNUP_SUCCESS':
    //     console.log('signup success')
    //     return {
    //       ...state,
    //       authError: null
    //     }
  
    //   case 'SIGNUP_ERROR':
    //     console.log('signup error')
    //     return {
    //       ...state,
    //       authError: action.err.message
    //     }
        case CLEAR_DATA:
            return initialState
        default:
            return state
    }
  };
  
  export default authReducer;