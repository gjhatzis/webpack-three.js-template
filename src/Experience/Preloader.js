import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js'

export default class PreLoader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes

        this.overlay = document.querySelector('.overlay')
        this.loadingBar = document.querySelector('.loading-bar')
        this.welcomeButton = document.querySelector('.welcome-button')

        this.resources.on('ready', ()=>
        {
            window.setTimeout(()=>{
                this.loadingBar.classList.add('fade-out')
                this.welcomeButton.classList.add('fade-in')
            })

            this.welcomeButton.addEventListener('click', ()=>
            {
                this.welcomeButton.remove()
                this.overlay.classList.add('fade-out')
            })
        })
    }
}