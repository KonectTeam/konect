<template>
    <SketchComponentModal
        title="Dataframe columns filter"
        :max-width="600"
        :before-close="beforeClose"
        :max-height="1000"
    >

    <template v-slot:modal-body>
        <SketchColumnSelector
            :selectedColumns="initialSelectedColumns"
            :unselectedColumns="dataframeHeaders"
            :on-select="onSelect"
            :on-unselect="onUnselect"
            :on-select-all="onSelectAll"
            :on-unselect-all="onUnselectAll"
        />
    </template>

    </SketchComponentModal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import { SketchComponentModal  } from 'konect-api-vue'

import { SketchDataframeFilterColumnsComponent } from '../../dataframe/SketchDataframeFilterColumnsComponent';

import {SketchColumnSelector} from 'konect-api-vue';

export default defineComponent({
    props: {
        component: {
            required: true,
            type: SketchDataframeFilterColumnsComponent
        }
    },
    data() {
        return {
            selectedColumns: Array<string>()
        }
    },
    components: {
        SketchComponentModal,
        SketchColumnSelector
    },
    methods: {
        onSelect(col: string) {
            this.selectedColumns.push(col);
        },
        onUnselect(col: string) {
            this.selectedColumns = this.selectedColumns.filter(c => c !== col);
        },
        onSelectAll() {
            if (this.component.dataframe) {
                this.selectedColumns = this.component.dataframe.listColumns();
            }
        },
        onUnselectAll() {
            this.selectedColumns = [];
        },
        beforeClose() {
            this.component.setSelectedColumns(this.selectedColumns);
        }
    },
    computed: {
        dataframeHeaders() : Array<string> {
            return this.component.dataframe ? this.component.dataframe.listColumns().filter(c => !this.initialSelectedColumns.includes(c)) : [];
        },
        initialSelectedColumns() : Array<string> {
            return this.component.selectedColumns;
        }
    },
    mounted() {
        this.selectedColumns = [...this.initialSelectedColumns];
    }
});

</script>