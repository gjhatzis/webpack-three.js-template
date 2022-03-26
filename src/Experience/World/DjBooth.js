import * as THREE from  'three'
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

        this.setModel()
    }

    setModel()
    {
        //Manipulate Model
        this.resource = this.resources.items.test_model
        this.model = this.resource.scene
        this.model.scale.set(60, 60, 60)

        this.model.traverse((child) => 
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
        
        //Add texture
        this.texture = {}
        this.texture.color = this.resources.items.color_texture
        this.texture.color.encoding = THREE.sRGBEncoding
        this.texture.color.repeat.set(1.5, 1.5)
        this.texture.color.wrapS = THREE.RepeatWrapping
        this.texture.color.wrapT = THREE.RepeatWrapping

        //Manipulate Material
        this.model.children[0].children[0].material.side = THREE.DoubleSide

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('Booth')
            this.debugFolder.add(this.model.rotation,'y').min(-5).max(5).step(0.001)
        }

        //Add model to the scene
        this.scene.add(this.model)
        console.log(this.model)
    }

    update()
    {
        //Rotate the model
        this.resource = this.resources.items.test_model
        this.model = this.resource.scene
        // this.model.rotation.y = Math.PI * this.time.elapsed * 0.00002
    }
}