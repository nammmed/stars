import {makeAutoObservable} from "mobx";

class Camera {
    scale = Math.pow(10, -14);
    currentScale = Math.pow(10, -12);
    x = 0;
    y = 0;
    currentX = 0;
    currentY = 0;
    isFixed = false;

    constructor() {
        makeAutoObservable(this)
    }

    incScale() {
        this.currentScale *= 1.1
    }

    decScale() {
        this.currentScale *= 0.9
    }

    updatePosition() {
        if (this.scale !== this.currentScale) {
            let delta = (this.scale - this.currentScale) / 10
            this.scale -= delta
        }
        if (this.x !== this.currentX) {
            let delta = (this.x - this.currentX) / 10
            this.x -= delta
        }
        if (this.y !== this.currentY) {
            let delta = (this.y - this.currentY) / 10
            this.Y -= delta
        }
    }

    //выставляем желательное положение по оси Х для плавной прокрутки
    setX(x) {
        this.currentX = x
    }

    //выставляем жесткое положение по оси Х без плавной прокрутки
    strongSetX(x) {
        this.currentX = this.x = x
    }

    setY(y) {
        this.currentY = y
    }

    strongSetY(y) {
        this.currentY = this.y = y
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