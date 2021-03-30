import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form_SprintPlanning from '../../Forms/Form_SprintPlanning';
import {connect} from "react-redux";
import {post_SprintPlanning} from "../../../Redux/actions/POST-API";
import {get_SprintPlanning} from "../../../Redux/actions/GET-API";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../Ritual_Modal.css";
class Modal_SprintPlanning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      SprintGoal:'',
      UpdatedBacklog:'',
      startDate: new Date(),
      endDate: new Date(),

    };
  };

  toggle=()=>{
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  startDateChange=(date)=> {
    this.setState({
      startDate: date
    },()=>{console.log(this.state.startDate)});
  }
  endDateChange=(date)=> {
    this.setState({
      endDate: date
    },()=>{console.log(this.state.startDate)});
  }

  handleChange=(event)=>{
    const{name,value}=event.target
    console.log(name," ",value)
    this.setState({[name]:value},()=>{console.log(this.state)})
  }

  onSubmitModal=()=>{
    const postData={
      SprintGoal:this.state.SprintGoal,
      UpdatedBacklog:this.state.UpdatedBacklog,
      date:this.props.event.end
    }
    console.log(postData,this.state);
    this.props.post_SprintPlanning(postData,this.props.project_id,this.props.jwt_token)
    .then(()=>
        this.props.get_SprintPlanning(this.props.project_id,this.props.jwt_token,this.props.event.end)
      );

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onChangeDate = CalendarDate => this.setState({ CalendarDate },()=>{console.log(this.state,CalendarDate)})

  render() {
    console.log(this.props);
    return (
      <div >
        <Container id="page-navbar">
          <Row>
            <Col id="col_heading">
                <h1 id="heading" >
                
                Sprint Planning </h1>
            </Col>
          </Row>
          <Row >
            <Col id="col_icon" md={11}>
                <i id="icon" class="fa fa-pencil-square-o fa-5x" aria-hidden="true"></i>
            </Col>
            <Col md={1} id="col_button" >
                <Button type ="button" color="success" onClick={this.toggle}>
                {this.props.buttonLabel} Create </Button>
            </Col>
          </Row>
        </Container>
        <Modal 
          isOpen={this.state.modal} 
          toggle={this.toggle} 
          className={this.props.className} >
          <div className="modal-content" id="content_modal">
          <ModalHeader toggle={this.toggle} >Sprint Planning</ModalHeader>
          <ModalBody >
                      <Form_SprintPlanning 
                        startDateChange={this.startDateChange}
                        endDateChange={this.endDateChange}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        handleChange={this.handleChange}
                      />                           
          </ModalBody>
          <ModalFooter >
            <div>
                  <Button color="secondary" onClick={this.onSubmitModal}>Submit</Button>
            </div>
          </ModalFooter>
          </div>
        </Modal>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
      response: state.projectReducer.response,
      project_id:state.projectReducer.project_id,
      jwt_token:state.projectReducer.jwt_token
  };
}

export default connect(mapStateToProps,{post_SprintPlanning,get_SprintPlanning})(Modal_SprintPlanning);