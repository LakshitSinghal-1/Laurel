import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form_SprintReview from '../../Forms/Form_SprintReview';
import {connect} from "react-redux";
import {post_SprintReview} from "../../../Redux/actions/POST-API";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../Ritual_Modal.css";

import {get_SprintReview} from "../../../Redux/actions/GET-API";
class Modal_SprintReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      StoriesAccepted:'',
      StoriesRejected:'',
      UpdatedBacklog:'',
      Number_StoriesAccepted:'',
      Number_StoriesRejected:''
    };
  }

  toggle=() =>{
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange=(event)=>{
    const{name,value}=event.target
    console.log(name," ",value)
    this.setState({[name]:value},()=>{console.log(this.state)})
  }

  onSubmitModal=()=>{
    const postData={
      StoriesAccepted:this.state.StoriesAccepted,
      StoriesRejected:this.state.StoriesRejected,
      UpdatedBacklog:this.state.UpdatedBacklog,
      Number_StoriesAccepted:this.state.Number_StoriesAccepted,
      Number_StoriesRejected:this.state.Number_StoriesRejected,
      date:this.props.event.end
    }
    console.log(postData)
    this.props.post_SprintReview(postData,this.props.project_id,this.props.jwt_token)
    .then(()=>
          this.props.get_SprintReview(this.props.project_id,this.props.jwt_token,this.props.event.end)
      );
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    console.log(this.props);
    return (
      <div >
        <Container id="page-navbar">
          <Row>
            <Col id="col_heading">
                <h1 id="heading">Sprint Review </h1>
            </Col>
          </Row>
          <Row>
            <Col md={11} id="col_icon">
                <i class="fa fa-eye fa-5x" id="icon" aria-hidden="true"></i> 
            </Col>
            <Col md={1} id="col_button">
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
          <ModalHeader toggle={this.toggle}>Sprint Review</ModalHeader>
          <ModalBody >
                      <Form_SprintReview handleChange={this.handleChange}/>                           
          </ModalBody>
          <ModalFooter >
            <div>
                  <Button style={{textAlign:"center"}} color="secondary" onClick={this.onSubmitModal}>Submit</Button>
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

export default connect(mapStateToProps,{post_SprintReview,get_SprintReview})(Modal_SprintReview);