import {EventEmitter} from 'events';

export default class Times extends EventEmitter{
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }

    update() {
        const now = Date.now();
        this.delta = now - this.current;
        this.current = now;
        this.elapsed = now - this.start;

        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}