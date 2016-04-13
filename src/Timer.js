'use strict';

class Timer {
    constructor(accumulatedTime) {
        this.isPlaying = false;
        this.timeStamp = 0;
        this.accumulatedTime = accumulatedTime || 0;
    }

    start() {
        if (!this.isPlaying) {
            this.timeStamp = Date.now();
        }
        this.isPlaying = true;
    }

    stop() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.accumulatedTime += (Date.now() - this.timeStamp);
            this.timeStamp = 0;
        }
    }

    getSpentTime() {
        if (this.isPlaying) {
            return Date.now() - this.timeStamp + this.accumulatedTime;
        }
        return this.accumulatedTime;
    }

    clear() {
        this.timeStamp = Date.now();
        this.accumulatedTime = 0;
    }
}

module.exports = Timer;
