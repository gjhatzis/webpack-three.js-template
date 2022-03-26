import Experience from "../Experience.js";
import DjBooth from './DjBooth.js';
import Environment from './Environment.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //Wait for the resources
        this.resources.on('ready',() =>
        {
            this.djBooth = new DjBooth()
            this.environment = new Environment()
        })

    }

    update()
    {
        if(this.djBooth)
        {
            this.djBooth.update()
        }
    }
}