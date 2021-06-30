class Event {
    /**
     * 绑定事件，同步|异步触发事件
     */
    constructor() {
        this.eventList = {};
    }

    _getEventList() {
        return this.eventList;
    }

    /**
     * 添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。 不会检查 listener 是否已被添加。 多次调用并传入相同的 eventName 与 listener 会导致 listener 会被添加多次
     * @param {string} eventName 
     * @param {function|function[]} listener
     * @returns {Event}
     */
    on(eventName, listener) {
        if (eventName in this.eventList) {
            const listeners = this.eventList[eventName];
            listeners.push(listener);
        } else {
            this.eventList[eventName] = [listener];
        }
        return this;
    }

    /**
     * 从名为 eventName 的事件的监听器数组中移除指定的 listener, 最多只会从监听器数组中移除一个监听器。 如果监听器被多次添加到指定 eventName 的监听器数组中，则必须多次调用
     * @param {string} eventName 
     * @param {function|function[]} listener 
     * @returns {Event}
     */
    off(eventName, listener) {
        if (eventName in this.eventList) {
            const listeners = this.eventList[eventName];
            if (Array.isArray(listeners)) {
                const firstIndex = listeners.findIndex((el) => el === listener);
                firstIndex != -1 && listeners.splice(firstIndex, 1);
            }
        }
        return this;
    }

    /**
     * 清空监听器eventName 的事件的监听器
     * @param {string} eventName 
     * @returns {Event}
     */
    clear(eventName) {
        this.eventList[eventName] = null;
        delete this.eventList[eventName];
        return this;
    }

    /**
     * 按照监听器注册的顺序，异步步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数。 如果事件有监听器，则返回 true，否则返回 false。
     * @param {string} eventName 
     * @param {*} args
     * @returns {boolean}
     */
    emit(eventName, ...args) {
        if (!eventName in this.eventList) return false;

        for (let listener of this.eventList[eventName]) {
            listener(...args);
        };
        return true;
    }

    /**
     * 按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数。如果事件有监听器，则返回 true，否则返回 false。
     * @param {string} eventName 
     * @param {*} args
     * @returns {boolean}
     */
    async emitSync(eventName, ...args) {
        if (!eventName in this.eventList) return false;

        for (let listener of this.eventList[eventName]) {
            await listener(...args);
        };
        return true;
    }
}

module.exports = Event;
