import { SketchKMeansComponent } from "../../dataframe/SketchKMeans";

import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

interface SketchKMeansJSON {
    clusters: number;
}

export default class SketchKMeansFactory implements SketchComponentFactory<SketchKMeansComponent> {
    
    fromJSON(rawJson: string): SketchKMeansComponent {
        const component = new SketchKMeansComponent();
        const json: SketchKMeansJSON = JSON.parse(rawJson);
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