import React from "react";
import { useState } from "react";

const Activity = ({onTrackAct, data}) => {
    function formatTime(data) {
        return [
            Math.floor(data / (3600 * 1000) % 60),
            Math.floor(data / (60 * 1000) % 60),
            Math.floor(data / 1000 % 60),
            String(Math.floor(data % 1000)).padStart(3,"0")
        ]
    }

    const formattedTime = formatTime(data.time).map(x => String(x).padStart(2, "0"));
    return(
        <div className="activity-element">
            <div style={{paddingLeft:"1em"}}>
                <p style={{fontWeight:"bold"}}>{data.name}</p>
            </div>
            <div style={{alignContent:"center"}}>
                <p style={{textAlign: "center", color:"hsl(from var(--color-text) H S L / 70%)"}}> {formattedTime[0]}:{formattedTime[1]}:{formattedTime[2]}:{formattedTime[3]} </p>
            </div>
            <div style={{alignContent:"center"}}>
                <button 
                className="ui-button" 
                style={{
                    margin:"0px",
                    padding:"0.5em",
                    fontSize:"12px"
                }}  
                onClick={() => onTrackAct(data)}>Track</button>
            </div>
        </div>
    )
}

export default Activity;