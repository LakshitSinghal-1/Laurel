import React from 'react';
import GoogleLogin from 'react-google-login';
import {
  Card, CardBody, CardTitle, CardImg, Button, CardText, Row, Form, FormGroup, Input,
} from 'reactstrap';

import '../Login.css';

const LoginUI = props => (
  <div className="d-md-flex h-md-100 align-items-center">
    <div className="col-md-6 p-0 h-md-100" style={{backgroundColor:"#28426d"}}>
      <div className="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
        <div className="logoarea pt-5 pb-5">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                Welcome to Nineleaps Ritual Tracker.
                <br />
                  All your projects Ritual Details are here.
              </div>
              <div className="carousel-item">
                Anytime, anywhere access.
                <br />
                  All functionality at your fingertips!!
              </div>
              <div className="carousel-item">
                Welcome to Nineleaps RitualTracker.
                <br />
                  All your Ritual Data at one place.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
      <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
        <Row>
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <CardImg top width="100%" src="https://www.nineleaps.com/wp-content/uploads/2018/03/nineleaps-logo@3x.png" alt="Card image cap" />
                </FormGroup>
                <FormGroup>
                  <CardTitle><center>Login to Ritual Tracker</center></CardTitle>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="email"
                    placeholder="email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    id="password"
                    placeholder="password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <center><Button color="danger">Login</Button></center>
                </FormGroup>
                <FormGroup>
                  <center><CardText>OR</CardText></center>
                </FormGroup>
                <FormGroup>
                  <center>
                    <GoogleLogin
                      clientId="91150232718-l874vc8r4r76o3upu0sv29kc2mcrs3ol.apps.googleusercontent.com"
                      onSuccess={props.extractedData}
                      onFailure={props.extractedData}
                    />
                  </center>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </div>
    </div>
  </div>
);

export default LoginUI;
