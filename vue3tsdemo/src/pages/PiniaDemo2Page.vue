<template>
    <div class="pinia-demo2">
        <div class="">
            <router-link to="pinia-demo">Pina Demo</router-link>
        </div>
        <div class="">
            <span>Pinia Count: {{ counter.count }}</span>
        </div>
        <div class="">
            <div v-for="ut in enumData.userTypesWithId" :key="ut.id">
                <span>{{ ut.text }}</span>
            </div>
        </div>
        <div class="">
            <button @click="enumData.shuffle()">Enum Shuffle</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/count';
import { useEnumDataStore } from '../stores/enumdata';

const counter = useCounterStore();
const enumData = useEnumDataStore();

</script>