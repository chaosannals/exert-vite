<template>
    <div class="tip-group-demo-page">
        <button @click="onClickTip">tip</button>
    </div>
    <tip-group ref="tg" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tg = ref();

const onClickTip = () => {
    tg.value.addTip('afdsafsdf', 3);
};

</script>

<style lang="scss" scoped>

</style>