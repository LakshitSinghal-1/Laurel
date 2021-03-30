import React from "react";
import moment from 'moment';
import {post_Event} from "../../Redux/actions/POST-API";
import {get_Events} from "../../Redux/actions/GET-API";

import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Event from "../Forms/Event";



class CreateEvent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            DropEvent:"Standup",
            title:"Standup",
            myEventsList:[],
            eventTime:"",
            start:this.props.start,
            end:this.props.end,
            openStart:false,
            openEnd:false,
            eventModal:this.props.eventModal
        }
        console.log(this.state);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DropEvents_handleChange=this.DropEvents_handleChange.bind(this);
        this.startTimeChange=this.startTimeChange.bind(this);
        this.endTimeChange=this.endTimeChange.bind(this);
    }

componentDidMount() {
        console.log(this.state);
           }
 
 
 handleChange = (event) => {
            event.preventDefault();
            let name=event.target.name;
            console.log(name,event.target.value);
            this.setState({
                 [name]:event.target.value
            })
            console.log("From HandleChange",this.state)
         }
 setOpenStart = () => {
     // this.setState((prevState) => { return { openStart: !prevState }});
         this.setState({openStart:true});
           };
 setCloseStart = () => {
         this.setState({openStart:false});
           };
 setOpenEnd = () => {
         this.setState({openEnd:true});
           };
 setCloseEnd = () => {
         this.setState({openEnd:false});
           };
 
 startTimeChange(value){
         console.log((value._d));
         console.log(moment(value._d).format("H:mm:ss"))
         this.setState({...this.state,
             start:value._d
         },()=>console.log(this.state)) 
     }
       
 endTimeChange(value){
         console.log((value._d));
         console.log(moment(value._d).format("H:mm:ss"))
         this.setState({...this.state,
             end:value._d
         },()=>console.log(this.state)) 
     }
 
 handleSubmit(event) {
         console.log(this.state)
           event.preventDefault();
             var startTime=this.props.start 
                           + " " + 
                           moment(this.state.start).format("H:mm:ss") 
                           + " " 
                           + "GMT+0530 (India Standard Time)";
             var endTime=this.props.end
                         + " " + 
                         moment(this.state.end).format("H:mm:ss") 
                         + " " 
                         + "GMT+0530 (India Standard Time)";
           console.log(startTime,endTime);
         //   console.log(moment(startTime));
        //    moment().format('l'); 
           console.log(moment(startTime).toDate());
           console.log(moment(endTime).toDate());
           let eventData ={ 
                         title:this.state.title,
                         start:moment(startTime).toDate(),
                         end:moment(endTime).toDate(),
                         event_type:this.state.DropEvent
                     }
           console.log(eventData);
           console.log(this.props.project_id)
           this.props.post_Event(eventData,this.props.project_id,this.props.jwt_token)
           .then(()=>{
               console.log(this.props.project_id)
               this.props.get_Events(this.props.project_id,this.props.jwt_token)
             });
           this.props.closeEventModal();
         }
 
 DropEvents_handleChange(event){
           console.log(event.target)
           const {name, value} = event.target;
           var newValue;
           if(value === "Standup"){
               newValue="Stand-Up";
           }
           else if(value === "SprintPlanning"){
               newValue="SprintPlanning";
           }
           else if(value === "SprintReview"){
               newValue="SprintReview";
           }
           else if(value === "SprintRetrospective"){
               newValue="SprintRetrospective";
           }
           
           console.log(name,newValue);
       
           this.setState({ title: newValue },()=>{console.log(this.state)});
       
       }
    

    render(){
        console.log(this.props);
        return(
            <Modal 
                    isOpen={this.props.eventModal} 
                    toggle={this.props.closeEventModal} 
                    className={this.props.className} 
                >
                <div className="modal-content" style={{width:"150%", marginLeft:"-15%"}}>
                <ModalHeader toggle={this.props.closeEventModal}>Create Event</ModalHeader>
                <ModalBody >
                    <Event 
                            project_id={this.props.project_id}
                            start={this.props.start}
                            end={this.props.end}
                            handleChange={this.handleChange}
                            DropEvents_handleChange={this.DropEvents_handleChange}
                            endTimeChange={this.endTimeChange}
                            startTimeChange={this.startTimeChange}
                            setOpenStart={this.setOpenStart}
                            setCloseStart={this.setCloseStart}
                            setOpenEnd={this.setOpenEnd}
                            setCloseEnd={this.setCloseEnd}
                            openStart={this.state.openStart}
                            openEnd={this.state.openEnd}
                            onSelect={this.onSelect}
                            />                        
                </ModalBody>
                <ModalFooter >
                    <div>
                        <Button style={{textAlign:"center"}} color="secondary" onClick={this.handleSubmit}>Submit</Button>
                    </div>
                </ModalFooter>
                </div>
             </Modal>
        );
    };
}

function mapStateToProps(state) {
    return {
        response:state.projectReducer.response,
        project_id:state.projectReducer.project_id,
        jwt_token:state.projectReducer.jwt_token,
        Role:state.authReducer.Role
    };
  }
export default connect(mapStateToProps,{post_Event,get_Events})(CreateEvent)