import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Materials
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        // Wait for textures
        this.resources.on('ready', () =>
        {
            this.mapTextures()
        })

    }

    mapTextures()
    {
        this.poster1Material = new THREE.MeshStandardMaterial(
            {
                color: new THREE.Color(),
                map: this.resources.items.color_texture
            })

        this.envMapTexture = this.resources.items.environmentMapTexture

        this.resources.trigger('texturesMapped')
    }
}