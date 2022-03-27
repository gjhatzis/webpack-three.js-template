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

        this.planeMaterial2 = new THREE.MeshStandardMaterial(
            {
                color: 'black', 
                side: THREE.DoubleSide
            })
        this.planeGeometry2 = new THREE.PlaneBufferGeometry(2,2)

        this.model2 = new THREE.Mesh(this.planeGeometry2, this.planeMaterial2)
        this.model2.position.y  = 2.5
        this.model2.position.z= -7
        this.model2.rotation.x = 4

        this.planeMaterial3 = new THREE.MeshStandardMaterial(
            {
                color: 'white',
                map: this.resources.items.back_texture, 
                side: THREE.DoubleSide
            })
        this.planeGeometry3 = new THREE.PlaneBufferGeometry(0.5,0.5)

        this.model3 = new THREE.Mesh(this.planeGeometry3, this.planeMaterial3)
        this.model3.position.y  = 3
        this.model3.position.z= -7.002
        this.model3.rotation.x = 4

        if(this.debug.active)
        {
            this.testFolder = this.debug.gui.addFolder('test')
            this.testFolder.add(this.model2.position, 'x').min(-20).max(20).step(0.001)
            this.testFolder.add(this.model2.position, 'y').min(-20).max(20).step(0.001)
            this.testFolder.add(this.model2.position, 'z').min(-20).max(20).step(0.001)
            this.testFolder.add(this.model2.rotation, 'x').min(-20).max(20).step(0.001)
            this.testFolder.add(this.model2.rotation, 'y').min(-20).max(20).step(0.001)
            this.testFolder.add(this.model2.rotation, 'z').min(-20).max(20).step(0.001)
        }
        this.scene.add(this.model, this.model2, this.model3)
        console.log(this.model)
    }
}