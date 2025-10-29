import DataController from "./DataController";
import React, { useEffect, useState } from "react";
import Activity from "./Activity";

const ActivityAggregate = ({ isOpen, setIsOpen }) => {
  const [list, setList] = useState(DataController.retrieveActivityList() ?? []);

  function addActivity() {
    setList(prev => [...prev, { name: "Test", time: 0 }]);
  }

  function trackAct(data) {
    if (!data.isTracking) {
        setList(prev =>
            prev.map(act =>
                act.name === data.name
                ? { ...act, isTracking: true, startTime: Date.now() - act.time}
                : { ...act, isTracking: false }
            )
        );
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
            setList(prevList => {
                const updatedList = prevList.map(act =>
                    act.isTracking
                    ? { ...act, time: Math.floor(Date.now() - act.startTime) }
                    : act
                );
                DataController.activityListToJSON(updatedList);
                return updatedList;
            });
    }, 50);

    return () => clearInterval(timer);
    }, []);


  return (
    <div
      className="sidebar"
      style={{
        visibility: isOpen ? "visible" : "hidden",
        display: "grid",
        gridTemplateRows: "0.15fr 1fr",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Sidebar</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            paddingLeft: "1em",
            paddingRight: "1em",
            gap: "1em",
          }}
        >
          <button className="ui-button" onClick={addActivity}>Add Activity</button>
          <button className="ui-button" onClick={() => setIsOpen(x => !x)}>Close</button>
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
