<template>
  <div class="ev-rsbox" ref="rootElement"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { throttle } from "lodash";

const rootElement = ref();
const width = ref(0);
const height = ref(0);

const pickSize = throttle(() => {
  width.value = rootElement.value.offsetWidth;
  height.value = rootElement.value.offsetHeight;
  console.log(width.value, height.value);
}, 600);

const onMutation = (mutationsList, observer) => {
  //   console.log(mutationsList);
  pickSize();
};

const observer = new MutationObserver(onMutation);

onMounted(() => {
  pickSize();
  observer.observe(rootElement.value, {
    attributes: true,
    childList: false,
    subtree: true,
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>

<style lang="scss" scoped>
.ev-rsbox {
  overflow: hidden; // display: block 需要此 resize 才有效。
  resize: both;
  width: 300px;
  height: 300px;
  border: 2px solid #37fd;
}
</style>