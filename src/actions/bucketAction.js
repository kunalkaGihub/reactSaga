import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";

import { ActionTypes } from "./types"


//get all buckets
export const fetchBuckets = (id) => {

  return async (dispatch)=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
   // const token = `Bearer ${localStorage.token}`
  //  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/core/bucket/${id}`,
  //  {
  //       'Authorization':  `Bearer ${localStorage.token}`
  //  })
    const response = await axios.get("https://fakestoreapi.com/products?limit=3");
    dispatch({
      type:ActionTypes.FETCH_BUCKETS, 
      payload: response.data
    })
  }
};

 //const addNote 
export const addBucket = (id, title, description) =>{
  //TODO: API call
  return async(dispatch)=>{
  const response = await axios.post(`https://fakestoreapi.com/products/`,
   {
    headers: {
      'Content-Type': 'application/json',
      //'auth-token': localStorage.getItem('token')
      // 'Example:auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
    },
    body: JSON.stringify({id, title, description}) //yeh hum body me bhej rhe hai
  });
    const note= await response.data;
    dispatch({
      type:ActionTypes.ADD_BUCKET,
      payload:{
        id: id,
        title:title,
        description:description
      }
    })
  }
}

export const deleteBucket = (id) => {

  return async (dispatch)=>{
    const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
    // {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'auth-token': localStorage.getItem('token')
    //     'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
    //   },
    // });
    console.log(response.data)
    dispatch({
      type:ActionTypes.DELETE_BUCKET,
      payload:{
        id: id,
        data:response.data
      }
    })
     dispatch(fetchBuckets)
  }
};


//edit bucket
     export const updateBucket = (id, title, description) =>{
        //TODO: API call
        return async (dispatch)=>{
        const response = await axios.put(`https://fakestoreapi.com/products/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            //'auth-token': localStorage.getItem('token')
            // 'Example:auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
          },
          body: JSON.stringify({id, title, description})
        });
        console.log(response.data)

        dispatch({
          type:ActionTypes.EDIT_BUCKET,
          payload:{
            id: id,
            title:title,
            description:description
          }
        })
      }
    }
    