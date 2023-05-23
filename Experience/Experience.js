import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';

export default class Experience {
    static instance
    constructor(canvas) {
        if(Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas;
    };
}