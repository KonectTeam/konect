<template>
    <div ref="ui">
        <Vue3DraggableResizable class="component-ui text-center"
            :initW="componentUIConfiguration.width"
            :initH="componentUIConfiguration.height"
            v-model:x="componentUIConfiguration.x"
            v-model:y="componentUIConfiguration.y"
            :active="true"
            :draggable="true"
            :resizable="true"
            @dragging="$emit('on-drag', componentModel, $event.x, $event.y)"
            @click="onClick"
            @dblclick="openPopupConfiguration"
            :style="{ backgroundColor: componentModel.config.backgroundColor }"
        >
        <div class="border-0 d-flex mh-100" style="height: 100%">            
            <div class="w-25">
                <div v-if="inputSlotModels.length" class="d-flex flex-column slot-container">
                    <div 
                    v-for="(slotConfiguration, index) in inputSlotModels" :key="index"
                        class="slot input-slot"
                        :class="{ 'selected-slot': slotConfiguration.isSelected }"
                        @click="selectSlot($event, slotConfiguration as ComponentSlotModel)"
                        :ref="`${componentModel.component.getID()}-${slotConfiguration.entryName}`"
                    >
                        <v-tooltip activator="parent" location="start">
                            {{  slotConfiguration.entryName }}
                        </v-tooltip>
                        <pre></pre>
                    </div>
                </div>
            </div>
            <div class="table p-1 w-50">
                <div class="row-fluid">
                    <font-awesome-icon :icon="`fa-solid ${configuration.config.icon.name}`"
                        :style="{ color: componentModel.config.iconColor }"
                    ></font-awesome-icon>
                    <br/>
                    <span class="align-text-bottom noselect" style="word-wrap: break-word;" :style="{ color: componentModel.config.text.color }">
                        {{ componentModel.config.text.value }}
                    </span>
                    <br/>
                    <font-awesome-icon v-if="configuration.config.returnType"
                        icon="fa-solid fa-play"
                        class="play-icon"
                        @click="bus.emit('ask-for-execution', componentModel.component)"    
                    ></font-awesome-icon>
                </div>
            </div>

            <div v-if="outputSlotModel" class="slot-container d-flex flex-column w-25">
                <div
                    :ref="`${componentModel.component.getID()}-out`"
                    @click="selectSlot($event, outputSlotModel as ComponentSlotModel)"
                >
                    <font-awesome-icon
                    icon="fa-solid fa-play"
                    :style="{ 'color': outputSlotModel.isSelected ? 'red' : 'black' }"
                    class="play-icon"
                    style="height: 20px;"
                    ></font-awesome-icon>
                </div>
            </div>
        </div>
        </Vue3DraggableResizable>
        <component v-if="popupVisible"
            :is="popup"
            :component="componentModel.component"
            @close-popup="onClosePopup"
        ></component>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType, Component } from 'vue';

import Vue3DraggableResizable from 'vue3-draggable-resizable';
import { ComponentConfiguration } from '@/sketch/app/core/sketch-component-configuration-manager';

import { ComponentSlotModel } from '../utils';
import { opt } from 'konect-api-types-ts';
import { GenericSketchComponentClass } from 'konect-api-types-ts';
import bus from '../../core/bus';
import { ComponentModel } from '../utils';
import getPopupByComponentClass from '../../core/sketch-popup-manager';

export default defineComponent({
    components: {
        Vue3DraggableResizable,
    },
    props: {
        configuration: {
            required: true,
            type: Object as PropType<ComponentConfiguration>
        },
        componentModel: {
            required: true,
            type: Object as PropType<ComponentModel>
        }
    },
    data() {
        return {
            componentUIConfiguration: {
                height: 130,
                width: 130,
                x: this.componentModel.x,
                y: this.componentModel.y,
            },
            inputSlotModels: Array<ComponentSlotModel>(),
            outputSlotModel: opt<ComponentSlotModel>(),
            popupVisible: false,
            componentName: this.configuration.config.name,
            bus
        }
    },
    beforeMount() {
        if (this.$props.configuration) {
            const entries = this.$props.configuration.entries ?? [];
            const models: Array<ComponentSlotModel> = entries.map(configuration => {
                return {
                    isSelected: false,
                    targetComponent: this.componentModel.component,
                    entryName: configuration.entryName,
                    type: 'in'
                }
            })

            this.inputSlotModels.push(...models);
        }

        if (this.$props.configuration.config.returnType) {
            this.outputSlotModel = {
                isSelected: false,
                targetComponent: this.componentModel.component,
                type: 'out'
            }
        }
    },
    computed: {
        popup() : Component {
            return getPopupByComponentClass(this.componentModel.component.constructor as GenericSketchComponentClass) as Component;
        }
    },
    methods: {
        selectSlot(event: Event, slot: ComponentSlotModel) {
            this.$emit('on-slot-selected', slot, event.target as HTMLElement)
        },
        openPopupConfiguration() : void {
            this.popupVisible = true;
        },
        onClosePopup() {
            this.popupVisible = false;
            this.componentModel.component.setIsDirty(true);
        },
        onFocusOut() {
            //
        },
        onClick() {
            bus.emit('on-component-selected', this.componentModel)
        }
    }
});

</script>

<style>

/* https://stackoverflow.com/questions/22196587/how-to-vertically-center-a-container-in-bootstrap */
.table{
    height:100%;
    display:table;
    width: 100%;
    padding: 0;
}

.row-fluid {
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}

</style>