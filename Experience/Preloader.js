import { EventEmitter } from 'events';
import Experience from './Experience';
import { gsap } from 'gsap';
import convert from "./Utils/convertDivsToSpans.js";

export default class PreLoader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets()
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".first-subheading"));
        convert(document.querySelector(".second-subheading"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }



    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new gsap.timeline();
            this.timeline.set(".animatedis", {y: 0, yPercent: 100});

            if (this.device === "desktop") {
                this.timeline.to(".preloader", {
                    opacity: 0,
                    delay: 1,
                    onComplete: () => {
                        document.querySelector(".preloader").classList.add("hidden");
                    }
                }).to(this.roomChildren.animation_cube.scale, {
                    x: 1.4,
                    z: 1.4,
                    y: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            } else {
                this.timeline.to(".preloader", {
                    opacity: 0,
                    delay: 1,
                    onComplete: () => {
                        document.querySelector(".preloader").classList.add("hidden");
                    }
                }).to(this.roomChildren.animation_cube.scale, {
                    x: 1.4,
                    z: 1.4,
                    y: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }

            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1
            }, "same").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve
            }, "same");
        });
    };

    secondIntro() {
        return new Promise((resolve) => {

            this.secondTimeline = new gsap.timeline();
            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.out(1.7)"
            }).to(".arrow-svg-wrapper", {
                opacity: 0
            }).to(this.room.position, {
                z: 0,
                y: 0,
                x: 0,
                ease: "power1.out"
            }, "same").to(this.roomChildren.animation_cube.rotation, {
                y: 2 * Math.PI - Math.PI / 4,
            }, "same").to(this.roomChildren.animation_cube.scale, {
                x: 10,
                y: 10,
                z: 10
            }, "same").to(this.camera.orthographicCamera.position, {
                y: 3.75
            }, "same").to(this.roomChildren.animation_cube.position, {
                y: -0.194876,
                z: -7.02205,
                x: 0.002591
            }, "same").to(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "body").to(this.roomChildren.body_002.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5
            }, "body").to(this.roomChildren.body_003.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5
            }, "body").to(this.roomChildren.body_004.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5
            }, "body").to(this.roomChildren.body_005.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5
            }, "body").to(this.roomChildren.animation_cube.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1
            }, "introtext").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)"
            }, "introtext").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)"
            }, "introtext").to(".first-subheading .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)"
            }, "introtext").to(".second-subheading .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)"
            }, "introtext").to(this.roomChildren.body_002.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back.out(2.2)",
                duration: 1.5
            }, "introtext").to(this.roomChildren.body_003.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back.out(2.2)",
                duration: 1.5
            }, "introtext").to(this.roomChildren.body_004.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back.out(2.2)",
                duration: 1.5
            }, "introtext").to(this.roomChildren.body_005.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back.out(2.2)",
                duration: 1.5
            }, "introtext").to(this.roomChildren.aquarium.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.3").to(this.roomChildren.fish.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.3").to(this.roomChildren.desks.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.1").to(this.roomChildren.table_stuff.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.4").to(this.roomChildren.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.4").to(this.roomChildren.shelves.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.2").to(this.roomChildren.clock.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }).to(this.roomChildren.floor_items.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "> -0.3").to(this.roomChildren.chair.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5
            }, "chair").to(this.roomChildren.chair.rotation, {
                y: 4 * Math.PI + Math.PI / 2,
                ease: "power2.out",
                duration: 1,
                onComplete: resolve
            }, "chair").to(".arrow-svg-wrapper", {
                opacity: 1
            });
        });
    };


    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            this.secondIntro()
            this.removeEventListeners();
        };

        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        this.moveFlag = true;
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
        this.moveFlag = false;
    }

    async playSecondIntro() {
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");

    }

    scale() {
        this.roomChildren.rectlight.width = 0;
        this.roomChildren.rectlight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.2, 0.2, 0.2);
        } else {
            this.room.scale.set(0.15, 0.15, 0.15);
        }
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    update() {
        if (this.scaleFlag) {
            this.scale();
        }

        if (this.moveFlag) {
            this.move();
        }
    }
}