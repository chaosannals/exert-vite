<template>
  <div>
    <ev-rsbox></ev-rsbox>
    <ev-listbox>
      <ev-listitem>
        <template v-slot:aaa="sd">
          <span>11111</span>
          <span>{{sd}}</span>
        </template>
        <button>1</button>
      </ev-listitem>
      <ev-listitem>
        <template v-slot:aaa>
          <span>22222</span>
        </template>
        <button>2</button>
      </ev-listitem>
      <ev-listitem></ev-listitem>
      <ev-listitem></ev-listitem>
    </ev-listbox>
  </div>
</template>

<script setup>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
