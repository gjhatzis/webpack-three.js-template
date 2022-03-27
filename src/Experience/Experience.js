import * as THREE from 'three'
import Camera from './Camera.js'
import PreLoader from './Preloader.js'
import Raycaster from './Raycaster.js'
import Renderer from './Renderer.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'
import Resources from './Utils/Resources.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Materials from './World/Materials.js'
import World from './World/World.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {   
        //Singleton
        if(instance)
        {
            return instance
        }

        instance = this

        //Global access
        window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.scene = new THREE.Scene()
        this.sizes = new Sizes()
        
        this.time  = new  Time()
        this.camera =  new Camera()

        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        this.preloader = new PreLoader()

        this.world = new World()
        this.materials = new Materials()
        this.raycaster = new Raycaster()

        //Sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()    
        })

        //Time tick event
        this.time.on('tick', () => 
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        //Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        
        if(this.debug.active)
        {
            this.debug.gui.destroy()
        }
    }
}