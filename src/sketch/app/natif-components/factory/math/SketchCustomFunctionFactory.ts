import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchCustomFunctionComponent } from "../../math/SketchCustomFunctionComponent";

type SketchCustomFunctionJSON = {
    customFunction: string;
}

export default class SketchCustomFunctionFactory implements SketchComponentFactory<SketchCustomFunctionComponent> {
    
    fromJSON(rawJson: string): SketchCustomFunctionComponent {
        const component = new SketchCustomFunctionComponent();
        const json: SketchCustomFunctionJSON = JSON.parse(rawJson);
        component.setCustomFunction(json.customFunction ?? '');
        return component;
    }
    toJSON(component: SketchCustomFunctionComponent): object {
        const json: SketchCustomFunctionJSON = {
            customFunction: component.customFunction ?? ''
        };

        return json;
    }
}