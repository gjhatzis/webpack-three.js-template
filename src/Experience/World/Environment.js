import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.materials = this.experience.materials

        //Adds lights to the scene
        this.setDirectionalLight()

        //Adds environment map to the scene
        this.setEnvironmentMap()
    }

    setDirectionalLight()
    {
        this.DirectionalLight = new THREE.DirectionalLight('#ffffff', 4)
        this.DirectionalLight.castShadow = true
        this.DirectionalLight.shadow.camera.far = 15
        this.DirectionalLight.shadow.mapSize.set(1024, 1024)
        this.DirectionalLight.shadow.normalBias = 0.05
        this.DirectionalLight.position.set(3, 3, -2.25)
        this.scene.add(this.DirectionalLight)

        if(this.debug.active)
        {
            this.debugLightFolder = this.debug.gui.addFolder('DirLight')
            this.debugLightFolder.add(this.DirectionalLight.position, 'x').min(-5).max(5).step(0.001)
            this.debugLightFolder.add(this.DirectionalLight.position, 'y').min(-5).max(5).step(0.001)
            this.debugLightFolder.add(this.DirectionalLight.position, 'z').min(-5).max(5).step(0.001)
            
        }
    }

    setEnvironmentMap()
    {

        this.resources.on('texturesMapped', ()=>
        {
            this.environmentMap = {}
            this.environmentMap.texture = this.materials.envMapTexture
            this.environmentMap.intensity = 0.4
            this.environmentMap.texture.encoding = THREE.sRGBEncoding
    
            this.scene.background = this.environmentMap.texture
            this.scene.environment = this.environmentMap.texture

            this.environmentMap.updateMaterial = () => 
            {
                this.scene.traverse((child) => 
                {
                    if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                    {
                        child.material.envMap = this.environmentMap.texture
                        child.material.envMapIntensity = this.environmentMap.intensity
                        child.material.needsUpdate = true
                    }
                })
            }
    
            this.environmentMap.updateMaterial()
    
            if(this.debug.active)
            {
                this.debugEnvFolder = this.debug.gui.addFolder('EnvMap')
                this.debugEnvFolder.add(this.environmentMap, 'intensity').min(0).max(4).step(0.001).onChange(this.environmentMap.updateMaterial)
            }
        })
    }
}