import {GET_PROJECTS,
        GET_PROJECT_DETAILS,GET_EVENTS,
        FIRST_EVENTS,GET_STANDUP,
        GET_SPRINT_PLANNING,
        GET_SPRINT_REVIEW,GET_SPRINT_RETRO,
        LOGOUT,GET_PROJECT_ID,GET_FIRST_ID,
        CHART_STANDUP,CHART_SPRINT_PLANNING,TEAM_MEMBERS,
        CHART_SPRINT_REVIEW,CHART_SPRINT_RETRO,CHART_STORIES} from "./types"

import {toast} from "react-toastify";
import config from "../../services/config.json";
import http from "../../services/httpService"

console.log("Before Login GET-API");






export const get_Projects = (jwt_token) => async (dispatch) => {
  try{
    const response = await http.get(`${config.BaseUrl}/v1/project`,
    {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${jwt_token}`,
      }
    })
    
    dispatch({
      type: GET_PROJECTS,
      payload: response.data.projects,
    })
    dispatch({
      type: FIRST_EVENTS,
      payload: response.data.events,
    })
    dispatch({
      type: GET_FIRST_ID,
      payload: response.data.project_id,
    })
    console.log(response.data)
    console.log(response)
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response && ex.response.status === 409){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };

export const get_ProjectsDetails = (jwt_token) => async (dispatch) => {
  try{
      const response = await http.get(`${config.BaseUrl}/v1/get_create_project`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${jwt_token}`,
          }
        })
      
      dispatch({
        type: GET_PROJECT_DETAILS,
        payload: response.data,
      });
      console.log(response.data)
    }
    catch(ex){
      console.log(ex.response)
      if(ex.response.status >= 400 && ex.response.status <=499){
        console.log(ex.response.status);
        toast.error('Token Revoked');
        }
      }
    };

    export const get_TeamMembers = (project_id,jwt_token) => async (dispatch) => {
      try{
      const response = await http.get(`${config.BaseUrl}/v1/teammembers/${project_id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${jwt_token}`,
          }
        })
      
      dispatch({
        type: TEAM_MEMBERS,
        payload: response.data,
      });
      console.log(response.data)
    }
    catch(ex){
      console.log(ex.response)
      if(ex.response && ex.response.status >= 400 && ex.response.status <=499){
        console.log(ex.response.status);
        toast.error('Token Revoked');
        }
      }
    };

  
  export const get_Events = (project_id,jwt_token) => async (dispatch) => {
    try{
    console.log(project_id)
    const response = await http.get(`${config.BaseUrl}/v1/event/${project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: GET_EVENTS,
      payload: response.data.event_details,
    });
    dispatch({
      type: GET_PROJECT_ID,
      payload: response.data.project_id,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_ProjectDetails = (jwt_token) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/projectsevents/${this.props.project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: GET_PROJECT_DETAILS,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_Standup = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/stand_up/${project_id}?params=${date}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: GET_STANDUP,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_SprintPlanning = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/sprint_planning/${project_id}?params=${date}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: GET_SPRINT_PLANNING,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_SprintReview = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/sprint_review/${project_id}?params=${date}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: GET_SPRINT_REVIEW,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_SprintRetro = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/sprint_retro/${project_id}?params=${date}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: GET_SPRINT_RETRO,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_ChartStandup = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/visual_standup/${project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: CHART_STANDUP,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_ChartPlanning = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/visual_planning/${project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: CHART_SPRINT_PLANNING,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_ChartReview = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/visual_review/${project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: CHART_SPRINT_REVIEW,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_ChartRetro = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/visual_retro/${project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: CHART_SPRINT_RETRO,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_ChartStories = (project_id,jwt_token,date) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/visual_stories/${project_id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: CHART_STORIES,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };
  export const get_Logout = (jwt_token) => async (dispatch) => {
    try{
    const response = await http.get(`${config.BaseUrl}/v1/logout`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${jwt_token}`,
        }
      })
    dispatch({
      type: LOGOUT,
      payload: response.data,
    });
  }
  catch(ex){
    console.log(ex.response)
    if(ex.response.status >= 400 && ex.response.status <=499){
      console.log(ex.response.status);
      toast.error('Token Revoked');
      }
    }
  };

