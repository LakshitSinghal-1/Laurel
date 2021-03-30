import React from "react"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

function Form_SprintPlanning (props){

        return(
            <Container style={{textAlign:"center"}}>
                <br/>
                
                <Row>
                    <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Sprint Goal :</label>
                    </Col>
                    <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="SprintGoal"
                                id = "SprintGoal"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="30"
                                    required
        /> 
                    </Col>
                   
              
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Start Date :</label>
                    </Col>
                    <Col md={9}>
                        <DatePicker
                            selected={props.startDate}
                            onChange={props.startDateChange}
                        />
                    </Col>
                   
              
                </Row>
                <br/>
                <br/>
              
                <Row>
                    <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>End Date :</label>
                    </Col>
                    <Col md={9}>
                        <DatePicker
                            selected={props.endDate}
                            onChange={props.endDateChange}
                        />
                    </Col>
                   
              
                </Row>
                <br/>
                <br/>
                
                <Row>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Sprint Backlog :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="UpdatedBacklog"
                                id = "UpdatedBacklog"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="30"
                                    required
                                    /><br/>
                    </Col>
                   
                </Row>
                {/* <br/>
                <br/>
                <Row>
                <Col md={3}> 
                        <label htmlFor="name">Sprint Type:</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="Sprint-Type"
                                id = "Sprint-Type"         
                                    rows="3"
                                    cols="30"
                                    required
                                    /><br/>
                    </Col>
                    
                </Row>
                <br/>
                <br/> */}

              
                <br/>
                


            </Container>
        )
    }



export default Form_SprintPlanning;