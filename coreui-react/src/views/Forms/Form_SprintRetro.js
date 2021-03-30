import React from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Form_SprintRetro (props) {
        return(
            <Container style={{textAlign:"center"}}>
                <br/>
               
                <Row>
                    <Col md={3}> 
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>What Went Well :</label>
                    </Col>
                    <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="WhatWentWell"
                                id = "WhatWentWell"
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
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Not went well :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="NotWentWell"
                                id = "NotWentWell"
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
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Action Items :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="ActionItems"
                                id = "ActionItems"
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
                        <label htmlFor="name" style ={{fontWeight:"bold"}}>Keep Doing :</label>
                </Col>
                <Col md={9}>
                                <textarea
                                onChange={props.handleChange}
                                type="textarea"
                                name="KeepDoing"
                                id = "KeepDoing"
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

export default Form_SprintRetro;