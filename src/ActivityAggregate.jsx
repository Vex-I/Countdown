import DataController from "./DataController";
import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import CreateActivityTooltip from "./CreateActivityTooltip";

const ActivityAggregate = ({ isOpen, setIsOpen, setTracking}) => {
  const [list, setList] = useState(DataController.retrieveActivityList() ?? []);
  const [openTooltip, setOpenTooltip] = React.useState(false);

  function editActivity(name, time) {
  setList(prevList => {
    let updatedList;

    if (prevList.find(x => x.name === name)) {
      updatedList = prevList.map(x =>
        x.name === name
          ? { ...x, time }
          : x
      );
    } else {
      const newActivity = { name, time, isTracking: false, startTime: 0 };
      updatedList = [...prevList, newActivity];
    }

    DataController.activityListToJSON(updatedList);
    return updatedList;
  });
}

  function trackAct(data) {
    if (!data.isTracking) {
        setList(prev => {
            console.log(prev)
            return prev.map(act => 
                act.name === data.name
                ? { ...act, isTracking: true, startTime: Date.now() - act.time}
                : { ...act, isTracking: false }
            )}
            )
    } else {
        setList(prev => 
            prev.map(act =>
                act.name === data.name 
                ? {...act, isTracking: false}
                : act
            )
        )
    }
    }

    useEffect(() => {
      const timer = setInterval(() => {
        let latestTracking = null;
        setList(prevList => {
          const updatedList = prevList.map(act => {
            if (act.isTracking) {
              latestTracking = Date.now() - act.startTime - act.time;
              return { ...act, time: Math.floor(Date.now() - act.startTime) };
            }
              return act;
            });
          DataController.activityListToJSON(updatedList);
          return updatedList;
        });

        if (latestTracking !== null) {
        setTracking(latestTracking);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  

  return (
    <div
      className="sidebar"
      style={{
        visibility: isOpen ? "visible" : "hidden",
        display: "grid",
        gridTemplateRows: "0.10fr 1fr",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Activities</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"center",
            paddingLeft: "1em",
            paddingRight: "1em",
            gap: "1em",
          }}
        >
        <div style={{position:"relative"}}>
          <button className="ui-button" onClick={() => setOpenTooltip(x => !x)} style={{width:"100%", padding:"0.2em"}}>Update Activity</button>
          <CreateActivityTooltip openTooltip={openTooltip && isOpen} setIsOpen={setOpenTooltip} addActivity={editActivity}/>
        </div>
        <div>   
          <button className="ui-button" onClick={() => setIsOpen(x => !x)} style={{width:"100%", padding:"0.2em"}}>Close</button>
        </div>
        </div>
      </div>

      <div className="scrollable" id="ActivityList" style={{ gridTemplateColumns: "1fr", marginTop: "3em"}}>
        {list.map((x, i) => (
          <Activity
            onTrackAct={(data) => trackAct(data)}
            data={{ name: x.name, time: x.time, isTracking: x.isTracking }}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityAggregate;
