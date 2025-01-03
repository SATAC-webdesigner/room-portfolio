import * as THREE from 'three';
import Experience from "../Experience";
import { gsap } from 'gsap';
import GUI from 'lil-gui';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        // this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };

        this.setSunLight();
        // this.setGUI();
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });

        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        });

    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 1.5);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1, 7, 3);
        this.scene.add(this.sunLight);
        // this.helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(this.helper);
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme) {
        if (theme === "dark") {
            gsap.to(this.sunLight.color, {
                b: 0.6862745098039216,
                g: 0.23137254901960785,
                r: 0.17254901960784313
            });
            gsap.to(this.ambientLight.color, {
                b: 0.6862745098039216,
                g: 0.23137254901960785,
                r: 0.17254901960784313
            });
            gsap.to(this.sunLight, {
                intensity: 0.78
            });
            gsap.to(this.ambientLight, {
                intensity: 0.78
            });
        } else {
            gsap.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1
            });
            gsap.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1
            });
            gsap.to(this.sunLight, {
                intensity: 1.5
            });
            gsap.to(this.ambientLight, {
                intensity: 1
            });
        }
    }

    resize() {

    }

    update() {

    }
}