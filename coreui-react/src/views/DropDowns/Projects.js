import React from "react"
import {connect} from "react-redux";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function DropDown_Projects(props){
    console.log(props)
    return(
            <Container 
                // style={{marginLeft:"55%"}}
            >
                <Row>
                    <Col md={7}>
                    </Col>
        
                {/* <Form.Group controlId="Select-Project"> */}
                    <Col md={2} style={{paddingLeft:"8%",paddingTop:"0.5%",paddingRight:"0%"}}>
                        <Form.Label style={{fontWeight:"bold",fontSize:"large"}}>
                            Projects :
                            </Form.Label>
                    </Col>
                    <Col md={3}>
                        <Form.Control 
                                as="select"
                                value={props.DropProject}
                                onChange={props.DropProjects_handleChange}
                                name="DropProject"
                            >
                                {props.project_details.map(project =>(
                                    // console.log(project)
                                    // this.setState
                                <option value={project.project_name} >{project.project_name}</option>
                                    ))}
                        </Form.Control>
                    </Col>
                {/* </Form.Group> */}
                </Row>
            </Container>
    )
}
function mapStateToProps(state) {
    console.log(state.projectReducer)
    return {
        project_details: state.projectReducer.project_details
    };
  }
export default connect (mapStateToProps)(DropDown_Projects)