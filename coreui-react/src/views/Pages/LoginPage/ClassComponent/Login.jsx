import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oauthGoogle } from '../../../../Redux/actions/POST-API';


import LoginUI from '../UIComponent/LoginUI';



class Login extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  async responseGoogle(res) {
    sessionStorage.clear();
    const postData = {
      name: res.w3.ig,
      email: res.w3.U3,
      provider_id: res.w3.Eea,
      token: res.Zi.access_token,
      image_url: res.w3.Paa,
    };
    console.log(postData);
    await this.props.oauthGoogle(postData);
    console.log(this.props.jwt_token,"New Token");
    if (this.props.jwt_token) {
      console.log(this.props.jwt_token,"Old Token");
        this.props.history.replace("/dashboard/calendar");
    }
  }

  render() {
    console.log(this.props);
    console.log("I was in Login Page");
   
    return (
      <div>
        <LoginUI 
                  extractedData={this.responseGoogle} 
          /> 
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    response: state.authReducer.response,
    jwt_token:state.projectReducer.jwt_token
  };
}

export default connect(mapStateToProps, { oauthGoogle })(Login);

