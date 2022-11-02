<template>
    <div class="index-page">
        <div class="link-listing">
            <router-link to="/pinia-demo">Pinia 示例</router-link>
            <router-link to="/rx-demo">Rx 示例</router-link>
            <router-link to="/tip-group-demo">组件 TipGroup 示例</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.link-listing {
    display: flex;
    flex-direction: column;
}
</style>
