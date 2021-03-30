import React, { Component } from 'react';
import "./Ritual-Cards.css";

class Card_SprintPlaning extends Component
{

render(){

    console.log(this.props);
    
    return this.props.data.map(data =>(
        <div class="card" style={{minWidth:"48%",display:"inline-flex",margin:"1%"}}>
          <div class="ritual-header" style={{textAlign:"center"}}>
          <h4><b>Sprint Planning</b></h4> 
          </div>
          <table class="table">
            <tbody>
            <tr>
            <td style={{fontWeight:"bold"}}>Sprint Goal</td>
            <td style={{fontWeight:"bold"}}>:</td>
            <td>{data.SprintGoal}</td>
            </tr>
            <tr>
            <td style={{fontWeight:"bold"}}>Sprint Backlog</td>
            <td style={{fontWeight:"bold"}}>:</td>
            <td>{data.UpdatedBacklog}</td>
            </tr>
            </tbody>
            </table>
        </div>
        )
      );
}}

export default Card_SprintPlaning;