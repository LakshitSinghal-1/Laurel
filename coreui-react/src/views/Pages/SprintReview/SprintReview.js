import React from "react";
import Modal_SprintReview from "../../Modals/Modal_SprintReview/Modal_SprintReview";
import Card_SprintReview from "../../Cards/Card_SprintReview";
import {connect} from "react-redux";
import {get_SprintReview,get_ChartReview,get_ChartStories,get_TeamMembers} from "../../../Redux/actions/GET-API";
import RadialChart from "../../Charts/RadialChart";
import ViewTeamTable from "../../Projects/ViewTeamTable";
import "./SprintReview.css";
class SprintReview extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
        reviewdata:[{StoriesAccepted:"all stories taken", StoriesRejected:"all rejected stories",
          UpdateRequirements:"all new requirements"}]
        };
    };
    componentDidMount(){
        this.props.get_SprintReview(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
        this.props.get_TeamMembers(this.props.project_id,this.props.jwt_token);
        this.props.get_ChartReview(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
        this.props.get_ChartStories(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
    };
    render(){
        console.log(this.props);
        return(
            <div>
                <Modal_SprintReview event={this.props.location.state.event}/>
                <br/>
                <br/>
                <div>
                    <table class="table" id="review-table">
                    <thead >
                    <tr class="card-thread" style={{color:"black",backgroundColor:"rgba(200,206,211,1)"}}>
                    <th scope="col" >Team Members</th>
                    <th scope="col">Standup Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td style={{fontWeight:"bold"}}><ViewTeamTable team={this.props.team_members}/></td>
                    {/* <td>{props.ProjectDetails.project_name}</td> */}
                    <td><RadialChart label={'Stories Accepted'} value={80}/></td>
                    </tr>
                    </tbody>
                    </table>
            </div>     
                <br/>
                <br/>
                <Card_SprintReview data={this.props.data_SprintReview}/>
              
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_SprintReview:state.projectReducer.data_SprintReview,
        project_id:state.projectReducer.project_id,
        jwt_token:state.projectReducer.jwt_token,
        percentReview:state.projectReducer.percentReview,
        percentStories:state.projectReducer.percentStories,
        team_members:state.projectReducer.team_members
    };
  }


export default connect(mapStateToProps,{get_SprintReview,get_ChartReview,get_ChartStories,get_TeamMembers})(SprintReview);