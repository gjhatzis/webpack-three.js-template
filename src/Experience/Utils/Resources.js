import * as THREE from 'three'
import Experience from '../Experience.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        //Options
        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance
        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}

        //Loading Manager
        this.loaders.loadingManager = new THREE.LoadingManager()

        //Draco Loader
        this.loaders.dracoLoader = new DRACOLoader
        this.loaders.dracoLoader.setDecoderPath('/draco/')

        //GLTF Loader
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)

        //Texture Loader
        this.loaders.textureLoader = new THREE.TextureLoader()

        //Cube Texture Loader
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

        //Basis Texture Loader
        this.loaders.basisTextureLoader = new KTX2Loader()
        this.loaders.basisTextureLoader.setTranscoderPath('/basis/')
        this.loaders.basisTextureLoader.detectSupport( this.renderer )
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'basisTexture')
            {
                this.loaders.basisTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        file.encoding = THREE.sRGBEncoding
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        file.encoding =  THREE.sRGBEncoding
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
         
    }
}