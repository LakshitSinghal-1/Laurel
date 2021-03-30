import React, { Component } from 'react';
import {connect} from "react-redux";
import {get_Projects} from "../../Redux/actions/GET-API";
import ViewTeamTable from "./ViewTeamTable";

class Card_CreateProjectUI extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      projects:{}
    };
  };
  componentDidMount(){
    this.props.get_Projects(this.props.jwt_token);
    this.setState({
      projects:this.project_details
    },()=>{console.log(this.state)});
  };

    render(){
      console.log(this.props)
    return this.props.project_details.map(project =>(
      
      <div class="card" style={{minWidth:"48%",display:"inline-flex",margin:"1%"}}>
      <div class="project-header" style={{textAlign:"center"}}>
      <h4><b>{project.project_name}</b></h4> 
      </div>
      <table class="table">
        <thead >
        <tr class="card-thread" style={{color:"white",backgroundColor:"black"}}>
        <th scope="col">Project Fields</th>
        <th scope="col">Project Data</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>Project Name</td>
        <td>{project.project_name}</td>
        </tr>
        <tr>
        <td>Project Description</td>
        <td>{project.project_desc}</td>
        </tr>
        <tr>
        <td>Created By </td>
        <td>{project.created_by}</td>
        </tr>
        <tr>
        <td>Team Members</td>
        {project.team && <ViewTeamTable team={project.team}/>}
        </tr>
        </tbody>
        </table>
    </div>
      
        
        
        )
      );
    };
  }
function mapStateToProps(state){
  return{
    project_details:state.projectReducer.project_details,
    jwt_token:state.projectReducer.jwt_token
  };
}

export default connect(mapStateToProps,{get_Projects})(Card_CreateProjectUI);