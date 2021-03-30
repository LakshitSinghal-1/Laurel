import React, { Component } from 'react';

class Card_SprintReview extends Component
{


    render(){

    console.log(this.props);
    
    return this.props.data.map(reviewdata =>(

        <div class="card" style={{minWidth:"48%",display:"inline-flex",margin:"1%"}}>
        <div class="ritual-header" style={{textAlign:"center"}}>
        <h4><b>Sprint Review</b></h4> 
        </div>
        <table class="table">
          <tbody>
          <tr>
          <td style={{fontWeight:"bold"}}>Stories Accepted</td>
          <td style={{fontWeight:"bold"}}>:</td>
          <td> {reviewdata.StoriesAccepted}</td>
          </tr>
          <tr>
          <td style={{fontWeight:"bold"}}>Stories Rejected</td>
          <td style={{fontWeight:"bold"}}>:</td>
          <td> {reviewdata.StoriesRejected}</td>
          </tr>
          <tr>
          <td style={{fontWeight:"bold"}}>Number Of Stories Accepted</td>
          <td style={{fontWeight:"bold"}}>:</td>
          <td> {reviewdata.Number_StoriesAccepted}</td>
          </tr>
          <tr>
          <td style={{fontWeight:"bold"}}>Number Of Stories Rejected</td>
          <td style={{fontWeight:"bold"}}>:</td>
          <td> {reviewdata.Number_StoriesRejected}</td>
          </tr>
          <tr>
          <td style={{fontWeight:"bold"}}>Updated Backlog</td>
          <td style={{fontWeight:"bold"}}>:</td>
          <td> {reviewdata.UpdatedBacklog}</td>
          </tr>
          </tbody>
          </table>
      </div> 
        ));
      }}

export default Card_SprintReview;