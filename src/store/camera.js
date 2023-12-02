import {makeAutoObservable} from "mobx";

class Camera {
    scale = Math.pow(10, -12);
    x = 0;
    y = 0;
    isFixed = false;

    constructor() {
        makeAutoObservable(this)
    }

    incScale() {
        this.scale *= 1.1
    }

    decScale() {
        this.scale *= 0.9
    }

    setX(x) {
        this.x = x
    }

    setY(y) {
        this.y = y
    }

    center() {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const centerX = -canvasWidth / 2;
        const centerY = -canvasHeight / 2;
        this.setX(centerX);
        this.setY(centerY);
    }

    fix(star) {
        this.isFixed = star
    }

    fixfree() {
        this.isFixed = false
    }
}

export default new Camera()