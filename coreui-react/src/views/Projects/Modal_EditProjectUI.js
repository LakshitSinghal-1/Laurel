import React from "react";
import Modal from "react-responsive-modal";
import UpdateForm from "./UpdateForm";

function Modal_EditProjectUI(props){
    return(
    <div>
        <button className="edi"
        onClick={props.onOpenEditProjectModal}
        name="button" >                                
        Edit
        <i className="fa fa-edit"></i>
        </button>
        
        <Modal 
        name="openEditProjectModal"
        open={props.openEditProjectModal} 
        onClose={props.onCloseEditProjectModal}  
        center>
             {props.edit_project && <UpdateForm  project={props.edit_project}/>}
        </Modal>

       
    </div>
    );
}

export default  Modal_EditProjectUI;