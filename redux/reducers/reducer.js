import {
    GET_ACTIVITY,
    ADD_TO_ACTIVITY_LIST,
    REMOVE_FROM_ACTIVITY_LIST
  } from '../actions/actions'
  
  const initialState = {
    activity: []
    // bookmarks: []
  };
  
  function activityReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ACTIVITY:
        return { ...state, activity: action.activity };
      case ADD_TO_ACTIVITY_LIST:
        return { ...state, activity: [...state.activity, action.activity] };
    //   case REMOVE_FROM_ACTIVITY_LIST:
    //     return {
    //       ...state,
    //       activity: state.activity.filter(book => book.id !== action.payload.id)
    //     };
      default:
        return state;
    }
  }
  
  export default activityReducer;