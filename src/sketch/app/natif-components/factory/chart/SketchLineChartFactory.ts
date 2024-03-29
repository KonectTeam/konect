/* eslint-disable @typescript-eslint/no-unused-vars */
import { SketchComponentFactory, Factory } from "konect-api-types-ts";

import { SketchLineChartComponent } from "../../chart/SketchLineChartComponent";

@Factory(SketchLineChartComponent)
export default class SketchLineChartFactory implements SketchComponentFactory<SketchLineChartComponent> {
    
    fromJSON(json: object): SketchLineChartComponent {
        return new SketchLineChartComponent();
    }

    toJSON(component: SketchLineChartComponent): object {
        return {};
    }
}