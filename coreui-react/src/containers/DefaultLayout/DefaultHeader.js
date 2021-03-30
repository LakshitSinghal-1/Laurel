import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import SweetAlert from "react-bootstrap-sweetalert";
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import {connect} from "react-redux"
import {get_Logout} from "../../Redux/actions/GET-API"
import Logout_Icon from "../../assets/img/logout-icon.png"
import Nineleaps_Logo from "../../assets/img/nineleapslogo.jpg"

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};



class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      logout:false,
      alert:null
    }
  }

  

  showAlert=(event)=>{
    event.preventDefault();

    const getAlert = () =>(
      <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Are you sure you want to Logout ?"
      onConfirm={this.Logout}
      onCancel={this.onCancel}
      >
      You will not be able to access the Application !
      </SweetAlert>
    );
    
    this.setState({
        alert: getAlert()
      });
    }

  Logout=()=>{
    console.log("I m in logout")
     sessionStorage.clear();
    this.props.get_Logout(this.props.jwt_token);                                             //API CALL
    // if(this.props.response){
    //   console.log("I was in IF")
    // }
    this.props.history.replace("/");
   
  }

  onCancel=()=>{
    this.setState({
      alert:null
    });
  }
  render() {
   

    // eslint-disable-next-line
    console.log(this.props);
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        
        <AppNavbarBrand
          full={{ src: Nineleaps_Logo, width: 150, height: 35, alt: Nineleaps_Logo }}
          minimized={{ src: Nineleaps_Logo, width: 30, height: 30, alt: Nineleaps_Logo }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard/Calendar" className="nav-link" >Calendar</NavLink>
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem> */}
          {/* <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {/* <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider /> */}
              {/* <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
            
          </AppHeaderDropdown>
            <button className="btn"
              style={{marginLeft:"-5%"}}
              onClick={this.showAlert} 
              type="submit">
              <img src={Logout_Icon} width="35px" height="35px" />
              <span style={{fontWeight:"bolder"}}>Logout</span>
            </button>
            {this.state.alert}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
      response:state.projectReducer.response,
      jwt_token:state.projectReducer.jwt_token
  };
}

export default connect(mapStateToProps,{get_Logout})(DefaultHeader);
