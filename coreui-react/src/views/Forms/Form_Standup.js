import React from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Form_Standup (props) {
        return(
            <Container style={{textAlign:"center"}}>
                <br/>
                <br/>
                
                <Row>
                    <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Yesterday :</label>
                    </Col>
                    <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="Yesterday"
                                id = "Yesterday"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="40"
                                    required
        /> 
                    </Col>
                   
              
                </Row>
                <br/>
                <br/>
              
              
                

                <Row>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Today :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="Today"
                                id = "Today"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="40"
                                    required
                                    /><br/>
                    </Col>
                   
                </Row>
                <br/>
                <br/>
                
                <Row>
                <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Blocker :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="Blocker"
                                id = "Blocker"
                                // value={Yesterday}
          
                                    rows="3"
                                    cols="40"
                                    required
                                    /><br/>
                    </Col>
                    
                </Row>
                <br/>
                <br/>
                


            </Container>
        )
    }
export default Form_Standup;