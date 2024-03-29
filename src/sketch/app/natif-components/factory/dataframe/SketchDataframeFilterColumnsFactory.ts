import { Factory, SketchComponentFactory } from "konect-api-types-ts";

import { SketchDataframeFilterColumnsComponent } from "../../dataframe/SketchDataframeFilterColumnsComponent";

interface SketchDataframeFilterColumnsJSON {
    selectedColumns: Array<string>;
}

@Factory(SketchDataframeFilterColumnsComponent)
export default class SketchDataframeFilterColumnsFactory implements SketchComponentFactory<SketchDataframeFilterColumnsComponent> {
    
    fromJSON(rawJson: object): SketchDataframeFilterColumnsComponent {
        const component = new SketchDataframeFilterColumnsComponent();
        const json: SketchDataframeFilterColumnsJSON = rawJson as SketchDataframeFilterColumnsJSON;
        component.setSelectedColumns(json.selectedColumns ?? []);
        return component;
    }
    toJSON(component: SketchDataframeFilterColumnsComponent): object {
        const json: SketchDataframeFilterColumnsJSON = {
            selectedColumns: component.selectedColumns
        };

        return json;
    }
}