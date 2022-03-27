import * as THREE from 'three'
import gsap from 'gsap'
import Experience from './Experience'

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.sizes = this.experience.sizes
        this.controls = this.experience.camera.controls
        this.debug = this.experience.debug

        this.resources.on('ready', ()=>
        {
            this.poster1 = this.experience.world.plane.model

            this.raycaster = new THREE.Raycaster()
            this.cursor = new THREE.Vector2()

            //Objects to test if intersecting
            this.obgjectsToTest = [
                this.poster1
            ]

            window.addEventListener('click', (event)=>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1
                this.click(this.cursor)
            })
        })  
    }

    click(cursor)
    {
        this.raycaster.setFromCamera(cursor, this.camera)

        this.inteserctsObjects = this.raycaster.intersectObjects(this.obgjectsToTest)
        if(this.inteserctsObjects.length)
        {
            this.selectedModel = this.inteserctsObjects[0].object
            switch(this.selectedModel)
            {
                case this.poster1: 
                    gsap.to(this.camera.position, {
                        duration: 2,
                        ease: 'power1.inOut',
                        x: 0,
                        y: 4,
                        z: 0
                    })

                    gsap.to(this.controls.target, {
                        duration: 2,
                        ease: 'power1.inOut',
                        x: 9.99,
                        y: 1.3,
                        z: 0
                    })

                    if(this.debug.active)
                    {
                        this.cameraPosition = this.debug.gui.addFolder('Camera Position')
                        this.cameraPosition.add(this.camera.position, 'x').min(-10).max(10).step(0.001)
                        this.cameraPosition.add(this.camera.position, 'y').min(-10).max(10).step(0.001)
                        this.cameraPosition.add(this.camera.position, 'z').min(-10).max(10).step(0.001)
                        
                        this.cameraTarget = this.debug.gui.addFolder('Camera Target')
                        this.cameraTarget.add(this.controls.target, 'x').min(-10).max(10).step(0.001)
                        this.cameraTarget.add(this.controls.target, 'y').min(-10).max(10).step(0.001)
                        this.cameraTarget.add(this.controls.target, 'z').min(-10).max(10).step(0.001)
                    }

                    this.controls.minPolarAngle = Math.PI * .2 // up
                    this.controls.maxPolarAngle = Math.PI * .4 //down
                    
                break
            }
        }
    }
}