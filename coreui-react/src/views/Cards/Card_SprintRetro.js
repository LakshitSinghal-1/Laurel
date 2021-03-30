import React, { Component } from 'react';
import "./Ritual-Cards.css"


class Card_SprintRetro extends Component
{
  
render(){

    console.log(this.props);
    
    return this.props.data.map(retrodata =>(
      <div class="card" style={{minWidth:"48%",display:"inline-flex",margin:"1%"}}>
      <div class="ritual-header" style={{textAlign:"center"}}>
      <h4><b>Sprint Retro</b></h4> 
      </div>
      <table class="table">
        <tbody>
        <tr>
        <td style={{fontWeight:"bold"}}>What Went Well</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {retrodata.WhatWentWell}</td>
        </tr>
        <tr>
        <td style={{fontWeight:"bold"}}>Not Went Well</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {retrodata.NotWentWell}</td>
        </tr>
        <tr>
        <td style={{fontWeight:"bold"}}>Action Items</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {retrodata.ActionItems}</td>
        </tr>
        <tr>
        <td style={{fontWeight:"bold"}}>Keep Doing</td>
        <td style={{fontWeight:"bold"}}>:</td>
        <td> {retrodata.KeepDoing}</td>
        </tr>
        </tbody>
        </table>
    </div>
    ))
  }}
  
export default Card_SprintRetro;