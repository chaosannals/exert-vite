<template>
  <div class="listbox">
    <template v-if="'default' in slots">
      <div v-for="(s, i) in slots.default()">
        <ev-funcell :sr="s.children?.default" />
      </div>
    </template>
    <div v-for="(row, i) in rows" :key="row.id">
      <template v-if="'default' in slots">
        <ev-funcell
          v-for="(s, i) in slots.default()"
          :key="i"
          :sd="row"
          :sr="s.children?.aaa"
          :pindex="i"
          prop2="pppp"
        />
      </template>
    </div>
    <slot></slot>
  </div>
</template>


<script setup>
import { onMounted, reactive, useSlots } from "@vue/runtime-core";

const slots = useSlots();

const rows = reactive([]);

for (let i = 0; i < 10; ++i) {
  rows.push({
    id: i,
  });
}

onMounted(() => {
  if ("default" in slots) {
    let s = slots.default();
    console.log(s);
    for (let row of rows) {
      row.render;
    }
  }
});
</script>