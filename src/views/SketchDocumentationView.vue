<template>
    <div class="app-bg">
        <div
            style="border-bottom: 1px solid white"
        >
            <SketchNavBar />
        </div>

        <div class="d-flex">
            <SketchComponentListDoc class="w-25" />
            <router-view class="w-75" :key="$route.fullPath"></router-view>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchNavBar from '@/sketch/app/ui/common/SketchNavBar.vue';

import SketchComponentListDoc from '@/sketch/app/ui/doc/SketchComponentListDoc.vue';

export default defineComponent({
    components: {
        SketchNavBar,
        SketchComponentListDoc,
    }
});

</script>