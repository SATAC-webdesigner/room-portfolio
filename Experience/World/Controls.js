import * as THREE from 'three';
import Experience from "../Experience";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.sizes = this.experience.sizes;

        gsap.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath() {
        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true
            }
        });

        this.timeline.to(this.room.position, {
            x: () => {
                return this.sizes.width * 0.00128
            }
        });
    }

    resize() {
        // Código para ajustar el tamaño en caso necesario
    }

    update() {
        // Código de actualización
    }
}
