import { Component, SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { SketchWrapper } from "konect-api-types-ts";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will load a dataframe from
 * a csv file
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Dataframe',
    name: 'CSV Loader',
    returnType: DataFrame,
    icon: {
        name: 'fa-file-csv',
        fa: faFileCsv
    }
})
export class SketchDataframeFromCSVComponent extends SketchComponent<DataFrame> {
    
    private _wrapper: SketchWrapper<File>;

    private data: DataFrame | undefined;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    execute(): DataFrame {
        if (!this.wrapper.isDataAvailable()) {
            throw 'No file set to load dataframe';
        }

        if (this.data) {
            return this.data as DataFrame;
        }

        throw 'No data set to load dataframe';
    }

    async beforeExecute() {
        if (this.wrapper.isDataAvailable()) {
            DataFrame.fromCSV(this.wrapper.getData()).then(data => this.data = data);
        }
    }

    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    get wrapper(): SketchWrapper<File> { return this._wrapper; }
    
    async setCSVFile(file: File) {
        this.wrapper.setData(file);
        this.data = await DataFrame.fromCSV(file);
    }
}