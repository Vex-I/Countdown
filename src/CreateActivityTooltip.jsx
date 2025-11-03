import React from "react";


const CreateActivityTooltip = ({openTooltip, setIsOpen, addActivity}) => {

    function createActivity() {
        const name = document.getElementById("name-input").value;
        const time = document.getElementById("time-input").value;
        addActivity(name, time * 1000);
    }

    function formCompleted() {
        setIsOpen(false);
        createActivity();
    }

    return(
        <div className="create-activity-tooltip" style={{visibility: openTooltip ? "visible" : "hidden"}}>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5em"}}>
                <h4 style={{margin: "0"}}>Activity Name</h4>
                <input id="name-input" type="text" style={{width:"calc(100% - 1em)"}}></input>
                <h4 style={{margin: "0"}}>Initial tracked time (seconds)</h4>
                <input id="time-input" type="number" style={{width:"calc(100% - 1em)"}}></input>
            </div>
            <div>
                <button onClick={formCompleted} className="ui-button" style={{fontSize:"12px", padding: '0.5em', margin: "0px"}}>Update Activity</button>
            </div>
        </div>
    )
}


export default CreateActivityTooltip