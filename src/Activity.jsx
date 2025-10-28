class Activity {
    constructor(name) {
        this.name = name;
        this.timeSpent = 0;
    }

    constructor(name, timeSpent) {
        this.name = name;
        this.timeSpent = timeSpent;
    }

    incrementTime() {
        return new Activity(this.name, this.timeSpent + 1);
    };

    getTimeSpent() {
        return this.timeSpent;
    }

    getName() {
        return this.name;
    }
}