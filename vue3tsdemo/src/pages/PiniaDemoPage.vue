<template>
    <div class="pinia-demo-page">
        <div class="">
            <router-link to="pinia-demo-2">Pina Demo 2</router-link>
        </div>
        <div class="">
            <button @click="counter.increment()">Pinia Count: {{ counter.count }} * 2 = {{ counter.double }}</button>
            <button @click="data.count++">Self Count: {{ data.count }}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { useCounterStore } from '../stores/count';

const counter = useCounterStore();
const data = ref({
    count: 0,
});

</script>

<style lang="scss" scoped>

</style>
