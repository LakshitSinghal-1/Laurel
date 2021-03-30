import React from "react";
import TeamInputs from "./TeamInputs";
import {connect} from "react-redux" ;
import {post_Project} from "../../Redux/actions/POST-API";
import {get_Projects} from "../../Redux/actions/GET-API";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeamMembers: [{name:"", email:""}],
            title: "",
            description:"",
        };
      };
      handleChange = (e) => {
          if (["name", "email"].includes(e.target.className) ) {
            let TeamMembers = [...this.state.TeamMembers]
            TeamMembers[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ TeamMembers }, () => console.log(this.state.TeamMembers))
          } else {
            this.setState({ [e.target.name]: e.target.value })
          }
          console.log(this.state)
        };
      addTeamMembers = (e) => {
          this.setState((prevState) => ({
              TeamMembers: [...prevState.TeamMembers, {name:"", email:""}],
            }),()=>{console.log(this.state)});
          };
      removeTeamMember=(e) => {
        let TeamMembers = [...this.state.TeamMembers]
        let index = e.target.name;
        console.log(e.target.name,index)
        TeamMembers.splice(index,1);
        this.setState({TeamMembers},() =>{console.log(this.state.TeamMembers)});
         };

      handleSubmit=(e) =>{
        console.log(this.state)
          e.preventDefault();
          console.log("success")
          let postData= {title:this.state.title,
                         description:this.state.description,
                         TeamMembers:this.state.TeamMembers
                        }; 

          console.log(postData);
          console.log(this.state);
         
          this.props.post_Project(postData,this.props.jwt_token)
          .then(()=>
             this.props.get_Projects(this.props.jwt_token)
             );
          this.props.onCloseCreateProjectModal();
        }
      
    

render() {
  let {title, TeamMembers , description} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
      <h3 style={{textAlign:"center"}} >Create Project</h3>
        <label htmlFor="name">Project Name</label>&nbsp;
        <input 
          onChange={this.handleChange}
          type="text" 
          name="title" 
          id="title" 
          value={title} 
          
          required /><br />
        <br />
        <label>Project Description</label>
        <br />
        <textarea
          onChange={this.handleChange}
          type="textarea"
          name="description"
          id ="description"
          value={description}
          
          rows="4"
          cols="60"
          required
        /> <br />
        <br />
        <button onClick={this.addTeamMembers}>Add Team Member</button><br />
        <br/>
        <TeamInputs 
        TeamMembers={TeamMembers} 
        handleChange={this.handleChange}
        removeTeamMember={this.removeTeamMember}/>
        <input type="submit" value="Submit" /> 
      </form>
    );
  };
}


function mapStateToProps(state){
  return{
    project_details:state.projectReducer.project_details,
    jwt_token:state.projectReducer.jwt_token
  };
}

export default connect (mapStateToProps,{post_Project,get_Projects})(Form);