import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {connect} from "react-redux";
import {get_Projects} from "../../Redux/actions/GET-API";
import "./Sidebar.css";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import LazyRoutes from '../../LazyRoutes';
import Calendar from '../../views/Calendar/Calendar';
import Standup from "../../views/Pages/Standup/Standup";
import SprintPlanning from "../../views/Pages/SprintPlanning/SprintPlanning";
import SprintReview from "../../views/Pages/SprintReview/SprintReview";
import SprintRetro from "../../views/Pages/SprintRetro/SprintRetro";
import Projects from "../../views/Projects/Projects"

import '../../views/Calendar/Calendar.css';
import UserProfile from './UserProfile';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
 
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    console.log(this.props)
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader 
              onLogout={e=>this.signOut(e)}
              history={this.props.history}
              location={this.props.location}
              match={this.props.match}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg" className="sidebar">
            <UserProfile/>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {LazyRoutes.map((route, idx) => {
        
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  
                  <Redirect from="/Home" exact to="/dashboard/calendar" />
                  
                </Switch>
              </Suspense>
              <div className="card card-ui">
              <div className="calendar-ui">
                  <Switch>
                    {console.log("I was in Render")}
                    {console.log("I was in DefaultLayout")}
                    {/* {this.props.project_details && */}
                    <Route exact path="/dashboard/calendar" component={Calendar}/>
                    {/* } */}
                    <Route exact path="/dashboard/calendar/standup/:date" component={Standup}/>
                    <Route exact path="/dashboard/calendar/sprintplanning/:date" component={SprintPlanning}/>
                    <Route exact path="/dashboard/calendar/sprintreview/:date" component={SprintReview}/>
                    <Route exact path="/dashboard/calendar/sprintretrospective/:date" component={SprintRetro}/> 
                    <Route exact path="/dashboard/calendar/projects" component={Projects}/>
                  </Switch>
                  
              </div>    
              </div>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
      project_details:state.projectReducer.project_details,
      jwt_token:state.projectReducer.jwt_token
  };
}

export default connect (mapStateToProps,{get_Projects})(DefaultLayout);
