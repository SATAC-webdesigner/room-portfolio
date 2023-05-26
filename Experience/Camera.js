import * as THREE from 'three';
import Experience from "./Experience";

export default class Camera {
    constructor() {
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

    resize() {
        //updating prespective camera
        this.PerspectiveCamera.aspect = this.sizes.aspect;
        this.PerspectiveCamera.updateProjectionMatrix();

        //updating orthographic camera
        this.OrthographicCamera.left = (-this.sizes.aspect * this.frustrum) / 2;
        this.OrthographicCamera.right = (this.sizes.aspect * this.frustrum) / 2;
        this.OrthographicCamera.top = this.frustrum / 2;
        this.OrthographicCamera.bottom = -this.frustrum / 2;
        this.OrthographicCamera.updateProjectionMatrix();
    }

    update() {
    }
}