import DataController from "./DataController";

// Handles aggregate activity logic.
class ActivityHandler {
    constructor(activityList) {
        this.activityList = activityList;
    };

    addActivity(activity) {
        this.activityList.unshift(activity);
    };

    getActivities() {
        return this.activityList;
    };

    deleteActivity(activity) {
        this.activityList = this.activityList.filter(act => act.getName() !== activity.getName());
    };

    toJSON() {
        DataController.activityListToJSON(this.activityList);
    };
}
