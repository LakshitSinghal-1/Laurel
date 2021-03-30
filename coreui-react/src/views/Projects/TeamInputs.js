import React from "react";

const TeamInputs = (props) => {
  return (  
    props.TeamMembers.map((val,i) => {
      return(
        <div key={i}>
          <label>Name</label>
          &nbsp;
          <input
            name="name"
            type="text"
            className="name"
            data-id={i}
            value={props.TeamMembers[i].name} 
            onChange={props.handleChange}
            required
            
          />
          &nbsp; &nbsp; &nbsp;
          <label>Email</label>
          &nbsp;
          <input
            type="email"
            name="email"
            className="email"
            data-id={i}
            value={props.TeamMembers[i].email} 
            onChange={props.handleChange}
            pattern = "^[_A-Za-z0-9.-\\+]+(\\.[_A-Za-z0-9.-]+)*@nineleaps.com$"
            title="Enter valid Nineleaps Email"
            required
          />
          &nbsp; &nbsp; &nbsp;
          <button 
              name={i}
              onClick={props.removeTeamMember} 
              onChange={props.handleChange}>
              Remove
          </button> 
          {console.log(i)}
        </div>
      );
    })
  );
}

export default TeamInputs;