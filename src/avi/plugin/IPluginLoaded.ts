import {PluginModel} from "./PluginModel";
/**
 * Created by johan on 11/11/2015.
 */
export interface IPluginLoaded {
    onPluginsLoaded(plugins:Array<PluginModel>);
}