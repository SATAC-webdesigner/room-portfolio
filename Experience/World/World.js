import * as THREE from 'three';
import Experience from "../Experience";

import Room from './Room';
import Environment from './Enviroment';
import Controls from './Controls';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on('loaded', () => {
            this.room = new Room();
            console.log("created room");
            this.environment = new Environment();
            this.controls = new Controls();
        });
    }

    resize() {
        
    }

    update() {
        if (this.room) {
            this.room.update();
        }

        if (this.controls) {
            this.controls.update();
        }
    }
}