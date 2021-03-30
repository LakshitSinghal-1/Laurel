import React from "react";
import Modal_SprintPlanning from "../../Modals/Modal_SprintPlanning/Modal_SprintPlanning";
import Card_SprintPlanning from "../../Cards/Card_SprintPlanning";
import {connect} from "react-redux";
import {get_SprintPlanning,get_ChartPlanning,get_TeamMembers} from "../../../Redux/actions/GET-API";
import RadialChart from "../../Charts/RadialChart";
import ViewTeamTable from "../../Projects/ViewTeamTable";
import "./SprintPlanning.css";
class SprintPlanning extends React.Component{
    constructor(props){
        super(props);
        this.state={
            planingdata:[{SprintGoal:"Goal",SprintBacklog:"all sprints here",Sprinttype:"weekly"}]
        };
    };
    componentDidMount(){
        this.props.get_TeamMembers(this.props.project_id,this.props.jwt_token);
        this.props.get_SprintPlanning(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
        this.props.get_ChartPlanning(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
    };
    render(){
        console.log(this.props);
        return(
        <div>
            <Modal_SprintPlanning event={this.props.location.state.event}/>
          
            <br/>
                <br/>
                <div>
                    <table class="table" id="planning-table">
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
                    <td><RadialChart label={'Planning Updated'} value={80}/></td>
                    </tr>
                    </tbody>
                    </table>
            </div>     
                <br/>
                <br/>
            <Card_SprintPlanning data={this.props.data_SprintPlanning}/>
        </div>
        );
    };
}
function mapStateToProps(state) {
    return {
        data_SprintPlanning:state.projectReducer.data_SprintPlanning,
        project_id:state.projectReducer.project_id,
        jwt_token:state.projectReducer.jwt_token,
        percentPlanning:state.projectReducer.percentPlanning,
        team_members:state.projectReducer.team_members
    };
  }

export default connect(mapStateToProps,{get_SprintPlanning,get_ChartPlanning,get_TeamMembers})(SprintPlanning);