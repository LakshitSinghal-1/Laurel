import React from "react"


function EditProjectsForm(props){
  console.log(props.isLoaded)
    console.log(props)
    return(
    <div>
      <form>
      
      <h3 style={{textAlign:"center"}} > Update Project</h3>
            <label htmlFor="name">Project Name</label>&nbsp;
            <input 
            type="text" 
            name="title" 
            id="title" 
            required
            value={props.data.title}
            onChange={props.handleChange} /><br />
            <br />

            <label htmlFor="description">Project Description</label>
            <br />
            <textarea
              type="textarea"
              value={props.data.description}
              onChange={props.handleChange}
              name="description"
              id ="description"
              rows="4"
              cols="60"
              required
            /> 
            
            <br/>
            <br/>
        <div>
            </div>

        <button name="Add Team Member" onClick={props.addTeamMembers}>Add Team Member</button><br /><br/>
          </form>
    </div>
    );
  }



export default EditProjectsForm;