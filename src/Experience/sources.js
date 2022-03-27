export default [

    //Models
    {
        name: 'test_model',
        type: 'gltfModel',
        path: 'models/talos_mats.glb'
    },

    //Textures
    {
        name: 'color_texture',
        type: 'texture',
        path: 'textures/mixcloud.jpg'
    },

    {
        name: 'back_texture',
        type: 'texture',
        path: 'textures/back.png'
    },

    //KTX Textures
    // {
    //     name: 'color_texture',
    //     type: 'KTX2Texture',
    //     path: 'textures/example.ktx2'
    // },


    //Cube Texture
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
            [
                'textures/environmentMap/px.png',
                'textures/environmentMap/nx.png',
                'textures/environmentMap/py.png',
                'textures/environmentMap/ny.png',
                'textures/environmentMap/pz.png',
                'textures/environmentMap/nz.png'
            ]
    }
]