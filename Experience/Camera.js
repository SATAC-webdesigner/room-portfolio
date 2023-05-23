import * as THREE from 'three';
import Experience from "./Experience";

export default class Camera {
    constructor(sizes) {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;


        this.createPerspectiveCamera();
        this.createOrthographicCamera();
    }

    createPerspectiveCamera() {
        this.PerspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );

        this.scene.add(this.PerspectiveCamera);
    }

    createOrthographicCamera() {
        this.frustrum = 5;
        this.OrthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.frustrum) / 2,
            (this.sizes.aspect * this.frustrum) / 2,
            this.frustrum / 2,
            -this.frustrum / 2,
            -100,
            100
        );

        this.scene.add(this.OrthographicCamera);
    }
}