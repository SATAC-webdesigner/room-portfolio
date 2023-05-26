import * as THREE from 'three';
import Experience from "./Experience";

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.useLegacyLights = true;
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
    }

    resize() {
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
    }
}