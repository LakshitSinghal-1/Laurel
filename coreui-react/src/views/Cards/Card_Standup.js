import React, { Component } from 'react';

class Card_Standup extends Component
{
 
    render(){

    console.log(this.props);
    // <div className="animated fadeIn">
    return this.props.data.map(standupdata =>(
      <div class="card" style={{minWidth:"48%",display:"inline-flex",margin:"1%"}}>
      <div class="ritual-header" style={{textAlign:"center"}}>
      <h4><b>Standup</b></h4> 
      </div>
      <table class="table">
        <tbody>
        <tr>
        <td style={{fontWeight:"bold"}}>Yesterday</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {standupdata.yesterday}</td>
        </tr>
        <tr>
        <td style={{fontWeight:"bold"}}>Today</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {standupdata.today}</td>
        </tr>
        <tr>
        <td style={{fontWeight:"bold"}}>Blocker</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {standupdata.blocker}</td>
        </tr>
    
        </tbody>
        </table>
    </div> 
        ));
      }}
  
  export default Card_Standup;

        
     



        
        
        
        
