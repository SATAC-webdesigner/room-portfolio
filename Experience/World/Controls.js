import * as THREE from 'three';
import Experience from "../Experience";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import ASScroll from '@ashthornton/asscroll';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            console.log(child);
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
            if (child.name === "Circle1"){
                this.circleFirst = child;
            }
            if (child.name === "Circle2"){
                this.circleSecond = child;
            }
            if (child.name === "Circle3"){
                this.circleThird = child;
            }
        });
        this.sizes = this.experience.sizes;

        gsap.registerPlugin(ScrollTrigger);

        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
        
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.2,
            disableRaf: true,
        });

        gsap.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({


            //DESKTOP
            "(min-width: 969px)": () => {
                //Resets
                this.room.scale.set(0.2, 0.2, 0.2);
                this.rectLight.width = 0.4;
                this.rectLight.height = 1.1;

                //First section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });

                this.firstMoveTimeline.fromTo(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0
                }, {
                    x: () => {
                        return this.sizes.width * 0.001275
                    }
                });

                //Second section
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });

                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 3.5
                    },
                    z: () => {
                        return this.sizes.height * 0.0055
                    }
                }, "same");

                this.secondMoveTimeline.to(this.room.scale, {
                    x: 1.1,
                    y: 1.1,
                    z: 1.1
                }, "same");

                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.4 * 5.5,
                    height: 1.1 * 5.5
                }, "same");

                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });

                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                }, "same");

                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: () => {
                        return -this.sizes.height * 0.0025
                    }
                    ,
                    x: () => {
                        return -this.sizes.width * 0.0009
                    }
                }, "same");
            },

            //MOBILE
            "(max-width: 968px)": () => {
                //Resets
                this.room.scale.set(0.15, 0.15, 0.15);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.2;
                this.rectLight.height = 0.7;

                //First section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    }
                });

                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.18,
                    y: 0.18,
                    z: 0.18
                });

                //Second section
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });

                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 4
                    },
                    z: () => {
                        return this.sizes.height * 0.0055
                    }
                }, "same");

                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.9,
                    y: 0.9,
                    z: 0.9
                }, "same");

                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.4 * 6,
                    height: 1.1 * 6
                }, "same");

                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });

                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                }, "same");

                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: () => {
                        return -this.sizes.height * 0.0018
                    },
                    x: () => {
                        return this.sizes.width * 0.005
                    }
                }, "same");
            },

            all: () => {
                //Circles animations ----------------------------------------------------------------

                //First section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleFirst.scale, {
                    x: 15,
                    y: 15,
                    z: 15
                });

                //Second section
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleSecond.scale, {
                    x: 15,
                    y: 15,
                    z: 15
                });

                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleThird.scale, {
                    x: 15,
                    y: 15,
                    z: 15
                });

                //Progress bar

                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");

                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        gsap.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6
                            }
                        })
                        gsap.to(section, {
                            borderBottomLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6
                            }
                        })
                    }

                    if (section.classList.contains("left")) {
                        gsap.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6
                            }
                        })
                        gsap.to(section, {
                            borderBottomRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6
                            }
                        })
                    }

                    gsap.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false
                        }
                    })
                });

                //Mini platforms actions
                this.secondPartTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                    }
                });

                this.room.children.forEach((child) => {
                    if (child.name == "minifloor") {
                        this.first = gsap.to(child.position, {
                            x: -3.2397360801696777,
                            z: 6.929194450378418,
                            duration: 0.3
                        })
                    }
                    if (child.name == "mailbox")
                        this.second = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        });
                    if (child.name == "floor_first") {
                        this.fourth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name == "floor_second") {
                        this.fifth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name == "floor_third") {
                        this.sixth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name == "flower_1") {
                        this.eighth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name == "flower_2") {
                        this.ninth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name == "dirt") {
                        this.seventh = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name == "lamp") {
                        this.third = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                });

                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth, "-=0.2");
                this.secondPartTimeline.add(this.fifth, "-=0.2");
                this.secondPartTimeline.add(this.sixth, "-=0.2");
                this.secondPartTimeline.add(this.seventh, "-=0.2");
                this.secondPartTimeline.add(this.eighth);
                this.secondPartTimeline.add(this.ninth, "-=0.1");
            },
        })
    }

    resize() {
        // Código para ajustar el tamaño en caso necesario
    }

    update() {
        // Código de actualización
    }
}
