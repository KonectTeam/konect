import { ComponentConfiguration, ComponentSlotConfiguration } from "./component-configuration";
import SketchComponent from "./sketch-component";
import { Class } from "./types";

import { library } from "@fortawesome/fontawesome-svg-core";

export type SketchComponentConfigurations = Map<Class<SketchComponent<unknown>>, ComponentConfiguration>;

const configurations: SketchComponentConfigurations = new Map<Class<SketchComponent<unknown>>, ComponentConfiguration>();

import { SketchNumberInputComponent, configuration as SketchNumberInputConfiguration } from "../app/natif-components/SketchNumberInputComponent";
import { SketchSequenceComponent, configuration as SketchSequenceConfiguration } from "../app/natif-components/math/SketchSequenceComponent";
import { SketchMathFunctionComponent, configuration as SketchMathFunctionConfiguration } from "../app/natif-components/math/SketchMathFunctionComponent";
import { SketchLineChartComponent, configuration as SketchLineChartConfiguration } from "../app/natif-components/chart/SketchLineChartComponent";
import { SketchDataframeFromCSVComponent, configuration as SketchDataframeFromCSVConfiguration } from "../app/natif-components/dataframe/SketchDataframeFromCSVComponent";
import { SketchDataframeViewerComponent, configuration as SketchDataframeViewerConfiguration } from "../app/natif-components/dataframe/SketchDataframeViewerComponent";
import { SketchDataframeFilterColumnsComponent, configuration as SketchDataFilterColumnsConfiguration } from "../app/natif-components/dataframe/SketchDataframeFilterColumnsComponent";

export const registerConfigurations = () => {
    // Number input component
    configurations.set(SketchNumberInputComponent, SketchNumberInputConfiguration);
    library.add(SketchNumberInputConfiguration.icon.fa);

    // sequence component
    configurations.set(SketchSequenceComponent, SketchSequenceConfiguration);
    library.add(SketchSequenceConfiguration.icon.fa);

    // math function component
    configurations.set(SketchMathFunctionComponent, SketchMathFunctionConfiguration);
    library.add(SketchMathFunctionConfiguration.icon.fa);

    // line chart component
    configurations.set(SketchLineChartComponent, SketchLineChartConfiguration);
    library.add(SketchLineChartConfiguration.icon.fa);

    // dataframe CSV loader
    configurations.set(SketchDataframeFromCSVComponent, SketchDataframeFromCSVConfiguration);
    library.add(SketchDataframeFromCSVConfiguration.icon.fa);

    // dataframe viewer
    configurations.set(SketchDataframeViewerComponent, SketchDataframeViewerConfiguration);
    library.add(SketchDataframeViewerConfiguration.icon.fa);

    // dataframe filter columns
    configurations.set(SketchDataframeFilterColumnsComponent, SketchDataFilterColumnsConfiguration);
    library.add(SketchDataFilterColumnsConfiguration.icon.fa);
}

export function getConfigurationOf(componentClass: Class<SketchComponent<unknown>>) : ComponentConfiguration
{
    return configurations.get(componentClass) as ComponentConfiguration;
}

export function getConfigurations() : SketchComponentConfigurations {
    return configurations;
}

export function getSlotByEntryName(entries: Array<ComponentSlotConfiguration>, entryName: string) : ComponentSlotConfiguration | undefined {
    const results = entries.filter(entry => entry.entryName === entryName);
    return results.length > 0 ? results[0] : undefined;
}

export function canCreateLinkBetween(sourceComponent: SketchComponent<unknown>,
    targetComponent: SketchComponent<unknown>,
    entryName: string) : boolean
{
    if (targetComponent === sourceComponent) {
        return false;
    }
    
    const sourceConfiguration: ComponentConfiguration = getConfigurationOf(sourceComponent.constructor as Class<SketchComponent<unknown>>);
    const targetConfiguration: ComponentConfiguration = getConfigurationOf(targetComponent.constructor as Class<SketchComponent<unknown>>);

    if (!targetConfiguration.slotsConfigurations) {
        return false;
    }

    if (!sourceConfiguration.returnType) {
        return false;
    }

    const targetSlot = getSlotByEntryName(targetConfiguration.slotsConfigurations, entryName);
    if ((targetSlot?.type !== sourceConfiguration.returnType)) {
        return false;
    }

    return true;
}