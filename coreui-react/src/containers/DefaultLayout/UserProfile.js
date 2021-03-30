import React from "react"
import "./UserProfile.css"
import { connect } from "react-redux";

function UserProfile(props){
    console.log(props)
    return(
    <div className="container" className="sidebar-card-container">
        <div className="row" className="sidebar-card-row">
            <div className="col-lg-3 col-sm-6" className="sidebar-card-col">

                <div className="sidebar-card hoversidebar-card">
                    <div className="sidebar-cardheader">

                    </div>
                    <div className="avatar">
                        <img alt="" src={props.image_url}/>
                    </div>
                    <div className="info">
                        <div className="title" style={{color:"white"}}>
                            <a target="_blank" 
                                // href="https://scripteden.com/"
                            >  
                            {props.name}</a>
                        </div>
                        <br/>
                        
                        <div className="desc" style={{color:"#14b2e2",fontSize:"large"}}>{props.Role}</div>
                        <br/>
                        
                        <div className="desc" style={{color:"#14b2e2"}}>{props.email}</div>
                        <br/>
                        <br/>
                     
                    </div>
                </div>

            </div>

        </div>
    </div>
    )
}
function mapStateToProps(state) {
    return {
        image_url:state.projectReducer.user_details.image_url,
        name:state.projectReducer.user_details.name,
        email:state.projectReducer.user_details.email,
        Role:state.authReducer.Role
    };
  }
export default connect(mapStateToProps)(UserProfile)