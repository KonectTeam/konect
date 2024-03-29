import { GenericSketchComponentClass } from "konect-api-types-ts";
import { Component } from 'vue';

// ----- Import of component with their configuration ----- //
import SketchNumberInputComponent from "../natif-components/SketchNumberInputComponent";
import SketchSequenceComponent from "..//natif-components/math/SketchSequenceComponent";
import { SketchMathFunctionComponent } from "..//natif-components/math/SketchMathFunctionComponent";
import { SketchLineChartComponent } from "..//natif-components/chart/SketchLineChartComponent";
import { SketchDataframeFromCSVComponent } from "..//natif-components/dataframe/SketchDataframeFromCSVComponent";
import { SketchDataframeViewerComponent } from "..//natif-components/dataframe/SketchDataframeViewerComponent";
import { SketchDataframeFilterColumnsComponent } from "..//natif-components/dataframe/SketchDataframeFilterColumnsComponent";
import { SketchKMeansComponent } from "..//natif-components/dataframe/SketchKMeans";
import { SketchScatterChartComponent } from "..//natif-components/chart/SketchScatterChartComponent";
import { SketchElbowMethodComponent } from "..//natif-components/dataframe/SketchElbowMethodComponent";
import { SketchDataframeShuffleComponent } from "..//natif-components/dataframe/SketchDataframeShuffleComponent";
import { SketchDataframeToCSVComponent } from "..//natif-components/dataframe/SketchDataframeToCSVComponent";
import { SketchDataframeUnionComponent } from "..//natif-components/dataframe/SketchDataframeUnionComponent";
import { SketchCustomFunctionComponent } from "..//natif-components/math/SketchCustomFunctionComponent";
import { SketchDerivativeFunctionComponent } from "../natif-components/math/SketchDerivativeFunctionComponent";

// ----- Import of the popups ----- //
import SketchLineChartPopup from '@/sketch/app/natif-components/ui/chart/SketchLineChartPopup.vue';
import SketchScatterChartPopup from '@/sketch/app/natif-components/ui/chart/SketchScatterChartPopup.vue';
import SketchNumberInputPopup from "@/sketch/app/natif-components/ui/SketchNumberInputPopup.vue";
import SketchDataframeFilterColumnsPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeFilterColumnsPopup.vue';
import SketchDataframeFromCSVPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeFromCSVPopup.vue';
import SketchDataframeShufflePopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeShufflePopup.vue';
import SketchDataframeToCSVPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeToCSVPopup.vue';
import SketchDataframeUnionPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeUnionPopup.vue';
import SketchDataframeViewerPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeViewerPopup.vue';
import SketchElbowMethodPopup from '@/sketch/app/natif-components/ui/dataframe/SketchElbowMethodPopup.vue';
import SketchKMeansPopup from '@/sketch/app/natif-components/ui/dataframe/SketchKMeansPopup.vue';
// for derivative and custom functions components
import SketchCustomFunctionPopup from '@/sketch/app/natif-components/ui/math/SketchCustomFunctionPopup.vue';
import SketchMathFunctionPopup from '@/sketch/app/natif-components/ui/math/SketchMathFunctionPopup.vue';
import SketchSequencePopup from "@/sketch/app/natif-components/ui/math/SketchSequencePopup.vue";

// ----- Imports of the factories ----- //
import SketchNumberFactory from "./factory/SketchNumberFactory";
import SketchSequenceFactory from "./factory/math/SketchSequenceFactory";
import SketchMathFunctionFactory from "./factory/math/SketchMathFunctionFactory";
import SketchLineChartFactory from "./factory/chart/SketchLineChartFactory";
import SketchScatterChartFactory from "./factory/chart/SketchScatterChartFactory";
import SketchDataframeFromCSVFactory from "./factory/dataframe/SketchDataframeFromCSVFactory";
import SketchDataframeViewerFactory from "./factory/dataframe/SketchDataframeViewerFactory";
import SketchDataframeFilterColumnsFactory from "./factory/dataframe/SketchDataframeFilterColumnsFactory";
import SketchKMeansFactory from "./factory/dataframe/SketchKMeansFactory";
import SketchElbowMethodFactory from "./factory/dataframe/SketchElbowMethodFactory";
import SketchDataframeShuffleFactory from "./factory/dataframe/SketchDataframeShuffleFactory";
import SketchDataframeToCSVFactory from "./factory/dataframe/SketchDataframeToCSVFactory";
import SketchDataframeUnionFactory from "./factory/dataframe/SketchDataframeUnionFactory";
import SketchCustomFunctionFactory from "./factory/math/SketchCustomFunctionFactory";
import SketchDerivativeFunctionFactory from "./factory/math/SketchDerivativeFunctionFactory";

export default [
    SketchNumberInputComponent,
    SketchSequenceComponent,
    SketchDataframeFromCSVComponent,
    SketchDataframeFilterColumnsComponent,
    SketchDerivativeFunctionComponent,
    SketchCustomFunctionComponent,
    SketchKMeansComponent,
    SketchElbowMethodComponent,
    SketchDataframeViewerComponent,
    SketchDataframeUnionComponent,
    SketchMathFunctionComponent,
    SketchDataframeToCSVComponent,
    SketchDataframeShuffleComponent,
    SketchLineChartComponent,
    SketchScatterChartComponent
]

// register all popup for the components
export const mapComponentWithPopup = new Map<GenericSketchComponentClass, Component>();

mapComponentWithPopup.set(SketchNumberInputComponent, SketchNumberInputPopup);
mapComponentWithPopup.set(SketchSequenceComponent, SketchSequencePopup);
mapComponentWithPopup.set(SketchDataframeFilterColumnsComponent, SketchDataframeFilterColumnsPopup);
mapComponentWithPopup.set(SketchDataframeFromCSVComponent, SketchDataframeFromCSVPopup);
mapComponentWithPopup.set(SketchDerivativeFunctionComponent, SketchCustomFunctionPopup);
mapComponentWithPopup.set(SketchCustomFunctionComponent, SketchCustomFunctionPopup);
mapComponentWithPopup.set(SketchKMeansComponent, SketchKMeansPopup);
mapComponentWithPopup.set(SketchElbowMethodComponent, SketchElbowMethodPopup);
mapComponentWithPopup.set(SketchDataframeViewerComponent, SketchDataframeViewerPopup);
mapComponentWithPopup.set(SketchDataframeUnionComponent, SketchDataframeUnionPopup);
mapComponentWithPopup.set(SketchMathFunctionComponent, SketchMathFunctionPopup);
mapComponentWithPopup.set(SketchDataframeToCSVComponent, SketchDataframeToCSVPopup);
mapComponentWithPopup.set(SketchDataframeShuffleComponent, SketchDataframeShufflePopup);
mapComponentWithPopup.set(SketchLineChartComponent, SketchLineChartPopup);
mapComponentWithPopup.set(SketchScatterChartComponent, SketchScatterChartPopup);

// register a factory for each component
export const factories = [
    SketchNumberFactory,
    SketchSequenceFactory,
    SketchDataframeFilterColumnsFactory,
    SketchDataframeFromCSVFactory,
    SketchDerivativeFunctionFactory,
    SketchCustomFunctionFactory,
    SketchKMeansFactory,
    SketchElbowMethodFactory,
    SketchDataframeViewerFactory,
    SketchDataframeUnionFactory,
    SketchMathFunctionFactory,
    SketchDataframeToCSVFactory,
    SketchDataframeShuffleFactory,
    SketchLineChartFactory,   
    SketchScatterChartFactory
];