import {GET_PROJECTS,GET_EVENTS,FIRST_EVENTS,GET_PROJECT_DETAILS
    ,GET_STANDUP,GET_SPRINT_PLANNING,
     GET_SPRINT_REVIEW,GET_SPRINT_RETRO
    ,LOGOUT,LOGIN_DATA
    ,POST_PROJECT,POST_EVENT
    ,POST_STANDUP,POST_SPRINT_PLANNING
    ,POST_SPRINT_REVIEW,POST_SPRINT_RETRO
    ,GET_PROJECT_ID,GET_FIRST_ID, JWT_TOKEN, TEAM_MEMBERS} from "../actions/types"             // Imported in Reducer to match action
    
const initialState ={
    project_details:[],
    project_names:[],
    events:[],
    project_eventDetails:[],
    data_Standup:[],
    data_SprintPlanning:[],
    data_SprintReview:[],
    data_SprintRetro:[],
    userData:[],
    response:[],
    jwt_token:"",
    project_id:'',
    user_details:{},
    team_members:[]
}


export default function (state =initialState,action){
    switch (action.type){   
        case GET_PROJECTS:
            return {
                ...state,
                project_details: action.payload,
            };
        case GET_PROJECT_DETAILS:
            return {
                ...state,
                project_details: action.payload,
            };
        case GET_EVENTS:
            return {
                ...state,
                events:action.payload
            };
        case FIRST_EVENTS:
            return {
                ...state,
                events:action.payload
            };
        case GET_PROJECT_ID:
            return {
                ...state,
                project_id:action.payload
            };
        case GET_FIRST_ID:
            return {
                ...state,
                project_id:action.payload
            };
        case GET_PROJECT_DETAILS:
            return {
                ...state,
                project_eventDetails:action.payload
            };
        case TEAM_MEMBERS:
            return {
                ...state,
                team_members:action.payload
            };
        case GET_STANDUP:
            return {
                ...state,
                data_Standup:action.payload
            };
        case GET_SPRINT_PLANNING:
            return {
                ...state,
                data_SprintPlanning:action.payload
            };
        case GET_SPRINT_REVIEW:
            return {
                ...state,
                data_SprintReview:action.payload
            };
        case GET_SPRINT_RETRO:
            return {
                ...state,
                data_SprintRetro:action.payload
            };
        case POST_PROJECT:
            return {
                ...state,
                response:action.payload
            };
        case POST_EVENT:
            return {
                ...state,
                response:action.payload
            };
        case POST_STANDUP:
            return {
                ...state,
                response:action.payload
            };
        case POST_SPRINT_PLANNING:
            return {
                ...state,
                response:action.payload
            };
        case POST_SPRINT_REVIEW:
            return {
                ...state,
                response:action.payload
            };
        case POST_SPRINT_RETRO:
            return {
                ...state,
                response:action.payload
            };
        case LOGIN_DATA:
            return {
                ...state,
                user_details:action.payload
            };
        case JWT_TOKEN:
            return {
                ...state,
                jwt_token:action.payload
            };
        case LOGOUT:
            return {
                ...state,
                response:action.payload,
                // jwt_token:""
            };     
        
        default:
            return state;
    }
};