import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import lodash from 'lodash';

// 组合式定义
export const useEnumDataStore = defineStore('enumData', () => {
    const userTypes = ref([
        '白嫖用户',
        '穷逼用户',
        '人傻钱多用户',
    ]);

    const userLevels = ref([
        '好骗',
        '不好骗',
        '他还会坑你',
        '毁灭级',
    ]);

    const userTypesWithId = computed(() => {
        return userTypes.value.map((ut, i) => {
            return {
                id: i,
                text: ut,
            };
        });
    });

    function shuffleUserTypes() {
        userTypes.value = lodash.shuffle(userTypes.value);
    }

    return {
        userTypes,
        userTypesWithId,
        userLevels,
        shuffleUserTypes,
    };
});