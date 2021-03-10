<template>
  <div class="home-page">
    <h1>Home</h1>
    <p>
      <img src="../assets/logo.png" alt="logo" />
    </p>
    <button @click="state.count++">count is: {{ state.count }}</button>
    <Foo />
    <p class="virtual">msg from virtual module: {{ foo.msg }}</p>
    <div v-for="r in rows" :key="r.id">
      {{ r.title }}
    </div>
  </div>
</template>

<script setup>
import foo from "@foo";
import { reactive, defineAsyncComponent } from "vue";

const Foo = defineAsyncComponent(() =>
  import("../components/Foo").then((mod) => mod.Foo)
);

const state = reactive({ count: 0 });
const rows = reactive([]);

if (import.meta.env.SSR) {
  const { getTests } = await import("../logics/test");
  const rs = await getTests();
  rs.forEach((i) => rows.push(i));
}
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>