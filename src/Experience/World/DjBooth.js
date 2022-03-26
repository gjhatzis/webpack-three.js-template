import * as THREE from  'three'
import { DoubleSide } from 'three'
import Experience from "../Experience.js"

export default class DjBooth
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModel()
      
    }

    setModel()
    {
        //Model
        this.djBooth = this.resources.items.test_model.scene
        

        //Add texture
        this.texture = {}
        this.texture.color = this.resources.items.color_texture
        this.texture.color.encoding = THREE.sRGBEncoding
        this.texture.color.repeat.set(1.5, 1.5)
        this.texture.color.wrapS = THREE.RepeatWrapping
        this.texture.color.wrapT = THREE.RepeatWrapping

        //Manipulate Material
        this.djBooth.children[0].children[0].material.side = THREE.DoubleSide

        //Manipulate Model
        this.djBooth.scale.set(60, 60, 60)

        //Add model to the scene
        this.scene.add(this.djBooth)
    }

}