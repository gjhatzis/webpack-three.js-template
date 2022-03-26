export default [

    //Models
    {
        name: 'test_model',
        type: 'gltfModel',
        path: 'models/tiesto.glb'
    },

    //Textures
    {
        name: 'color_texture',
        type: 'texture',
        path: 'textures/mixcloud.jpg'
    },

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