import React from "react"
import { Route,Switch} from 'react-router-dom'



const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login =React.lazy(() => import("./views/Pages/LoginPage/ClassComponent/Login"));

// Pages

const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));


const Routes = () =>(
   
   
   <React.Suspense fallback={loading()}>
   {console.log("I was in Routes")}
            <Switch>
              <Route exact path="/" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/dashboard/calendar" name="Home" render={props => <DefaultLayout {...props}/>} />
              {/* <Route exact path="/base/projects" component={Projects}/> */}
              
            </Switch>
    </React.Suspense>
        
    
    
)

export default Routes
 