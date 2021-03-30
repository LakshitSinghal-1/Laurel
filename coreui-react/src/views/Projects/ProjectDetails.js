import React from "react";


function ProjectDetails(props){
console.log(props.details.team)
return(
<div>
<br />
<h3 style={{textAlign:"center"}} > Project Details</h3>
<table class="table">
<thead class="thead-dark">
<tr>
<th scope="col">Project Fields</th>
<th scope="col">Project Data</th>
</tr>
</thead>
<tbody>
<tr>
<td>Project Name</td>
<td>{props.details.project_name}</td>
</tr>
<tr>
<td>Project Description</td>
<td>{props.details.description}</td>
</tr>
<tr>
<td>Created By </td>
<td>{props.details.created_by}</td>
</tr>
</tbody>
</table>
</div>

    );
   }

export default ProjectDetails;