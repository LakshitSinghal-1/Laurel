import React from "react";
import Modal_Standup from "../../Modals/Modal_Standup/Modal_Standup";
import Card_Standup from "../../Cards/Card_Standup";
import {connect} from "react-redux";
import {get_Standup,get_ChartStandup,get_TeamMembers} from "../../../Redux/actions/GET-API";
import RadialChart from "../../Charts/RadialChart";
import ViewTeamTable from "../../Projects/ViewTeamTable";
import "./Standup.css";



class Standup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            standupdata:[{yesterday:"yesterday data",today:"today data",blocker:"blocker"}]
        };
    };
    componentDidMount(){
        this.props.get_Standup(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
        this.props.get_TeamMembers(this.props.project_id,this.props.jwt_token);
        this.props.get_ChartStandup(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
    };
    render(){
        console.log(this.props);
        return(
        <div>

            {/* <hr style={{ border: "1px solid black"}}/> */}
            <Modal_Standup event={this.props.location.state.event}/>
            {/* <hr style={{ border: "1px solid black"}}/> */}
            <br/>
            {/* <i class="fa fa-list-ol fa-4x" aria-hidden="true"></i> */}
            <br/>
       
                    <table class="table" id="standup-table">
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
                    <td><RadialChart label={'Standup Updated'} value={80}/></td>
                    </tr>
                    </tbody>
                    </table>
               
           
            <Card_Standup data={this.props.data_Standup}/>
            <br/>
            
        </div>
            );
    };
}
function mapStateToProps(state) {
    return {
        data_Standup: state.projectReducer.data_Standup,
        project_id:state.projectReducer.project_id,
        jwt_token:state.projectReducer.jwt_token,
        percentStandup:state.projectReducer.percentStandup,
        team_members:state.projectReducer.team_members
    };
  }

export default connect(mapStateToProps,{get_Standup,get_ChartStandup,get_TeamMembers})(Standup);