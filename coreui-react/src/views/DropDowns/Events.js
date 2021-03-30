import React from "react"
import Form from 'react-bootstrap/Form'
import {connect} from "react-redux"
function DropDown_Events(props){
    console.log(props)
    if(props.Role === "ProjectManager")
        return(
       
            <Form.Control 
                as="select"
                value={props.DropEvent}
                onChange={props.DropEvents_handleChange}
                name="DropEvent"
            >
               <option value="No-Project">-- Please Choose a Event Type --</option>
               {/* <option className="dropdown-divider" name="Stand-up" value="Standup">Stand-Up</option> */}
               <option name="Sprint Planning" value="SprintPlanning">Sprint Planning</option>
               <option name="Sprint Review" value="SprintReview">Sprint Review</option>
               <option name="Sprint Retrospective" value="SprintRetrospective">Sprint Retrospective</option>
            </Form.Control>
        );
    else if(props.Role === "Employee")
        
        return(
            <Form.Control 
                as="select"
                value={props.DropEvent}
                onChange={props.DropEvents_handleChange}
                name="DropEvent"
            >
               
               <option className="dropdown-divider" name="Stand-up" value="Standup" selected>Stand-Up</option>
               
            </Form.Control>

        );
    else 
        return(
            <Form.Control 
                as="select"
                value={props.DropEvent}
                onChange={props.DropEvents_handleChange}
                name="DropEvent"
            >
               <option value="No-Project">-- Invalid User --</option>
               {/* <option className="dropdown-divider" name="Stand-up" value="Standup">Stand-Up</option>
               <option name="Sprint Planning" value="SprintPlanning">Sprint Planning</option>
               <option name="Sprint Review" value="SprintReview">Sprint Review</option>
               <option name="Sprint Retrospective" value="SprintRetrospective">Sprint Retrospective</option> */}
            </Form.Control>

        );
}

function mapStateToProps(state) {
    return {
        Role:state.authReducer.Role
    };
  }
export default connect(mapStateToProps)(DropDown_Events)