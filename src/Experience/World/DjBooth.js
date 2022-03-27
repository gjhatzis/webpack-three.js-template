import * as THREE from  'three'
import { Vertex } from 'three'
import Experience from "../Experience.js"

export default class DjBooth
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.materials = this.experience.materials

        //Resource
        this.resource = this.resources.items.test_model

        this.parseModel()
        this.setMaterial()

    }

    parseModel()
    {
        //Model
        this.model = this.resource.scene

        this.model.traverse((child) => 
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        //Objects
        this.poster1 = this.model.children[0].children[0].children[8]
        this.room = this.model.children[0].children[0].children[1]

        this.lamp1Color = '#FF10F0'
        
        this.lamp1 = this.model.children[0].children[0].children[5]
        this.lamp1.material.emissive = new THREE.Color(this.lamp1Color)

        console.log(this.lamp1.material)
        
        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('Booth')
            this.debugFolder.add(this.model.rotation,'y').min(-5).max(5).step(0.001)
        }
    }

    setMaterial()
    {
        this.resources.on('texturesMapped', ()=>
        {
            this.poster1.material = this.materials.poster1Material
        })

        //Add model to the scene
        this.scene.add(this.model)
    }

    update()
    {
        //Rotate the model
        this.resource = this.resources.items.test_model
        this.model = this.resource.scene
        // this.model.rotation.y = Math.PI * this.time.elapsed * 0.00002
    }
}