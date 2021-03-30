import React from "react";
import Card_SprintRetro from "../../Cards/Card_SprintRetro";
import Modal_SprintRetro from "../../Modals/Modal_SprintRetro/Modal_SprintRetro";
import {connect} from "react-redux";
import {get_SprintRetro,get_ChartRetro,get_TeamMembers} from "../../../Redux/actions/GET-API";
import RadialChart from "../../Charts/RadialChart";
import ViewTeamTable from "../../Projects/ViewTeamTable";
import "./SprintRetro.css";
class SprintRetro extends React.Component{
    constructor(props){
        super(props);
        this.state={
          retrodata:[{WhatWentWell:"what good happened in this sprint", WhatDidNotWentWell:"things not happened well",
            KeepDoing:"all things you want to continue"}]
        };
    };
    componentDidMount(){
        this.props.get_TeamMembers(this.props.project_id,this.props.jwt_token);
        this.props.get_SprintRetro(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
        this.props.get_ChartRetro(this.props.project_id,this.props.jwt_token,this.props.location.state.event.end);
    };
    render(){
        console.log(this.props);
        return(
        <div>
            <Modal_SprintRetro event={this.props.location.state.event}/>
            
            <br/>
                <br/>
                <div>
                    <table class="table" id="retro-table">
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
                    <td><RadialChart label={'Retro Updated'} value={80}/></td>
                    </tr>
                    </tbody>
                    </table>
            </div>     
                <br/>
                <br/>
                <Card_SprintRetro data={this.props.data_SprintRetro}/>
        </div>
        );
    };
}
function mapStateToProps(state) {
    return {
        data_SprintRetro:state.projectReducer.data_SprintRetro,
        project_id:state.projectReducer.project_id,
        jwt_token:state.projectReducer.jwt_token,
        percentRetro:state.projectReducer.percentRetro,
        team_members:state.projectReducer.team_members
    };
  }

export default connect (mapStateToProps,{get_SprintRetro,get_ChartRetro,get_TeamMembers})(SprintRetro);