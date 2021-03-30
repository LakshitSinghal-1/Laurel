import React, { Component } from "react";
import GetEditProjectDetails from "./services/GET-EditProjectDetails";
import Modal from "react-responsive-modal";
import UpdateForm from "./UpdateForm";



class Modal_EditProject extends Component{
    constructor(props){
        super(props)
        this.state={
            openEditProjectModal:false,
            editProject:[]
        };

    };
    componentDidMount(){
      console.log(this.props)
      let project_name= this.props.location.state.project.project_name
        console.log(project_name)
      let project_id= this.props.location.state.project.project_id
        console.log(project_id)
     
       
      // this.setState({openEditProjectModal:true});
      this.onOpenEditProjectModal();
      GetEditProjectDetails(project_id,jwt_token)
      .then(result => {
        let responseJson=result;
        console.log(responseJson)
        this.setState({
          edit_project:responseJson
          
        },()=>{
          console.log(this.state.openEditProjectModal,this.state.openCreateProjectModal,this.state.edit_project)
        });
    });
    };
    onOpenEditProjectModal = (event) => {
       this.setState({openEditProjectModal:true});
        console.log(event);
        console.log(this.state.openEditProjectModal)
        
        let project_name=this.props.location.state.project.project_name
        console.log(project_name)
        let project_id= this.props.location.state.project.project_id
        console.log(project_id)
      
        GetEditProjectDetails(project_id,jwt_token)
        .then(result => {
          let responseJson=result;
          console.log(responseJson)
          this.setState({
            edit_project:responseJson
            
          },()=>{
            console.log(this.state.openEditProjectModal,this.state.openCreateProjectModal,this.state.edit_project)
          });
      });
    };
    onCloseEditProjectModal = () => {
        this.setState({ openEditProjectModal: false });
        this.props.history.push("/Projects")
      };
      render(){
        console.log(this.props)
        console.log(this.state.editProject)
          return(
            <div>
              <button className="edi"
              name="button">                                
              Edit
              <i className="fa fa-edit"></i>
              </button>
              <Modal 
                name="openEditProjectModal"
                open={this.state.openEditProjectModal} 
                onClose={this.onCloseEditProjectModal}  
                center>
                    {this.state.edit_project && <UpdateForm  
                         project={this.state.edit_project}
                         onCloseEditProjectModal={this.onCloseEditProjectModal}
                    />}
              </Modal>

           
              
              
              
            </div>
          );
      };
}


export default Modal_EditProjectv