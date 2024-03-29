/* eslint-disable @typescript-eslint/no-unused-vars */
import { SketchComponentFactory, Factory } from "konect-api-types-ts";

import { SketchScatterChartComponent } from "../../chart/SketchScatterChartComponent";

@Factory(SketchScatterChartComponent)
export default class SketchScatterChartFactory implements SketchComponentFactory<SketchScatterChartComponent> {
    
    fromJSON(json: object): SketchScatterChartComponent {
        return new SketchScatterChartComponent();
    }

    toJSON(component: SketchScatterChartComponent): object {
        return {};
    }
}