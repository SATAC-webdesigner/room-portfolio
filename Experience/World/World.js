import * as THREE from 'three';
import Experience from "../Experience";

import Room from './Room';
import Environment from './Enviroment';

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
        });
    }

    resize() {
        
    }

    update() {
        
    }
}