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
    <div ref="rdr">{{ rdata }}</div>
  </div>
</template>

<script setup>
import foo from "@foo";
import { reactive, defineAsyncComponent, onMounted, ref, watch } from "vue";

const Foo = defineAsyncComponent(() =>
  import("../components/Foo").then((mod) => mod.Foo)
);

const rdr = ref(null);

onMounted(() => {
  // console.log('rdr', rdr);
  // if (rdata) {
  //   rows.length = 0;
  //   JSON.parse(rdata).forEach((i) => rows.push(i));
  // }
});

const state = reactive({ count: 0 });
const rows = reactive([]);
let rdata = ref(null);
watch(rdata, (a, b) => console.log('w', a, b), {
  immediate: true,
});

if (import.meta.env.SSR) {
  // SSR 渲染给爬虫。
  const { getTests } = await import("../logics/test");
  const rs = await getTests();
  rows.lenght = 0;
  rs.forEach((i) => rows.push(i));
  // JSON.parse(localStorage.getItem('rs')) || []
  rdata = JSON.stringify(rs);
}

</script>

<style scoped>
h1,
a {
  color: green;
}
</style>