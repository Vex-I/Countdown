import ActivityAggregate from "./ActivityAggregate";

class DataController {
    
    static activityListToJSON(list){
        const item = list.map(act => ({
            name: act.name,
            time: act.time,
            isTracking: act.isTracking,
            startTime: act.startTime,
        }));
        localStorage.setItem("activities", JSON.stringify(item));
    }

    static cacheData(targetDate, usingHoursFormat, theme, tracking) {
        const item = {
            date: targetDate,
            hoursFormat: usingHoursFormat,
            currTheme: theme,
            tracking: tracking
        };
        localStorage.setItem("cache", JSON.stringify(item));
    }

    static retrieveCacheData() {
        return JSON.parse(localStorage.getItem("cache"));
    }

    static retrieveActivityList() {
        return JSON.parse(localStorage.getItem("activities"))
    }

}

export default DataController;

