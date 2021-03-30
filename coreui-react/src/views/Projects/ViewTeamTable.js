import React from "react";

function ViewTeamTable(props){
    
    console.log("***********************");
    console.log(props);
    console.log("***********************");
    return props.team.map(team =>( 
        <div>
            <td>
            {team.name}
            </td>
            <td>
            {team.email}
            </td>
        </div>
        )
    );    
}

export default ViewTeamTable;