import { Factory, SketchComponentFactory } from "konect-api-types-ts";

import { SketchElbowMethodComponent } from "../../dataframe/SketchElbowMethodComponent";

type SketchElbowMethodJSON = {
    maxClusters: number;
}


@Factory(SketchElbowMethodComponent)
export default class SketchElbowMethodFactory implements SketchComponentFactory<SketchElbowMethodComponent> {

    fromJSON(rawJson: object): SketchElbowMethodComponent {
        const component = new SketchElbowMethodComponent();
        const json: SketchElbowMethodJSON = rawJson as SketchElbowMethodJSON;
        component.setMaxClusters(json.maxClusters ?? 0);
        return component;
    }
    toJSON(component: SketchElbowMethodComponent): object {
        const json: SketchElbowMethodJSON = {
            maxClusters: component.maxClusters ?? 0
        };

        return json;
    }
}