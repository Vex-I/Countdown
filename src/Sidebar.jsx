import React from "react";
import ActivityAggregate from "./ActivityAggregate.jsx"

const Sidebar = ({isOpen, setIsOpen}) => {
  return (
      <ActivityAggregate isOpen={isOpen} setIsOpen={setIsOpen}/>
  );
}

export default Sidebar;