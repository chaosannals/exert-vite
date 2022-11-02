<template>
    <div class="pinia-demo2">
        <div class="">
            <router-link to="pinia-demo">Pina Demo</router-link>
        </div>
        <div class="">
            <span>Pinia Count: {{ counter.count }}</span>
        </div>
        <div class="">
            <div v-for="ut in userTypesWithId" :key="ut.id">
                <span>{{ ut.text }}</span>
            </div>
        </div>
        <div class="">
            <div v-for="(ul, i) in enumData.userLevels" :key="i">
                <span>{{ul}}</span>
            </div>
        </div>
        <div class="">
            <button @click="enumData.shuffleUserTypes()">Enum Shuffle</button>
            <button @click="shuffleByPatch()">Patch Shuffle</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../stores/count';
import { useEnumDataStore } from '../stores/enumdata';
import lodash from 'lodash';

const counter = useCounterStore();
const enumData = useEnumDataStore();

// 解构必须通过 storeToRefs 才能保持响应式，只解构响应式属性。
const { userTypesWithId } = storeToRefs(enumData);

// $patch 批量修改
const shuffleByPatch = () => {
    enumData.$patch((state) => {
        state.userTypes = lodash.shuffle(state.userTypes);
        state.userLevels = lodash.shuffle(state.userLevels);
    });
};

// 订阅，监听状态变化
enumData.$subscribe((mutation, state) => {
    console.log(mutation);
    console.log(mutation.type);
    console.log(mutation.storeId);
    // console.log(mutation.payload);

    // 可以在此处修改持久化的数据。
    localStorage.setItem('enumData', JSON.stringify(state));
}, {
    detached: true,// 使得这个订阅和组件脱离，不会在组件卸载时被去掉。
    deep: true, // 深度监听
});

</script>