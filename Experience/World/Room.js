import * as THREE from 'three';
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if (child.name === "aquarium") {
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x6c91ac);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
            }

            if (child && child.name === "computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                    side: THREE.BackSide
                });
            }

            if (child.name === "minifloor") {
                child.position.set(-0.53409, -0.364799,4.22354);
            }
            
            child.scale.set(0,0,0);

            if (child.name === "animation_cube") {
                child.position.set(0, -0.9, 0);
                child.rotation.y = -Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
            
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.2, 0.2, 0.2);
        this.actualRoom.rotation.y = Math.PI / 2;

        //RectLight

        // const width = 0.4;
        // const height = 1.1;
        const width = 0;
        const height = 0;
        const intensity = 7;
        this.rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        this.rectLight.position.set(3.8, 4.02018, -1.5);
        this.rectLight.rotation.x = -Math.PI / 2;
        this.rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add(this.rectLight);

        this.roomChildren["rectlight"] = this.rectLight;

        //Circles

        const geometry = new THREE.CircleGeometry(5, 54);

        const material = new THREE.MeshStandardMaterial({ color: 0x7faae9 });
        const material2 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
        const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);

        this.circleFirst.position.y = -1.29;
        this.circleSecond.position.y = -1.28;
        this.circleThird.position.y = -1.27;

        this.circleFirst.receiveShadow = true;
        this.circleSecond.receiveShadow = true;
        this.circleThird.receiveShadow = true;

        this.circleFirst.rotation.x = -Math.PI / 2;
        this.circleSecond.rotation.x = -Math.PI / 2;
        this.circleThird.rotation.x = -Math.PI / 2;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);

        this.circleFirst.name = "Circle1";
        this.circleSecond.name = "Circle2";
        this.circleThird.name = "Circle3";

        this.actualRoom.add(this.circleFirst);
        this.actualRoom.add(this.circleSecond);
        this.actualRoom.add(this.circleThird);

        //Floor

        this.geometry = new THREE.PlaneGeometry(200, 200);
        this.material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.BackSide });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.actualRoom.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -1.3;
        this.plane.receiveShadow = true;

        // const rectLightHelper = new RectAreaLightHelper(this.rectLight);
        // this.rectLight.add(rectLightHelper);
    }

    setAnimation() {
        // this.mixer = new THREE.AnimationMixer(this.actualRoom);
        // this.swim = this.mixer.clipAction(this.room.animations[6]);
        // this.swim.play();
    }

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }


    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

        this.actualRoom.rotation.y = this.lerp.current;

        // this.mixer.update(this.time.delta * 0.0009);
    }
}