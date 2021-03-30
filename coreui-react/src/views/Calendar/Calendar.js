import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import DropDown_Projects from "../DropDowns/Projects";
import {get_Projects} from "../../Redux/actions/GET-API";
import {connect} from "react-redux";
import {get_Events} from "../../Redux/actions/GET-API";
import CreateEvent from "../Modals/CreateEvent";



let localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Calendar extends React.Component{


constructor(props) {
    super(props)
    this.state = {
        dayPropGetter:[],
        Standup:false,
        SprintPlanning:false,
        SprintReview:false,
        SprintRetro:false,
        start:"",
        end:"",
        eventModal:false,
        openCreateEvent:false,
        DropProject:"",
        event:{
            event_name:"",
            event_id:"",
            start_date:"",
            end_date:""
        },
        project_id:"",
        Test_myEventsList:[]
    };
  };

componentWillMount=()=>{
    this.props.get_Projects(this.props.jwt_token);
}
componentDidMount=()=>{
    var date= new Date();
    console.log(date);
    console.log(this.state.myEventsList)
}
componentDidUpdate=(prevProps,prevState)=>{
    console.log(prevProps.event_details," ",prevState);
    if(prevProps.project_id !== prevState.project_id){
        console.log("In Loop")
    }
    
}

 

onSelectSlot = (value) =>{   
    // this.onOpenCreateEvent();
    console.log(moment(value.start).format("ddd MMM D YYYY"));
    
    this.setState({
        start:moment(value.start).format("ddd MMM D YYYY"),
        end:moment(value.start).format("ddd MMM D YYYY"),
        eventModal:true
    })

    console.log(value.start,value.end);
    console.log("These are Select Slot values",value);
    
    
}
closeEventModal=()=>{
    this.setState({eventModal:false})
}

onSelectEvent=(event, e) => {
    
    console.log(event);
    console.log(e.target);
    
    const start_date=moment(event.start).format("MMM Do YY");
    const end_date=moment(event.end).format("MMM Do YY");

    this.props.history.push({
        pathname: "/dashboard/calendar/"+event.event_type+"/"+end_date,
        state: { event: event }
    })

   
   
    this.setState({
        [event.event_type]:true,
        event:{
            event_name:event,
            event_id:event.event_id,
            start_date:start_date,
            end_date:end_date
            
        }
    },()=>{console.log(this.state)});

    
}

onOpenCreateEvent = () => {
    this.setState({ openCreateEvent: true });
    console.log(this.props.history);
    };
  
onCloseCreateEvent = () => {
    console.log("Called from child");
    // this.props.get_Events(this.state.project_id);
    this.setState({ openCreateEvent: false });
    console.log(this.state);
    };
 

 
DropProjects_handleChange = (event) => {
    const {name, value} = event.target
    console.log(name,value);
    this.setState({ [name]: value },()=>{console.log(this.state)});
    // console.log(this.props.project_details);
    var i;
    for(i=0;i<this.props.project_details.length;i++){
        if(this.props.project_details[i].project_name === value){
            this.props.get_Events(this.props.project_details[i].project_id,this.props.jwt_token);
            console.log(this.props.project_details[i].project_id);
            this.setState({
                project_id:this.props.project_details[i].project_id 
            }
        )}   
    }
}

    render(){
        console.log(this.props)
       
            return(
                <div>
                   <DropDown_Projects  
                                DropProjects_handleChange={this.DropProjects_handleChange}
                                DropProject={this.state.DropProject}
                    />
                    <br/>
                    {console.log(this.props.event_details,this.state.myEventsList)}
                    {this.props.event_details && 
                    <BigCalendar
                    localizer={localizer}
                    
                    
                       events={this.props.event_details.map(event=>{
                               event.start=moment(event.start).toDate()
                               event.end=moment(event.end).toDate()
                        return(event)
                    })}
                   
                    defaultDate={new Date()}
                    onRangeChange={this.onRangeChange}
                    style={{ height: "100vh",}}
                    selectable={true}
                    onSelectEvent={this.onSelectEvent}
                    onSelectSlot={this.onSelectSlot}                 
                    eventPropGetter=
                       {event => {
                        console.log(event.title);
                        if (event.is_data === false)
                          return {
                            style: {
                                borderStyle: "solid",
                                borderColor: "red"
                            },
                          }}}
                    />
                    
                    }
                <CreateEvent 
                    eventModal={this.state.eventModal}
                    start={this.state.start}
                    end={this.state.end}
                    closeEventModal={this.closeEventModal}
                />
                </div>
        );
    };
}
function mapStateToProps(state) {
    return {
        project_details:state.projectReducer.project_details,
        event_details:state.projectReducer.events,
        project_id:state.projectReducer.project_id,
        jwt_token:state.projectReducer.jwt_token
    };
  }

export default connect(mapStateToProps,{get_Projects,get_Events})(Calendar)