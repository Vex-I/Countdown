import React from "react";

const Sidebar = ({isOpen, setIsOpen}) => {

  return (
    <div className="sidebar" style={{visibility: isOpen ? "visible" : "hidden", display:"grid", gridTemplateRows:"0.15fr 1fr"}}>
      <div>
        <h1 style={{textAlign:"center"}}>Sidebar</h1>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", paddingLeft:"1em", paddingRight:"1em", gap:"1em"}}>
          <button>Add Activity</button>
          <button onClick={() => setIsOpen(x => !x)}>Close</button>
        </div>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr"}}></div>
    </div>
  );
}

export default Sidebar;