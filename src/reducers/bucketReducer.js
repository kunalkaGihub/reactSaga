import { ActionTypes } from '../actions/types';

const initialState = {
    buckets:[],  
};


export const bucketsReducer = (state = initialState, { type, payload }) => {
  //const { id,data } = payload
  switch (type) {
    case ActionTypes.FETCH_BUCKETS:
        return { ...state, buckets: payload };
    
    case ActionTypes.DELETE_BUCKET:
      const newBuckets = state.buckets.filter((bucket)=>  { return bucket.id !== payload.id})
        return { ...state, buckets: newBuckets };
    
    case ActionTypes.EDIT_BUCKET:
       let newBuc = JSON.parse(JSON.stringify(state.buckets))
        for (let index = 0; index < newBuc.length; index++) {
          const element = newBuc[index];
          if(element.id === payload.id){
            newBuc[index].title = payload.title;
            newBuc[index].description = payload.description;
            break;
          }
        }
          return { ...state, buckets:newBuc };
    
    case ActionTypes.ADD_BUCKET:
      return{...state, 
        buckets:[ ...state.buckets,
          {   
              id:payload.id,
              title:payload.title,
              description:payload.description
          }
        ]
      }
    default:
      return state;
  }
};
