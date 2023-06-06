import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Times from './Utils/Time.js';

import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Resources from './Utils/Resources.js';

import World from './World/World.js';
import assets from './Utils/Assets.js';

export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.time = new Times();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();

        this.time.on("update", () => {
            this.update();
        });

        this.sizes.on("resize", () => {
            this.resize();
        });
    };

    resize() {
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }
}


