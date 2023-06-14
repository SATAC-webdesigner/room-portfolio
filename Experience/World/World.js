import * as THREE from 'three';
import Experience from "../Experience";

import Room from './Room';
import Environment from './Enviroment';
import {EventEmitter} from 'events';

export default class World extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on('loaded', () => {
            this.room = new Room();
            this.environment = new Environment();
            this.emit("worldready");
        });

        this.theme.on("switch", (theme) => {
            this.environment.switchTheme(theme);
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