<template>
    <div class="pinia-demo-page">
        <div class="">
            <router-link to="pinia-demo-2">Pina Demo 2</router-link>
        </div>
        <div>{{ xxx }}</div>
        <div class="">
            <button @click="counter.increment()">Pinia Count: {{ counter.count }} * 2 = {{ counter.double }}</button>
            <button @click="data.count++">Self Count: {{ data.count }}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useCounterStore } from '../stores/count';

const counter = useCounterStore();
const data = ref({
    count: 0,
});


const xxx = computed(() => {
    // 因为 xxx 是动态添加的，没有类型检查。
    // let c = counter as any;
    // return c.xxx

    // 添加了 PiniaCustomProperties 类型声明，来解决。
    return counter.xxx;
});

// 监听 action, action 可以是异步的
counter.$onAction(({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
}) => {
    after((result) => {
        console.log('action:', name, store, args, result);
    });

    onError(error => {
        console.warn('action error:', name, store, args, error);
    });
},
    true // detached 为 true 时，不随组件卸载而被删除。
);

</script>

<style lang="scss" scoped>

</style>
