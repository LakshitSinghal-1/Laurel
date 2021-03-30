import React from "react";
import Modal from "react-responsive-modal";
import Form from "./Form";

function Modal_CreateProjectUI(props){
    return(
    <div>
        <button className="btn btn-success my-2 my-sm-0" 
           onClick={props.onOpenCreateProjectModal}>Create Projects</button>
           <Modal 
           open={props.openCreateProjectModal} 
           onClose={props.onCloseCreateProjectModal} center>
           <Form onCloseCreateProjectModal={props.onCloseCreateProjectModal}/>
           </Modal>
    </div>   
    );
}

export default Modal_CreateProjectUI;