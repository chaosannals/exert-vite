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

    const userTypesWithId = computed(() => {
        return userTypes.value.map((ut, i) => {
            return {
                id: i,
                text: ut,
            };
        });
    });

    function shuffle() {
        userTypes.value = lodash.shuffle(userTypes.value);
    }

    return {
        userTypes,
        userTypesWithId,
        shuffle,
    };
});