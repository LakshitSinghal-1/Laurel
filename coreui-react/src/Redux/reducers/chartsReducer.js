import {CHART_STANDUP,CHART_SPRINT_PLANNING,
        CHART_SPRINT_REVIEW,CHART_SPRINT_RETRO,
        CHART_STORIES} from "../actions/types"


const initialState={
    percentStandup:'',
    percentPlanning:'',
    percentReview:'',
    percentRetro:'',
    percentStories:''
}

export default function (state =initialState,action){
    switch (action.type){   
        case CHART_STANDUP:
            return {
                ...state,
                percentStandup: action.payload,
            };
        case CHART_SPRINT_PLANNING:
            return {
                ...state,
                percentPlanning: action.payload,
            };
        case CHART_SPRINT_REVIEW:
            return {
                ...state,
                percentReview:action.payload
            };
        case CHART_SPRINT_RETRO:
            return {
                ...state,
                percentRetro:action.payload
            };
        case CHART_STORIES:
            return {
                ...state,
                percentStories:action.payload
            };
     
        default:
            return state;
    }
};