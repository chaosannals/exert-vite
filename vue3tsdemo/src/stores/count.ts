import { defineStore } from 'pinia';

// 配置文件式（选项式）定义
export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            count: 0,
        };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})