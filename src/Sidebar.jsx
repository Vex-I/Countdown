import React from "react";
import ActivityAggregate from "./ActivityAggregate.jsx"

const Sidebar = ({isOpen, setIsOpen, tracking, setTracking}) => {
  return (
      <ActivityAggregate 
      isOpen={isOpen} 
      setIsOpen={setIsOpen}
      tracking={tracking}
      setTracking={setTracking}/>
  );
}

export default Sidebar;