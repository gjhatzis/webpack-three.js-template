import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Plane {
    constructor() {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.materials = this.experience.materials

        this.setModel()
    }


    setModel()
    {
        this.planeMaterial = new THREE.MeshStandardMaterial({map: this.resources.items.color_texture})
        this.planeGeometry = new THREE.PlaneBufferGeometry(2,2)

        this.model = new THREE.Mesh(this.planeGeometry, this.planeMaterial)
        this.model.position.y  = 2
        this.scene.add(this.model)
        console.log(this.model)
    }
}