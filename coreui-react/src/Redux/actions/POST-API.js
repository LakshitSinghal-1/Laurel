import {LOGIN_DATA
       ,POST_PROJECT,POST_EVENT
       ,POST_STANDUP,POST_SPRINT_PLANNING
       ,POST_SPRINT_REVIEW,POST_SPRINT_RETRO
       ,AUTH_SIGN_IN,JWT_TOKEN} from "../actions/types"   
       



import config from "../../services/config.json"
import http from "../../services/httpService"
import { toast } from "react-toastify";
// import jwtToken from "../Store";
// var jwtToken=sessionStorage.getItem('jwt_token');
console.log("Before Login POST-API");
// if(jwtToken !== null){
// axios.defaults.headers.common.Authorization='Bearer ' + jwtToken;
// }
// console.log("POST-API",jwtToken);




export const post_Project = (projectData,jwt_token) => async (dispatch) => {
  try{
    const response = await http.post(`${config.BaseUrl}/v1/project`,projectData
    
    
    ,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: POST_PROJECT,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error(ex.response.data.message);
      }
    }
  };

  export const oauthGoogle = (postData,jwt_token) => async (dispatch) => {
    try{
    const response = await http.post(`${config.BaseUrl}/v1/user`,postData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })

    dispatch({
      type: AUTH_SIGN_IN,
      payload: response.data.Role,
    });
    dispatch({
        type: JWT_TOKEN,
        payload: response.data.jwt_token,
      });
    dispatch({
        type: LOGIN_DATA,
        payload: postData
      });
    
      if(response.status === 200){
        console.log(response.status);
        toast.success("Successfull Login");
      }
    // if (response.data.designation === 'Project Manager' || response.data.designation === 'Employee') {
      sessionStorage.clear();
      // sessionStorage.setItem('jwt_token', response.data.jwt_token);
    // }
    // axios.defaults.headers.common['Authorization'] = data.token;
    }
    
    catch(ex){
      if(ex.response && ex.response.status === '404'){
        console.log(ex.response.status);
        toast.success("Unsuccessfull Login");
      }
    }

  };

  export const post_Event = (eventData,project_id,jwt_token) => async (dispatch) => {
    try{
    const response = await http.post(`${config.BaseUrl}/v1/event/${project_id}`,eventData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: POST_EVENT,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error(ex.response.data.message);
      }
    }
   
  };
  export const post_Standup = (postData,project_id,jwt_token) => async (dispatch) => {
    try{
    const response = await http.post(`${config.BaseUrl}/v1/stand_up/${project_id}`,postData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
      console.log(response.status,"Hiiiiiiiiiiiiiiiiiiiii")
   
    dispatch({
      type: POST_STANDUP,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error(ex.response.data.message);
      }
    }
 };
  export const post_SprintPlanning = (postData,project_id,jwt_token) => async (dispatch) => {
    try{
    const response = await http.post(`${config.BaseUrl}/v1/sprint_planning/${project_id}`,postData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: POST_SPRINT_PLANNING,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error(ex.response.data.message);
      }
    }
  };
  export const post_SprintReview = (postData,project_id,jwt_token) => async (dispatch) => {
    try{
    const response = await http.post(`${config.BaseUrl}/v1/sprint_review/${project_id}`,postData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: POST_SPRINT_REVIEW,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error(ex.response.data.message);
      }
    }
  };
  export const post_SprintRetro = (postData,project_id,jwt_token) => async (dispatch) => {
    try{
    const response = await http.post(`${config.BaseUrl}/v1/sprint_retro/${project_id}`,postData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: POST_SPRINT_RETRO,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error(ex.response.data.message);
      }
    }
  };


