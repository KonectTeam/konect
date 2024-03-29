import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will filter the columns of a dataframe
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Dataframe',
    name: 'Filter columns',
    returnType: DataFrame,
    icon: {
        name: 'fa-filter',
        fa: faFilter
    },
})
export class SketchDataframeFilterColumnsComponent extends SketchComponent<DataFrame> {
    
    private _selectedColumns: Array<string>;

    private _dataframe: DataFrame | undefined;

    constructor() {
        super();
        this._selectedColumns = []
    }

    execute(): DataFrame {
        if (!this._dataframe) {
            throw 'No dataframe available';
        }

        return this._dataframe.select(...this.selectedColumns);
    }


    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    get selectedColumns(): Array<string> { return this._selectedColumns; }
    setSelectedColumns(columns: Array<string>) { this._selectedColumns = columns; }


    get dataframe(): DataFrame | undefined { return this._dataframe; }

    @Entry("dataframe", DataFrame)
    setData(data: DataFrame) {
        this._dataframe = data;
    }

}