<template>
  <div class="home-page">
    <h1>{{ msg }}</h1>
    <button @click="state.count++">count is: {{ state.count }}</button>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
</script>
