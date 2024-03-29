import { SketchKMeansComponent } from "../../dataframe/SketchKMeans";

import { Factory, SketchComponentFactory } from "konect-api-types-ts";

interface SketchKMeansJSON {
    clusters: number;
}

@Factory(SketchKMeansComponent)
export default class SketchKMeansFactory implements SketchComponentFactory<SketchKMeansComponent> {
    
    fromJSON(rawJson: object): SketchKMeansComponent {
        const component = new SketchKMeansComponent();
        const json: SketchKMeansJSON = rawJson as SketchKMeansJSON;
        component.setClusters(json.clusters ?? 0);
        return component;
    }
    toJSON(component: SketchKMeansComponent): object {
        const json: SketchKMeansJSON = {
            clusters: component.clusters ?? 0
        };

        return json;
    }
}