import React from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Form_SprintReview (props){

        return(
            <Container style={{textAlign:"center"}}>
                <br/>
              
                <Row>
                    <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Stories Accepted :</label>
                    </Col>
                    <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="StoriesAccepted"
                                id = "StoriesAccepted"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="30"
                                    required
        /> 
                    </Col>
                   
              
                </Row>
                <br/>
              
             
                

                <Row>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Stories Rejected :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="StoriesRejected"
                                id = "StoriesRejected"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="30"
                                    required
                                    /><br/>
                    </Col>
                   
                </Row>
                <br/>
            
            
                <Row>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Number of Stories Accepted :</label>
                </Col>
                <Col md={3}>
                                <input
                                type="number"
                                name="Number_StoriesAccepted"
                                id = "Number_StoriesAccepted"
                                onChange={props.handleChange}
                                min="0"
                                required
                                style={{width:"50%"}}
                                    /><br/>
                    </Col>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Number of Stories Rejected :</label>
                </Col>
                <Col md={3}>
                                <input
                                type="number"
                                name="Number_StoriesRejected"
                                id = "Number_StoriesRejected"
                                onChange={props.handleChange}
                                min="0"
                                style={{width:"50%"}}
                                required
                                    /><br/>
                    </Col>
                </Row>
                <br/>
             
                <Row>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Updated-Backlog :</label>
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
                <br/>
                
            </Container>
        )
    }

export default Form_SprintReview;