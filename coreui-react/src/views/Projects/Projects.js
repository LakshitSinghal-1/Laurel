import React, { Component } from "react";
import Card_CreateProjectUI from "./Card_CreateProjectUI";
import {get_Projects} from "../../Redux/actions/GET-API";
import {connect} from "react-redux";
import Modal_CreateProject from "./Modal_CreateProject";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Projects extends Component {
  constructor(props){
    super(props);
    this.state = {
       jwt_token:'',
       token:'',
       redirect: false,
       values: [],
       project_data:[],
       ProjectDetails:'',
       edit_project:[],
       logout:false,
       alert:false
   };
};

componentDidMount() {
        this.props.get_Projects(this.props.jwt_token);
    }

    handleChange = (e) => {
      if (["title", "description","TeamMembers"].includes(e.target.className) ) {
        let project = [...this.state.title]
        project[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({ project }, () => console.log(this.state.title))
      } else {
        this.setState({ [e.target.name]: e.target.value })
      }
      console.log(this.state)
      console.log(this.state.project)
    };

    handleSubmit=(event)=> {
      event.preventDefault();
    };

render() {
  console.log(this.props);
  console.log("I was in Projects");
       return (
          <div>
            <Container id="page-navbar">
            <Row>
              <Col id="col_heading">
                <h1 id="heading">Projects </h1>
              </Col>
            </Row>
            <Row>
              <Col md={11} id="col_icon">
                <i class="fa fa-files-o fa-5x" id="icon" aria-hidden="true"></i>
              </Col>
              <Col md={1} id="col_button">
                <Modal_CreateProject/> 
              </Col>
            </Row>
            </Container>
         
          <br/>
          <br/>
          <br/>
          <Card_CreateProjectUI/>
         </div>  
          );
         };
        }
        
    

function mapStateToProps(state){
  return{
    project_details:state.projectReducer.project_details,
    jwt_token:state.projectReducer.jwt_token
  };
}

export default connect(mapStateToProps,{get_Projects})(Projects);