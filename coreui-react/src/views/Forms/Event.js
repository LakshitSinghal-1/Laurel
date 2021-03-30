import React from "react";
import TimePicker from "rc-time-picker";
import moment from 'moment';
import '../../../node_modules/rc-time-picker/assets/index.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropDown_Events from "../DropDowns/Events";


function Event (props){
    console.log(props);
    return (
        <Container >
        
            <form onSubmit={props.handleSubmit} onChange={props.handleChange}>
                <Row>
                    <Col>
                        <label htmlFor="name"> Event Type :</label>&nbsp;
                    </Col>   
                    <Col>
                    <DropDown_Events  
                                    DropEvents_handleChange={props.DropEvents_handleChange}
                                    DropEvent={props.DropEvent}
                                  
                        />

                        
                    </Col>
                </Row>
                        <br />
                        <br />
                        
                <Row>
                    <Col>
                        <label htmlFor="name">Start Time :</label>&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col>
                        <TimePicker 
                                defaultValue={undefined} 
                                minuteStep={15}
                                showSecond={false} 
                                open={props.openStart}
                                onOpen={props.setOpenStart}
                                onClose={props.setCloseStart}
                                focusOnOpen
                                onChange={props.startTimeChange}
                                />
                        
                    </Col>
                </Row>
                        <br />
                        <br />
                <Row>
                    <Col>
                        <label htmlFor="name">End Time :</label>&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col>
                        <TimePicker 
                                defaultValue={undefined} 
                                minuteStep={15}
                                showSecond={false} 
                                open={props.openEnd}
                                onOpen={props.setOpenEnd}
                                onClose={props.setCloseEnd}
                                focusOnOpen
                                onChange={props.endTimeChange}
                                />
                        
                    </Col>
                </Row>
                        <br />
                        <br />
                <Row>
                    <Col>
                        <label htmlFor="name">Event Date :</label>&nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col>
                        <input type="text" value={moment(props.start).format(" dddd, MMMM Do YYYY ")} readOnly/>
                        
                    </Col>
                </Row>
            </form>
        
        </Container>
    )
  }

// function mapStateToProps(state) {
//     return {
//         response:state.projectReducer.response
//     };
//   }
// export default connect(mapStateToProps,{post_Event,get_Events})(Event)
export default Event