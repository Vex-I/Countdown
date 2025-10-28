class DataController {
    constructor() {}
    
    static activityListToJSON(list){
        const item = JSON.stringify(this.activityList.map(act => ({
            name: act.getName(),
            timeSpent: act.getTimeSpent()
        })));
        localStorage.setItem("activities", item);
    }

    static cacheData(targetDate, usingHoursFormat, theme) {
        const item = {
            date: targetDate,
            hoursFormat: usingHoursFormat,
            currTheme: theme
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

