import * as THREE from 'three';
import Experience from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;


        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );

        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 12;
        this.perspectiveCamera.position.y = 20;
    }

    createOrthographicCamera() {
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.frustrum) / 2,
            (this.sizes.aspect * this.frustrum) / 2,
            this.frustrum / 2,
            -this.frustrum / 2,
            -50,
            50
        );

        this.orthographicCamera.position.z = 5;
        this.orthographicCamera.position.y = 3.5;

        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        const size = 20;
        // const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(size);
        // this.scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom =false;
    }

    resize() {
        //updating prespective camera
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        //updating orthographic camera
        this.orthographicCamera.left = (-this.sizes.aspect * this.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.frustrum) / 2;
        this.orthographicCamera.top = this.frustrum / 2;
        this.orthographicCamera.bottom = -this.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
}