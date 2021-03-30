import React, { Component } from "react";
import Modal_CreateProjectUI from "./Modal_CreateProjectUI";
import { get_Projects } from "../../Redux/actions/GET-API";
import {connect} from "react-redux";

class Modal_CreateProject extends Component{
    constructor(props){
        super(props)
        this.state={
            openCreateProjectModal:false,
            projects:[],
            project_names:[]
        };
          
    };
    onOpenCreateProjectModal = () => {
        this.setState({ openCreateProjectModal: true });
        };
      
      onCloseCreateProjectModal = () => {
        
        this.setState({ openCreateProjectModal: false });
        console.log(this.state)
                                                                                  //API CALL
          // get_Projects();
        };

    render(){
        return(
            <Modal_CreateProjectUI
                openCreateProjectModal={this.state.openCreateProjectModal}
                onOpenCreateProjectModal={this.onOpenCreateProjectModal}
                onCloseCreateProjectModal={this.onCloseCreateProjectModal}
            />
        );
    };
}


function mapStateToProps(state){
  return{
    project_details:state.projectReducer.project_details
  };
}

export default connect (mapStateToProps,{get_Projects})(Modal_CreateProject);